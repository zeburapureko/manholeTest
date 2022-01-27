var fs=require('fs');
var express = require('express');
require('date-utils');
var para ={
    id:0
}

var router = express.Router();

var dt = new Date();
const max_num=100;
const filename = '../mData.txt'; // データファイル名
var message_data; // データ
var dt ;
message_data =[];// "".split('\n');

 var data = {
      dateStr:"",
      oya: "0000000000000",
      koki:[
            {
                k0: "00000",
                k0p1: "0",
                k0p2: "0",
            },
            {
                k0: "00000",
                k0p1: "0",
                k0p2: "0",
            }
        ]
    };
 var dataDumy = {
      dateStr:"20220126155959",
      oya: "0904461341100010C01",
      koki:[
            {
                k0: "00123",
                k0p1: "11125959",
                k0p2: "3112595801259571125956",
            },
            {
                k0: "00222",
                k0p1: "11125959",
                k0p2: "0",
            }
        ]
    };
     var dataDumy2 = {
      dateStr:"20220126235959",
      oya: "1234567890100010C01",
      koki:[
            {
                k0: "00456",
                k0p1: "11125959",
                k0p2: "3112595801259571125956",
            },
            {
                k0: "00789",
                k0p1: "11125959",
                k0p2: "0",
            }
        ]
    };

//message_data.push(dataDumy);    
//message_data.push(dataDumy2); 
//---------------------------------------------
//処理用クラス初期化
//---------------------------------------------
function data_con_init(d)
{
    d = {
      dateStr:"",
      cnum: "",
      oyaBat:"",
      oyaErrCode:"",
      oyaCommErrCode:"",
      koki:[2]
    }
    
       var  koki ={
                    commErrCode:"",
                    k0_ijyo: "",
                    k0_errCode:"",
                    k0_press:"",
                    pompCH:[2]
       }
           var pompCH ={
               dtNum:"",
               pompDt:[18]
           }
            var pompDt={
                st:"",
                dt:"",
            }

    for(var k=0;k<2;k++)
    {
        for(var j=0;j<2;j++) 
        {
            for(var i=0;i<18;i++)
            {
                    pompDt.st=0;    
                    pompDt.dt="";
                    pompCH.pompDt[i]=JSON.parse(JSON.stringify(pompDt));
            }
            koki.pompCH[j]=JSON.parse(JSON.stringify(pompCH));
        }
        d.koki[k]=JSON.parse(JSON.stringify(koki));
    }
    return d;
}
//---------------------------------------------
//---------------------------------------------
function getDate(dt)
{
    var y=dt.substr(0,4);
    var m=dt.substr(4,2)-1;
    var d=dt.substr(6,2);
    var h=dt.substr(8,2);
    var mm=dt.substr(10,2);
    var s=dt.substr(12,2);
    return new Date(y,m,d,h,mm,s);
}

//---------------------------------------------
//---------------------------------------------
router.get('/detail',(req,res,next)=>{
   var no=req.query.no;

   var data_con=[];
   data_con=data_con_init(data_con);
   
    //var dateTime = getDate(message_data[no].dateStr);
    //var dateObject = { DateTime: dateTime };
    //var dateJson = JSON.stringify(dateObject);

   data_con.dateStr=message_data[no].dateStr;
   data_con.cnum=message_data[no].oya.substr(0,11);
   data_con.oyaBat=message_data[no].oya.substr(11,1);
   data_con.oyaErrCode=message_data[no].oya.substr(12,1);
   data_con.oyaCommErrCode=message_data[no].oya.substr(13,2);
   
    for(var i=0;i<2;i++)//子機数
    {
        data_con.koki[i].commErrCode=message_data[no].oya.substr(15+(i*2),2);
        data_con.koki[i].k0_ijyo=message_data[no].koki[i].k0.substr(0,1);
        data_con.koki[i].k0_errCode=message_data[no].koki[i].k0.substr(1,1);
        data_con.koki[i].k0_press=message_data[no].koki[i].k0.substr(2,3);
        //ポンプCH0
        data_con.koki[i].pompCH[0].dtNum=message_data[no].koki[i].k0p1.substr(0,1);
        for(var j=0;j<data_con.koki[i].pompCH[0].dtNum;j++)
        {
            data_con.koki[i].pompCH[0].pompDt[j].st=message_data[no].koki[i].k0p1.substr(1+(j*7),1);
            data_con.koki[i].pompCH[0].pompDt[j].dt=message_data[no].koki[i].k0p1.substr(2+(j*7),6);
        }
        //ポンプCH1
        data_con.koki[i].pompCH[1].dtNum=message_data[no].koki[i].k0p2.substr(0,1);
        for(var j=0;j<data_con.koki[i].pompCH[1].dtNum;j++)
        {
            data_con.koki[i].pompCH[1].pompDt[j].st=message_data[no].koki[i].k0p2.substr(1+(j*7),1);
            data_con.koki[i].pompCH[1].pompDt[j].dt=message_data[no].koki[i].k0p2.substr(2+(j*7),6);
        }
    }

   var content= {
       title:'data/detail',
       no:no,
       data_con:data_con
   }
   res.render('data/detail',content);
});

//--------------------
//print
//--------------------
router.get('/print',(req, res, next)=> {
    var  content_dt=[];
    var wk_dt=[];
    for(var i=0;i<message_data.length;i++)
    {
        wk_dt=[];
        wk_dt.no=i+1;
        wk_dt.dateStr=message_data[i]['dateStr'].substr(0,14);
        wk_dt.cnum=message_data[i]['oya'].substr(0,11);
        //content_dt.push(JSON.parse(JSON.stringify(wk_dt)));
        content_dt.push(wk_dt);
    }
    var content={
        title:'data/print',
        content_dt:content_dt
    };
    res.render('data/print', content);
});
//--------------------
//view
//--------------------
router.get('/view',(req, res, next)=> {
    var  content_dt=[];
    for(var i=0;i<message_data.length;i++)
    {
        content_dt.push(JSON.stringify(message_data[i]));
    }
    var content={
        title:'data/view',
        content_dt:content_dt
    };
    res.render('data/view', content);
});

router.get('/',(req, res, next)=> {
    data.title= 'data/index'
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
            data.koki[0].k0=req.body['k0'];
            data.koki[0].k0p1= req.body['k0p1'];
            data.koki[0].k0p2= req.body['k0p2'];
            break;
        case "1":
            data.koki[1].k0=req.body['k0'];
            data.koki[1].k0p1= req.body['k0p1'];
            data.koki[1].k0p2= req.body['k0p2'];
           
            jsonAddData(data);
            break;            
    }
 
    req.session.data=data;
    //res.render('data/index', data);
    res.render('data/response',data);
    console.log(req.body);
  
});

router.get('/response',(req, res, next)=> {
    
    //if(req.session.data !=undefined)
    //{
    // data =req.session.data;
    //}
    
    res.render('data/response', data);
});

module.exports = router;




function jsonAddData(data)
{
    var obj = {
      dateStr:"",
      oya: "0000000000000",
      koki:[
            {
                k0: "00000",
                k0p1: "0",
                k0p2: "0",
            },
            {
                k0: "00000",
                k0p1: "0",
                k0p2: "0",
            }
        ]
    };
    obj.dateStr=data.dateStr;
    obj.oya=data.oya;
    for(var i=0;i<2;i++)
    {
        obj.koki[i].k0=data.koki[i].k0;
        obj.koki[i].k0p1=data.koki[i].k0p1;
        obj.koki[i].k0p2=data.koki[i].k0p2;
    }
    console.log('obj:'+obj);
    message_data.unshift(obj);
    if(message_data.length>max_num)
        message_data.pop();
}



function jtoS()
{
    //jsonから文字列データへ変換
    message_data=[];
    for(var i=0;i<json_data.length;i++)
    {
        message_data.push(JSON.stringify(json_data[i]));
    }
}

// データを更新
function addToData(data) {
  var obj = { 'dateStr': data.dateStr, 'oya': data.oya,'k0':data.k0,'k0p1':data.k0p1,'k0p2':data.k0p2
                                                      ,'k1':data.k1,'k1p1':data.k1p1,'k1p2':data.k1p2};
  var obj_str = JSON.stringify(obj);
  console.log('add data: ' + obj_str);
  message_data.unshift(obj_str);
  if (message_data.length > max_num) {
    message_data.pop();
  }
  
  var str = message_data[0];
  var json_dt=JSON.parse(str);
  var item=json_dt['k0'];

  var str1 = message_data[0];
  var json_dt1=JSON.parse(message_data[0]);
  var item1=(JSON.parse(message_data[0]))['k0'];
}
// テキストファイルをロード
function readFromFile(fname) {
   fs.readFile(fname, 'utf8', function(err, d) {
       message_data = d.split('\n');
       console.log(d);
       console.log(message_data);
       console.log(message_data.length);
 })
}
// データを保存
function saveToFile(fname) {
  var data_str = message_data.join('\n');
  fs.writeFile(fname, data_str, (err) => {
    if (err) { throw err; }
  });
}

