const request1 = require('request');
var limit = require("simple-rate-limiter");
//used for limit the requests/second 
//var rp = limit(require("request-promise")).to(3).per(1000);
var rp = require('request-promise');
const cheerio = require('cheerio');
const express = require("express");
const exphbs = require('express-handlebars');
var path = require('path');
const app = express();
var rp = require('request-promise');
require("./model/usersdetail");
require("./model/admin");
require("./model/rating");
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views/'));
// used as helper function for generating rank 
 const hbs = exphbs.create({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/',
    helpers: {

        add: function (val) {
            return val + 1;
        }
    }

});
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var con = mongoose.connect('mongodb://lovekesh:being98964@ds337377.mlab.com:37377/beingzero');
const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//var hbs = require('hbs');
var publicpath = path.join(__dirname, './public');
app.use(express.static(publicpath));
//app.set('view engine', 'hbs');

require("./mongo");
const adminController = require('./controllers/adminController');
const userController = require('./controllers/usercontroller');
require('./model/admin');
const userdetail = mongoose.model('userdetail');
const admin = mongoose.model('Employee');
const rating = mongoose.model('rating');
app.use('/admin', adminController);
app.use(userController);

const show = async () => {
    var platform = [];
    var url_front = [];
    var url_back = [];
    var division_id = [];
    var slice_from_start = [];
    var slice_from_back = [];
    var agent = [];
    var multiplier = [];
    var waitage = [];
    var batch = [];
    var include = [];
    await admin.find((err, docs1) => {

        docs1.forEach((plat) => {
            platform.push(plat.platform);
            url_front.push(plat.url_front);
            url_back.push(plat.url_back);
            division_id.push(plat.division_id);
            slice_from_start.push(plat.slice_from_start);
            slice_from_back.push(plat.slice_from_back);
            agent.push(plat.agent);
            multiplier.push(plat.multiplier);
            waitage.push(plat.waitage);
            batch.push(plat.batch);
            include.push(plat.include);


        })


    })

    my();
    var rate = 0;
    async function my() {
        var docs = await userdetail.find();
        // console.log('user details' + docs);
        for (const user of docs) {
            var batch1 = 1;
            var i;
            //     console.log('now user is '+user);   

            for (i = 0; i < platform.length; i++) {


                if (include[i] == 1) {
                    console.log('user is' + user);
                    // console.log('batch is   ' +user.batch+'ans batch i is '+batch[i] );
                    if (user.batch != batch[i]) {
                        batch1 = 0;
                        console.log('not match ');
                    }
                    else {
                        var name = platform[i] + 'username';
                        //   console.log('name is ' + name);
                        if (name == 'spojusername')
                            var username = user.spojusername;
                        else if (name == 'gfgusername')
                            var username = user.gfgusername;
                        else if (name == 'ccusername')
                            var username = user.ccusername;
                        else if (name == 'cfusername')
                            var username = user.cfusername;
                        else if (name == 'ibusername')
                            var username = user.ibusername;

                        //       console.log(' user name is ' + username);
                        var url1 = url_front[i] + username + url_back[i];
                        //    console.log('url is ' + url1);
                        var agent1 = agent[i];
                        var headers =
                        {
                            'User-Agent': agent1
                        }

                        var options = {
                            uri: url1,
                            headers: headers,
                            transform: function (body) {
                                //             console.log('url is ' + url1);

                                return cheerio.load(body);
                            }
                        };

                        await rp(options)
                            .then(function ($) {
                                var id1 = (division_id[i]);
                                const b = $(id1);
                                var a = b.html();
                                a = a.substring(slice_from_start[i]);
                                var len = a.length;
                                a = a.substring(0, len - slice_from_back[i]);
                                console.log(' rating of  platform ' + platform[i] + ' is ' + a);//  a=a.substring(24);
                                a = Number(a);
                                a = a * multiplier[i];
                                a = a * waitage[i];
                                rate = rate + a;
                                console.log('rate after adding platform finding is ' + a);
                            })
                            .catch(function (err) {
                                // Crawling failed or Cheerio choked...
                            });


                    }

                }
            }

            //      console.log('rate before updation ' + rate+' an value of i '+i);

            if (batch1 == 1) {
                rating.findOne({ mentorpicusernamefinal: user.mentorpicusername }, function (err, obj) {  // console.log(obj);
                    if (err)
                        console.log('error' + err);
                    else if (!obj) {
                        const rating1 = new rating();
                        rating1.mentorpicusernamefinal = user.mentorpicusername;
                        rating1.ratingfinal = rate;
                        rating1.batch = user.batch;
                        rating1.save();
                        rate = 0;
                        // console.log(" just inserted !"); 
                    }
                    else if (obj) {
                        //                console.log('rate during  updatiion  ' + rate);

                        rating.findOneAndUpdate({ mentorpicusernamefinal: user.mentorpicusername }, { $set: { ratingfinal: rate } }, { new: true }, function (err, doc) {
                            if (err) {
                                //  console.log('error is '+err); 
                            }
                            rate = 0;
                            //  console.log('UPDATED SUCCESSFULLY'+doc);
                        });
                    }

                });
            }



        }
    }

}

app.get('/leader', (req, res) => {

    async function lead() {
        await show().then(() => {

            rating.find({}).sort([['ratingfinal', -1]]).exec(function (err, docs) {
                if (!err) {

                    //  console.log('data sortedd' + docs);
                    res.render('leaderboard', { data: docs });
                    //  console.log('data sortedd 2'+docs);
                }

            })
        })
    }
    lead();
})


app.engine('hbs', hbs.engine);
app.listen(3030, function () {
    console.log("Server is running on port 3001");
})    
