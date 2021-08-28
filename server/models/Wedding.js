const { Schema, model } = require("mongoose");

const weddingSchema = new Schema({
  bride_first_name: {
    type: String,
    // required: true,
    // unique: true,
    trim: true,
  },
  bride_last_name: {
    type: String,
    // required: true,
    // unique: true,
  },
  groom_first_name: {
    type: String,
    // required: true,
    // unique: true,
  },
  groom_last_name: {
    type: String,
    // required: true,
    // unique: true,
  },
  date: {
    type: String,
    
  },
  venue: {
    type: String,
    // required: true,
    // unique: true,
  },
  menu_choice: [
    {
      type: String,
    },
  ],
  description: {
      type: String,
      required: false,
  },
  wedding_owner:{
    type:String,
    // required:true,
    trim:true
  },

  guests:[{
    type: Schema.Types.ObjectId,
    ref:"Guests"
  }]
});

const Wedding = model('wedding', weddingSchema);
module.exports = Wedding;