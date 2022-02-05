var express = require('express');
var router = express.Router();

global.email_dt={
    address:'yoshihara@fando.co.jp',
    sw:'on',
    resetFlg:'off'
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('email/index', global.email_dt);
});
router.get('/inp', function(req, res, next) {
  var sw;
  if(global.email_dt.sw=='off')
    sw='';
  else
    sw='checked';
  var resetFlg;
  if(global.email_dt.resetFlg=='off')
    resetFlg='';
  else
    resetFlg='checked';
    
  var content={
      address:global.email_dt.address,
      sw:sw,
      resetFlg:resetFlg
  }  
  res.render('email/inp',content);
});

router.post('/post',(req, res, next)=> {
    global.email_dt.address=req.body['address'];
    var c=req.body['sw'];
    if(c==undefined)
      global.email_dt.sw='off';
    else
      global.email_dt.sw='on';
      
    var c=req.body['resetFlg'];  
     if(c==undefined)
      global.email_dt.resetFlg='off';
    else
      global.email_dt.resetFlg='on';
 
    //saveToFile(filename,global.eq_dt);    
    res.render('email',global.email_dt);
    console.log(req.body);
});

module.exports = router;
