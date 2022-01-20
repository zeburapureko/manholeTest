var fs=require('fs');
var express = require('express');
var router = express.Router();

const filename = '../para.txt'; // データファイル名
var para_dt = {
      kokiNum:"0",
    };
var dstr;
readFile(filename);
//writeFile(para_dt,filename);

//para/index返信
/*router.get('/', function(req, res, next) {
  res.render('para/index', { title: 'para/index' });
});*/

//para/response返信
router.get('/', function(req, res, next) {
  res.render('para/response',para_dt);
});
//para/update
router.get('/update',(req, res, next)=> {
    res.render('para/update', para_dt);
});

router.post('/post',(req, res, next)=> {
    para_dt.kokiNum=req.body['kokiNum'];
    res.render('para/response',para_dt);
    writeFile(para_dt,filename);
    console.log(req.body);
});




module.exports = router;

//*----------------------------------------------
function readFile(fname) {
   fs.readFile(fname, 'utf8', function(err, d) {
       console.log('err='+err);
       console.log('d='+d);
       para_dt = JSON.parse(d);
       console.log('para_dt=',para_dt);
 })
}

function writeFile(dt, fname) {
  var obj = { 'kokiNum': dt.kokiNum};
  var obj_str = JSON.stringify(obj);
  console.log('add data: ' + obj_str);
   fs.writeFile(fname, obj_str, (err) => {
    if (err) { throw err; }
  });

}
