var express = require('express');
var router = express.Router();

var eq_dt = {
      cnum:"02015909616",
      url:"54.150.157.88",
      kokiNum:"2",
      press:"010"
    };

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



module.exports = router;
