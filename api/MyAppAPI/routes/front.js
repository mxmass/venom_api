require('dotenv').config()
const passport = require('passport'),
      aws = require('aws-sdk'),
      multer = require('multer'),
      multerS3 = require('multer-s3'),
      // fs = require('fs'),
      // path = require('path')
      config = require('@config'),
      models = require('@MyApp/app/setup')
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
  const api = app.app.MyAppAPI.controllers.front

  app.route('/app/front')
    .post(passport.authenticate('jwt', config.session), api.store(models.Front, app.get('mysecretword')))
    .get(passport.authenticate('jwt', config.session), api.getAll(models.Front, app.get('mysecretword')))
    .delete(passport.authenticate('jwt', config.session), api.remove(models.Front, app.get('mysecretword')))

  app.route('/app/front/single')
    .get(passport.authenticate('jwt', config.session), api.getOne(models.Front, app.get('mysecretword')))
    .put(passport.authenticate('jwt', config.session), api.edit(models.Front, app.get('mysecretword')))

  app.route('/app/front/upload')
    .post(upload.array('file1'), async (req, res) => {
      try {
        let update = (req.body.single === 'true') ? {$set:{[req.body.filetype]:req.files[0]}} : {$addToSet:{[req.body.filetype]:req.files}}
        await models.Front.findOneAndUpdate( {_id: req.body._id}, update, {new: true}, (error, front) => {
          if (error) res.status(400).json( { errorMNG: error } )
          res.status(200).json({ success: true, message: "Front successfuly updated", object: front })
        })
      } catch (err) {
        res.status(400).json( {errorCODE: err} )
      }
    })

  // app.route('/api/v2/front').get(api.getAllPublic(models.Front))
  // app.route('/api/v2/front/single').get(api.getOnePublic(models.Front))

}
