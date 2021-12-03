var express = require('express');
var router = express.Router();

 
 var data = {
      title: 'data/Index',
      oya: "12345600",
      k0: "000",
      k0p1: "0000",
      k0p2: "0000",
    };
/* GET users listing. */
router.get('/',(req, res, next)=> {
    
    //if(req.session.data !=undefined)
    //{
    // data =req.session.data;
    //}
    
    res.render('data/index', data);
});

router.get('/update',(req, res, next)=> {
    
      data.title= 'data/update'
    res.render('data/update', data);
});

router.post('/post',(req, res, next)=> {
    var data = {
      title: 'data/update',
      oya: req.body['oya'],
      k0: req.body['k0'],
      k0p1: req.body['k0p1'],
      k0p2: req.body['k0p2'],
    };
    //req.session.data=data;
    res.render('data/index', data);
});



module.exports = router;
