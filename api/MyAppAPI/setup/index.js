const mongoose = require('mongoose'),
      UserModel = require('@MyAppModels/user'),
      PaletteModel = require('@MyAppModels/palette')
      FrontModel = require('@MyAppModels/front')

const models = {
  User: mongoose.model('User'),
  Palette: mongoose.model('Palette'),
  Front: mongoose.model('Front')
}

module.exports = models
