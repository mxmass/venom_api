const passport = require('passport'),
      multer = require('multer'),
      fs = require('fs'),
      path = require('path')
      config = require('@config'),
      models = require('@MyApp/setup')

const UPLOAD_PATH = 'uploads/folia',
      upload = multer({ dest: `${UPLOAD_PATH}/` })

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
