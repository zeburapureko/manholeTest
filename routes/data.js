const KOKI_NUM=10;
const POMP_DT_NUM=18;
const POMP_CH_NUM=2;

var fs=require('fs');
var express = require('express');
require('date-utils');
const NodeMailer = require('nodemailer');
var router = express.Router();

console.log('manholeTest start');

var dt = new Date();
const max_num=100;
const filename = '../mData.txt'; // データファイル名
var message_data; // データ
message_data =[];// "".split('\n');

 var postData = {
      dateStr:"",
      oya: "00000000000000",
      koki:[KOKI_NUM]
    };ko
    var ko={    k0: "000000",
                k0p1: "00",
                k0p2: "00",
            };
    for(var i=0;i<KOKI_NUM;i++)
    {
        postData.koki[i]=JSON.parse(JSON.stringify(ko));    
    }
    
 var dataDumy = {
      dateStr:"20220126155959",
      oya: "090446134110010C01",
      koki:[
            {
                k0: "40123",
                k0p1: "011125959",
                k0p2: "3112595801259571125956",
            },
            {
                k0: "70222",
                k0p1: "011125959",
                k0p2: "00",
            }
        ]
    };
     var dataDumy2 = {
      dateStr:"20220126235959",
      oya: "123456789010010C01",
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
function data_con_init(dt)
{
    dt = {
      dateStr:"",
      cnum: "",
      oyaBat:{str:"",txt:"",fColor:"black",bkColor:"white"},
      oyaErrCode:{str:"",txt:"",bkColor:"white"},
      kokiNum:global.eq_dt.kokiNum,
      koki:[global.eq_dt.kokiNum]
    };
    
       var  koki ={
                    commErrCode:{str:"",txt:"",bkColor:"white"},
                    rssi:{str:"",txt:"",bkColor:"white"},
                    k0_errCode:{str:"",txt:"",bkColor:"white"},
                    k0_bat:{str:"",txt:"",bkColor:"white"},
                    k0_press:{str:"",txt:"",bkColor:"white"},
                    k0_teiden:{str:"",txt:"",bkColor:"white"},
                    pompCH:[POMP_CH_NUM]
       };
           var pompCH ={
               dtNum:"",
               pompDt:[POMP_DT_NUM]
           };
            var pompDt={
                st:"",
                dt:"",
                fColor:"black",
                bkColor:"white",
            };
            

    for(var k=0;k<global.eq_dt.kokiNum;k++)
    {
        for(var j=0;j<POMP_CH_NUM;j++) 
        {
            for(var i=0;i<POMP_DT_NUM;i++)
            {
                    pompDt.st=0;   
                    pompDt.bkColor='white';
                    pompDt.fColor='black';
                    pompDt.dt="";
                    pompCH.pompDt[i]=JSON.parse(JSON.stringify(pompDt));
                    
            }
            koki.pompCH[j]=JSON.parse(JSON.stringify(pompCH));
        }
        dt.koki[k]=JSON.parse(JSON.stringify(koki));
    }
    return dt;
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
//detail表示
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
   data_con.oyaBat.str=message_data[no].oya.substr(11,1);
   var wk=parseInt(data_con.oyaBat.str,10);
   if(wk==1)
   {
       data_con.oyaBat.txt='Low';
       data_con.oyaBat.bkColor='Red';
       data_con.oyaBat.fColor='white';
   }
   else
   {
       data_con.oyaBat.txt='Hi';
       data_con.oyaBat.bkColor='blue';
       data_con.oyaBat.fColor='white';
   }
   data_con.oyaErrCode.str=message_data[no].oya.substr(12,2);
   wk=parseInt(data_con.oyaErrCode.str,16);
   if(wk==1)
   {
       data_con.oyaErrCode.bkColor='Blue';
   }
   else
   {
       data_con.oyaErrCode.bkColor='orangered';
   }

    for(var i=0;i<global.eq_dt.kokiNum;i++)//子機数
    {
        //子機通信エラーコード
        data_con.koki[i].commErrCode.str=message_data[no].oya.substr(14+(i*4),2);
        var commErrCode=parseInt(data_con.koki[i].commErrCode.str,16);
        if(commErrCode==1)
        {
           data_con.koki[i].commErrCode.bkColor='Blue';
            //rssi
            data_con.koki[i].rssi.str=(parseInt(message_data[no].oya.substr(14+(i*4)+2,2),16))*-1;
            data_con.koki[i].rssi.bkColor='white';
            //子機エラーコード
            data_con.koki[i].k0_errCode.str=message_data[no].koki[i].k0.substr(1,1);
            wk=parseInt(data_con.koki[i].k0_errCode.str,10);
            if(wk==0)
            {
                data_con.koki[i].k0_errCode.bkColor='Blue';
            }
            else
            {
                data_con.koki[i].k0_errCode.bkColor='orangered';
            }
            //異常フラグ
            var str=message_data[no].koki[i].k0.substr(0,1);
            var ijyoFlg=parseInt(str,10);
            //Bit0.子機電源
            if((ijyoFlg & 1)==1)
            {
                data_con.koki[i].k0_bat.txt='Low';
                data_con.koki[i].k0_bat.bkColor='orangered';
            }
            else
            {
                data_con.koki[i].k0_bat.txt='Hi';
                data_con.koki[i].k0_bat.bkColor='Blue';
            }
            //Bit1.press
            data_con.koki[i].k0_press.str=message_data[no].koki[i].k0.substr(2,3);
            var f=parseFloat(data_con.koki[i].k0_press.str)/10;
            data_con.koki[i].k0_press.txt=f.toFixed(1);
            if((ijyoFlg & 2)==2)
            {
                data_con.koki[i].k0_press.bkColor='orangered';
            }
            else
            {
                data_con.koki[i].k0_press.bkColor='Blue';
            }
            //bit2.停電
            if((ijyoFlg & 4)==4)
            {
                data_con.koki[i].k0_teiden.bkColor='orangered';
                data_con.koki[i].k0_teiden.txt='停電';
            }
            else
            {
                data_con.koki[i].k0_teiden.bkColor='Blue';
                data_con.koki[i].k0_teiden.txt='';
            }
            //ポンプCH0
            data_con.koki[i].pompCH[0].dtNum=message_data[no].koki[i].k0p1.substr(0,2);
            for(var j=0;j<data_con.koki[i].pompCH[0].dtNum;j++)
            {
                data_con.koki[i].pompCH[0].pompDt[j].st=message_data[no].koki[i].k0p1.substr(2+(j*7),1);
                data_con.koki[i].pompCH[0].pompDt[j].dt=message_data[no].koki[i].k0p1.substr(3+(j*7),6);
                if(data_con.koki[i].pompCH[0].pompDt[j].st==1)
                {
                    data_con.koki[i].pompCH[0].pompDt[j].bkColor='Blue';
                    data_con.koki[i].pompCH[0].pompDt[j].fColor='white';
                }
                else
                {
                    data_con.koki[i].pompCH[0].pompDt[j].bkColor='white';
                    data_con.koki[i].pompCH[0].pompDt[j].fColor='Black';
                }
            }
            //ポンプCH1
            data_con.koki[i].pompCH[1].dtNum=message_data[no].koki[i].k0p2.substr(0,2);
            for( j=0;j<data_con.koki[i].pompCH[1].dtNum;j++)
            {
                data_con.koki[i].pompCH[1].pompDt[j].st=message_data[no].koki[i].k0p2.substr(2+(j*7),1);
                data_con.koki[i].pompCH[1].pompDt[j].dt=message_data[no].koki[i].k0p2.substr(3+(j*7),6);
                if(data_con.koki[i].pompCH[1].pompDt[j].st==1)
                {
                    data_con.koki[i].pompCH[1].pompDt[j].bkColor='Blue';
                    data_con.koki[i].pompCH[1].pompDt[j].fColor='white';
                }
                else
                {
                    data_con.koki[i].pompCH[1].pompDt[j].bkColor='white';
                    data_con.koki[i].pompCH[1].pompDt[j].fColor='Black';
                }
            }
        }
        else
        {
           data_con.koki[i].commErrCode.bkColor='orangered';
        }
    }

    var intNo = parseInt(no,10)+1;
    var content= {
       title:'data/detail',
       no:intNo,
       data_con:data_con
   };
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
        title:'マンホールデータ一覧',
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
    res.render('data/index', postData);
});

router.get('/update',(req, res, next)=> {
    res.render('data/update', postData);
});
//--------------------
//post
//--------------------
router.post('/post',(req, res, next)=> {
    var id=req.body['id'];
    postData.oya=req.body['oya'];
    
    postData.koki[id].k0=req.body['k0'];
    postData.koki[id].k0p1= req.body['k0p1'];
    postData.koki[id].k0p2= req.body['k0p2'];

    if(id==0){}
    if(id==global.eq_dt.kokiNum-1)//最後の子機のポストでデータ作成する。
    {
            
            dt= new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
            postData.dateStr = dt.toFormat('YYYYMMDDHH24MISS');
            jsonAddData(postData);
    }
   
    req.session.data=postData;
    var content={
        cnum:postData.oya.substr(0,11)
    };
    res.render('data/response',content);
    console.log(req.body);
    
    if((id==global.eq_dt.kokiNum-1) && (global.email_dt.sw=='on'))
    {
        var subject='manholeIoT'+postData.oya.substr(0,11)+'異常通知';
        sendMail(subject,'message');
    }
    console.log(global.ee);

});

router.get('/response',(req, res, next)=> {
    res.render('data/response', postData);
});

module.exports = router;


//--------------------
//function
//--------------------
function jsonAddData(psdata)
{
    var obj = {
      dateStr:"",
      oya: "0000000000000",
      koki:[]
    };
    var ko={    k0: "000000",
                k0p1: "00",
                k0p2: "00",
            };
            
    for(var i=0;i<global.eq_dt.kokiNum;i++)
    {
        obj.koki[i]=JSON.parse(JSON.stringify(ko));    
    }
    
    obj.dateStr=psdata.dateStr;
    obj.oya=psdata.oya;
    for( i=0;i<global.eq_dt.kokiNum;i++)
    {
        obj.koki[i].k0=psdata.koki[i].k0;
        obj.koki[i].k0p1=psdata.koki[i].k0p1;
        obj.koki[i].k0p2=psdata.koki[i].k0p2;
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

 
}
// テキストファイルをロード
function readFromFile(fname) {
   fs.readFile(fname, 'utf8', function(error, d) {
       message_data = d.split('\n');
       console.log(d);
       console.log(message_data);
       console.log(message_data.length);
 });
}
// データを保存
function saveToFile(fname) {
  var data_str = message_data.join('\n');
  fs.writeFile(fname, data_str, (err) => {
    if (err) { throw err; }
  });
}



// メール送信関数
function sendMailsub(smtpData, mailData) {
 
  // SMTPサーバの情報をまとめる
  const transporter = NodeMailer.createTransport(smtpData);
 
  // メール送信
  transporter.sendMail(mailData, function (error, info) {
    if (error) {
      // エラー処理
      console.log(error);
    } else {
      // 送信時処理
      console.log('Email sent: ' + info.response);
    }
  });
}

function sendMail(subjectTx,textTx) {
  var smtpData = {
        host: 'smtp.gmail.com',
        port: '465',
        secure: true, // SSL
        auth: {
            user: 'fandosystemsserver@gmail.com',
            pass: 'vfdsdjavssaryyox'
        }
    };
   // 送信内容を作成
  const mailData = {
    from: '"manholeIoT<' + smtpData.auth.user + '>', // 送信元名
    to: global.email_dt.address,                       // 送信先
    subject: subjectTx,                              // 件名
    text: 'http://54.150.157.88:8080',               // 通常のメール本文
    html: "<a href='http://54.150.157.88:8080'>manholeIoTへ</a>",               // HTMLメール
  };

  // メールを送信
  sendMailsub(smtpData, mailData);
}

  