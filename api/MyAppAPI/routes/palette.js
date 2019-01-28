require('dotenv').config()
const passport = require('passport'),
      aws = require('aws-sdk'),
      multer = require('multer'),
      multerS3 = require('multer-s3'),
      // fs = require('fs'),
      // path = require('path')
      config = require('@config'),
      models = require('@MyApp/setup')
      // upload = require('@MyApp/app/utils/upload.js')
const s3Config = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_ACCESS_SECRET,
        Bucket: process.env.AWS_BUCKET_NAME
      })
const UPLOAD_PATH = 'venom/'
      // upload = multer({ dest: `${UPLOAD_PATH}/` })
const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
          cb(null, true)
        } else {
          cb(null, false)
        }
      }
const multerS3Config = multerS3({
        s3: s3Config,
        bucket: process.env.AWS_BUCKET_NAME,
        // acl: 'public-read',
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname })
        },
        key: function (req, file, cb) {
          let curdate = new Date().toISOString()
          cb(null, process.env.AWS_BUCKET_UPLOAD_PATH  + curdate + '-' + file.originalname)
        }
      })
const upload = multer({
        storage: multerS3Config,
        fileFilter: fileFilter,
        limits: {
          fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
        }
      })

module.exports = (app) => {
  const api = app.app.MyAppAPI.controllers.palette

  app.route('/app/palette')
     .post(passport.authenticate('jwt', config.session), api.store(models.Palette, app.get('mysecretword')))
     .get(passport.authenticate('jwt', config.session), api.getAll(models.Palette, app.get('mysecretword')))
     .delete(passport.authenticate('jwt', config.session), api.remove(models.Palette, app.get('mysecretword')))

  app.route('/app/palette/single')
    .get(passport.authenticate('jwt', config.session), api.getOne(models.Palette, app.get('mysecretword')))
    .put(passport.authenticate('jwt', config.session), api.edit(models.Palette, app.get('mysecretword')))

  app.route('/app/palette/files')
    .post(upload.array('file1'), async (req, res) => {
      try {
        // let update = req.body.append ? {$addToSet:{textures:req.files}} : {$set:{textures:req.files}}
        let update = {$addToSet:{textures:req.files}}
        console.log(update)
        await models.Palette.findOneAndUpdate( {_id: req.body._id}, update, {new: true}, (error, pal) => {
          if (error) res.status(400).json( { errorMNG: error })
          res.status(200).json({ success: true, message: "Palette successfuly updated", object: pal })
        })
      } catch (err) {
        res.status(400).json( {errorCODE: err} )
      }
    })
}
