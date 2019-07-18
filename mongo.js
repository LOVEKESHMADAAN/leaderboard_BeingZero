
 const mongoose = require("mongoose");
// require("dotenv").config();

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://lovekesh:being98964@ds337377.mlab.com:37377/beingzero');
mongoose.connect('mongodb://lovekesh:being98964@ds337377.mlab.com:37377/beingzero', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});
