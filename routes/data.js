var fs=require('fs');
var express = require('express');
require('date-utils');
var para ={
    id:0
}

var router = express.Router();
//var qs =require("querystring");
var dt = new Date();
const max_num=2;
const filename = '../mData.txt'; // データファイル名
var message_data; // データ
var dt ;


 var data = {
      title: 'data/Index',
      dateStr:"",
      oya: "0000000000000",
      id:"0",
      k0: "00000",
      k0p1: "0",
      k0p2: "0",
      k1: "00000",
      k1p1: "0",
      k1p2: "0",
    };

/* GET users listing. */
router.get('/view',(req, res, next)=> {
    var w={
        title:'data/view',
        message_data:message_data
    };
    res.render('data/view', w);
});

router.get('/',(req, res, next)=> {
    res.render('data/index', data);
});

router.get('/update',(req, res, next)=> {
     data.title= 'data/update'
    res.render('data/update', data);
});

router.post('/post',(req, res, next)=> {
    var id=req.body['id'];
    data.oya=req.body['oya'];
    switch(id)
    {
        case "0":
            
            dt= new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
            data.dateStr = dt.toFormat('YYYYMMDDHH24MISS');
            data.k0=req.body['k0'];
            data.k0p1= req.body['k0p1'];
            data.k0p2= req.body['k0p2'];
            break;
        case "1":
            data.k1=req.body['k0'];
            data.k1p1= req.body['k0p1'];
            data.k1p2= req.body['k0p2'];
            
            //dt = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
            //data.dateStr = dt.toFormat('YYYYMMDDHH24MISS');
            
            addToData(data,filename,req);
            
            break;            
    }
 
    req.session.data=data;
    //res.render('data/index', data);
    res.render('data/response',data);
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



// テキストファイルをロード


function readFromFile(fname) {
   fs.readFile(fname, 'utf8', function(err, d) {
       message_data = d.split('\n');
       console.log(d);
       console.log(message_data);
       console.log(message_data.length);
 })
}


// データを更新
function addToData(data, fname, request) {
  var obj = { 'dataStr': data.dateStr, 'oya': data.oya,'k0':data.k0,'k0p1':data.k0p1,'k0p2':data.k0p2
                                                      ,'k1':data.k1,'k1p1':data.k1p1,'k1p2':data.k1p2git };
  var obj_str = JSON.stringify(obj);
  console.log('add data: ' + obj_str);
  message_data.unshift(obj_str);
  if (message_data.length > max_num) {
    message_data.pop();
  }
}

// データを保存
function saveToFile(fname) {
  var data_str = message_data.join('\n');
  fs.writeFile(fname, data_str, (err) => {
    if (err) { throw err; }
  });
}

