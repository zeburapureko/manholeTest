var express = require('express');
var router = express.Router();
var fs=require('fs');

var eq_dt = {
      cnum:"02015909616",
      url:"54.150.157.88",
      kokiNum:"2",
      press:"010"
    };
    
    const filename = '../eqData.txt'; // データファイル名
    
//saveToFile(filename,eq_dt);    
readFromFile(filename);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('eq/index', eq_dt);
});
router.get('/data', function(req, res, next) {
  res.render('eq/data',eq_dt);
});
router.post('/post',(req, res, next)=> {
    eq_dt.cnum=req.body['cnum'];
    res.render('eq/response',eq_dt);
    console.log(req.body);
});

router.get('/para/update', function(req, res, next) {
  res.render('eq/para/update',eq_dt);
});
router.post('/para/post',(req, res, next)=> {
    eq_dt.url=req.body['url'];
    eq_dt.kokiNum=req.body['kokiNum'];
    eq_dt.press=req.body['press'];
    
    saveToFile(filename,eq_dt);    
    res.render('eq/response',eq_dt);
    console.log(req.body);
});

module.exports = router;


// データを保存
function saveToFile(fname,dt) {
  var data_str = JSON.stringify(dt);
  fs.writeFile(fname, data_str, (err) => {
    if (err) { throw err; }
  });
}
function readFromFile(fname) {
   fs.readFile(fname, 'utf8', function(error, d) {
     eq_dt=JSON.parse(d);
       console.log(d);
    return d;
 })
}
