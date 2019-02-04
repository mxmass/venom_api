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
    location: String
  },
  elements: [{
    code: String,
    title: String,
    width: String,
    height: String,
    originalname: String,
    mimetype: String,
    location: String
  }],
  samples: [{
    originalname: String,
    mimetype: String,
    location: String,
    texture: {
      location: String,
      color: String
    }
  }],
  renders: [{
    originalname: String,
    mimetype: String,
    location: String
  }]
})

mongoose.model('Front', FrontSchema)
