var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Simple Express App' });
});

router.use('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function(e, docs) {
        res.render('userlist', {
            "userlist": docs
        });
    });
});

router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User'});
});

router.post('/adduser', function(req, res) {
   var db = req.db;
   var userName = req.body.username;
   var userMail = req.body.useremail;
   var collection = db.get('usercollection');
   collection.insert({
       "username": userName,
       "email": userMail
   }, function(err, doc) {
       if (doc || !err) {
           res.redirect('userlist');
       }
       else if(err) {
           console.log("Error: " + err);
       }
   });
});
module.exports = router;
