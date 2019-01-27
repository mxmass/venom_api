const passport = require('passport'),
      multer = require('multer'),
      fs = require('fs'),
      path = require('path')
      config = require('@config'),
      models = require('@MyApp/setup')

const UPLOAD_PATH = 'uploads',
      upload = multer({ dest: `${UPLOAD_PATH}/` })

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
