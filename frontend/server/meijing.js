const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
var formidable = require('formidable'),
        fs = require('fs'),
        TITLE = 'formidable上传示例',
        AVATAR_UPLOAD_FOLDER = 'public/avatar/',
        domain = "http://192.168.73.144:8080";

const log = console.log;

app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({extended:true}));

app.use(express.static('./public'));

const connection = mysql.createConnection({
      host:"localhost",
      user:"root",
      password:"ddd",
      database:"weekend"
});

connection.connect();


router.post('/api/ajaxUpload', function(req, res) {
    console.log(1);
    //console.log(req.body.fd);
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = AVATAR_UPLOAD_FOLDER;     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function(err, fields, files) {//解析上传内容
      if (err) {
            res.json(err);
            return;                    
      }
      console.log(files);
      var extName = '';  //后缀名
      console.log(files.imageIcon.type);
      switch (files.imageIcon.type) {
         case 'image/pjpeg':
           extName = 'jpg';
           break;
         case 'image/jpeg':
           extName = 'jpg';
           break;
         case 'image/png':
           extName = 'png';
           break;
         case 'image/x-png':
           extName = 'png';
           break;
      }
      console.log(extName);
      if(extName.length == 0){
        res.json =({'message':'只支持png和jpg格式图片'});
        return;
      }
      var avatarName = Date.now() + '.' + extName;
      console.log(avatarName);
      //图片写入地址；
      var newPath = form.uploadDir + avatarName;
      //显示地址；
      var showUrl =domain+'/avatar/'+avatarName;
      console.log("newPath",newPath);
      //console.log(showUrl);
      console.log(files.imageIcon.path);
      fs.renameSync(files.imageIcon.path, newPath);  //重命名
      console.log(showUrl);
      res.json(showUrl);
      //res.json('/avatar'+avatarName);
    });
});



router.get('/api/home',function(req,res){
  const sql = "select * from homeRecommend";

  connection.query(sql,function(err,results){
    if(err){
      log(err);
      process.exit(1);
    }
    results.forEach(function(e){
      log(e);
    })
    res.json(results);
   });
});

app.use(router);
app.listen(8080);
