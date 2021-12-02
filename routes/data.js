var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/',(req, res, next)=> {
    
    var data = {
      title: 'data/Index',
      tanmatu: "09000000001",
      oyakiijyo: "0",
      oyakierr: "0",
      pressData: "999",
      kokiijyo: "0",
      kokierr: "0",
      pomp1:"0",
      pomp2:"0",
    };
    res.render('data/index', data);
});

router.get('/update',(req, res, next)=> {
    
    var data = {
      title: 'data/update'
    };
    res.render('data/update', data);
});

router.post('/post',(req, res, next)=> {
    var data = {
      title: 'data/update',
      tanmatu:req.body['tanmatu'],
      oyakiijyo: req.body['oyakiijyo'],
      oyakierr: req.body['oyakierr'],
      pressData: req.body['pressData'],
      kokiijyo: req.body['kokiijyo'],
      kokierr: req.body['kokierr'],
      pomp1:req.body['pomp1'],
      pomp2:req.body['pomp2'],
    };
    res.render('data/index', data);
});



module.exports = router;
