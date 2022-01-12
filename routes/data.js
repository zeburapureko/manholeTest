var express = require('express');
var router = express.Router();

 
 var data = {
      title: 'data/Index',
      oya: "0000000000000",
      k0: "00000",
      k0p1: "0",
      k0p2: "0",
      k1: "00000",
      k1p1: "0",
      k1p2: "0",
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
     data = {
      title: 'data/update',
      oya: req.body['oya'],
      k0: req.body['k0'],
      k0p1: req.body['k0p1'],
      k0p2: req.body['k0p2'],
      k1: req.body['k1'],
      k1p1: req.body['k1p1'],
      k1p2: req.body['k1p2'],      
    };
    req.session.data=data;
    res.render('data/index', data);
    console.log(req.body);
    
    //res.render('YOSHIHARA OK');
    //const size=32;
    //const buf = new Buffer(size); // 初期化はされていないので、内部になにが入ってるかわかりません。
    //buf.fill(0); // バッファを0埋めすることで初期化する
    /*console.log(req.body['oya']);
    console.log(req.body['k0']);
    cconsole.log(req.bodyonsole.log(req.body['k0p1']);
    ['k0p2']);*/
    //res.end();
});

router.get('/response',(req, res, next)=> {
    
    //if(req.session.data !=undefined)
    //{
    // data =req.session.data;
    //}
    
    res.render('data/response', data);
});


module.exports = router;
