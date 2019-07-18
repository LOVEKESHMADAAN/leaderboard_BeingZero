const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ratingschema = new Schema({
   
    mentorpicusernamefinal:   
      { 
          type: String,
          required: true
      },
      ratingfinal:
      {
       type:Number
      } ,
        batch: 
      {
        type: String
      }
});
const rating = mongoose.model('rating', ratingschema);

module.exports = rating;