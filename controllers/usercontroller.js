const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const userdetail=mongoose.model('userdetail');
router.get('/', (req,res) =>
{  
   res.render('index');
});
router.get('/updatebymp', (req,res) =>
{  
    res.render('updatementor');
});
  router.get('/update',(req,res)=>{
    
    console.log('PARAMS IS '+ req.query.mentor);
    userdetail.findOne({mentorpicusername:req.query.mentor }, function(err,obj) 
        {   
          if(err)
          {
              console.log('error is '+err);
          }
          else
          {
            console.log('data is '+obj);
          res.render('update' ,{user:obj});
          }
        })   
    }) 
router.post('/update', (req,res) =>
{            
    try
  {  
    userdetail.findOne({mentorpicusername: req.body.mp}, function(err,obj) 
        {  // console.log(obj);
            if(err)
            console.log('error'+err);
            else if(!obj)
            {  
               res.send('no username');
               // console.log(" just inserted !"); 
            }  
            else if(obj)
            {     
                userdetail.findOneAndUpdate({mentorpicusername: req.body.mp}, { "$set": { "mentorpicusername": req.body.mp, "gfgusername":req.body.gfg, "ccusername": req.body.cc, "cfusername": req.body.cf,"spojusername": req.body.spoj,"ibusername": req.body.ib,"batch": req.body.batch}},{new: true},function(err, doc){
                    if(err)
                    {   
                    console.log('error is '+err); 
                    }   
                       
                        console.log('UPDATED SUCCESSFULLY'+doc);
                    }); 
            }
            
        }); 
    }
    catch(err)
    {
     console.log('error is here ');
    }
    res.redirect('/');
   
});
  
router.post("/users", async (req, res) => {
    try 
    {   
        console.log('body data is '+JSON.stringify(req.body));
        const post = new userdetail(req.body);
        post.mentorpicusername = req.body.mp;
        post.gfgusername = req.body.gfg;
        post.ccusername = req.body.cc;
        post.cfusername = req.body.cf;
        post.spojusername = req.body.spoj;
        post.ibusername = req.body.ib;
        post.batch=req.body.batch;
        await post.save();
    }   
   catch(err)
{ 
  console.log(err+'NOT INSERTED');
} 
res.redirect('/');
});
module.exports=router;