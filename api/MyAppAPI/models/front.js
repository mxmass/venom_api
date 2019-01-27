const mongoose = require('mongoose')

const FrontSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stitle: String,
  innerwidth: Number,
  backcolor: String,
  style: {
    _id: Number,
    stitle: String,
    title: String
  },
  material: {
    _id: Number,
    stitle: String,
    title: String
  },
  cutimage: {
    originalname: String,
    mimetype: String,
    path: String
  },
  elements: [{
    code: String,
    title: String,
    width: String,
    height: String,
    originalname: String,
    mimetype: String,
    path: String
  }],
  samples: [{
    originalname: String,
    mimetype: String,
    path: String,
    noflat: Boolean,
    texture: {
      type: mongoose.Schema.Types.Object,
      ref: 'Palette.textures'
    },
    color: {
      type: mongoose.Schema.Types.Object,
      ref: 'Palette.colors'
    }
  }],
  renders: [{
    originalname: String,
    mimetype: String,
    path: String
  }]
})

mongoose.model('Front', FrontSchema)
