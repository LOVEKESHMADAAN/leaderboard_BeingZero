const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: 'This field is required.'
    },
    url_front: {
        type: String,
        required: 'This field is required.'
    },
    url_back:{
        type: String,
    },
    division_id: 
    {
        type: String
    },
    slice_from_start: {
        type: Number
    },
    slice_from_back: {
        type: Number
    },
    agent:{
        type: String
    },
    waitage: {
        type: Number
    },
    multiplier : {
        type: Number
    },
    batch: {
        type: Number
    },
    include : {
        type: Number
    },
    

});
mongoose.model('Employee', employeeSchema);