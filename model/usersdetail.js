const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const users = new Schema({
   
  mentorpicusername:   
    { 
        type: String,
        required: true
    }, 
    gfgusername: 
    { 
        type: String,
        required: true
    },
    
    ccusername: 
    {   
        type: String,
        required: true
    }, 
    cfusername: 
    {   
        type: String,
        required: true
    },  
    spojusername: 
    { 
        type: String,
        required: true
    },
    ibusername: 
    {   
        type: String,
        required: true
    },  
    batch: 
    {   
        type: Number,
        required: true
    }   
    // add in geo location
});   

const userdetail = mongoose.model('userdetail', users);

module.exports = userdetail;
