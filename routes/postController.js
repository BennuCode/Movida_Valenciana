var fs = require('fs');
var jsonQuery = require('json-query');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

var POST_FILE = path.join(__dirname, 'posts.json');
var THEMES_FILE = path.join(__dirname, 'themesList.json');


app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// router.get('/themes', function(req, res) {
//   fs.readFile(THEMES_FILE, function(err, data) {
//     if (err) {
//       console.error(err);
//       process.exit(1);
//     }
//     res.json(JSON.parse(data));
//   });
// });

// router.get('/post', function(req, res) {
//   fs.readFile(POST_FILE, function(err, data) {
//     if (err) {
//       console.error(err);
//       process.exit(1);
//     }
//     res.json(JSON.parse(data));
//   });
// });

router.get('/mainPost', function(req, res){
  var db = req.db;
  var posts = db.get('posts');
  var options = {
    "sort" : {"date":-1},
    "limit" : 10
  }
  posts.find({}, options, function(e, data){
    res.json(data);}
  )
});

router.post('/themePost', function(req, res){
  var db = req.db;
  var posts = db.get('posts');
  var options = {
    "sort" : {"date":-1},
    "limit" : 10
  }
  posts.find({'theme':req.body['theme_name']}, options, function(e, data){
    res.json(data);}
  )
})

router.post('/takeCardContent', function(req, res){
  var db = req.db;
  var posts = db.get('posts');
  
  posts.find({'_id':req.body['card_id']},{},function(e, data){
    res.json(data);
  })
});






module.exports = router;
