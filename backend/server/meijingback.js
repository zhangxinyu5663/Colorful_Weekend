
//拿到首页推荐作品
router.get('/api/homeProject',function(req,res){
  const sql='select * from homeRecommend';
  connection.query(sql,function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
});

//拿到系统作品
router.get('/api/officialProject',function(req,res){
  const sql='select * from officialProject';
  connection.query(sql,function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
});

//拿到用户作品
router.get('/api/userProject',function(req,res){
  const sql='select * from myPublish';
  connection.query(sql,function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
});

//查找用户作品详情
router.post('/api/userProjectDetail',function(req,res){
  const sql='select * from userProject where projectID=?';
  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});


//查找系统作品详情
router.post('/api/officialProjectDetail',function(req,res){
  const sql='select * from officialProject where projectID=?';
  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//首页作品按照作品ID号搜索+查看推荐作品详情
router.post('/api/searchthree/projectID',function(req,res){
  const sql='select * from homeRecommend where projectID=?';
  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//首页作品按照用户ID搜索
router.post('/api/searchthree/userID',function(req,res){
  const sql='select * from homeRecommend where userID=?';
  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//首页作品按照地点查找作品
//router.post('/api/searchthree/place',function(req,res){
 // const sql='select * from homeRecommend where palce=?';
 // connection.query(sql,[req.body.place],function(err,results){
   // if(err){
     // console.error(err);
     // process.exit(1);
   // }     
   // log(results);
    //res.json(results);    
 // });
//});

//用户作品按照作品ID号搜索+查看用户作品详情
router.post('/api/searchfive/projectID',function(req,res){
  const sql='select * from userProject where projectID=?';
  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//用户作品按照用户ID搜索
router.post('/api/searchfive/userID',function(req,res){
  const sql='select * from userProject where userID=?';
  connection.query(sql,[req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//用户作品按照地点查找作品
//router.post('/api/searchthree/place',function(req,res){
 // const sql='select * from homeRecommend where palce=?';
 // connection.query(sql,[req.body.place],function(err,results){
   // if(err){
     // console.error(err);
     // process.exit(1);
   // }     
   // log(results);
    //res.json(results);    
 // });
//});


//删除首页作品
router.post('/api/homeProject/delete',function(req,res){
  const sql='delete from homeRecommend where projectID=?';

  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({'message':'del success'});
  })
});

//删除系统作品
router.post('/api/officialProject/delete',function(req,res){
  const sql='delete from officialProject where projectID=?';

  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({'message':'del success'});
  })
});
//删除用户作品
router.post('/api/userProject/delete',function(req,res){
  const sql='delete from userProject where projectID=?';

  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({'message':'del success'});
  })
});

//推送系统作品到推荐
router.post('/api/officialProject/push',function(req,res){
  const sql1='select * from officialProject where projectID=?';
  const sql2='insert into homeRecommend values(?,?,?,?,?,?,?,?,?,?)';
  const sql3='delete from officialProject where projectID=?'
  var userID,projectID,imgs,context,zan,keyword,collection,comment,time;

  connection.query(sql1,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    console.log(results[0]);
    userID=0;//0代表系统作品
    projectID=results[0].projectID;
    imgs=results[0].imgs;
    context=results[0].context;
    zan=0;
    keyword=results[0].keyword;
    collection=0;
    comment=0;
    time=results[0].time;
    connection.query(sql2,[0,userID,projectID,imgs,context,zan,keyword,collection,comment,time],function(err,results){
      //number字段是随便插得，系统推送上去的都是插得0.
      if(err){
        console.log(err);
        process.exit(1);
      }
      connection.query(sql3,[req.body.projectID],function(err,results){
        if(err){
          console.log(err);
          process.exit(1);
        }
        res.json({'message':'push success'});
      })
    })
  })
});

//推送用户作品到推荐
router.post('/api/userProject/push',function(req,res){
  const sql1='select * from userProject where projectID=?';
  const sql2='insert into homeRecommend values(?,?,?,?,?,?,?,?,?,?)';
  const sql3='delete from userProject where projectID=?'
  var userID,projectID,imgs,context,zan,keyword,collection,comment,time;

  connection.query(sql1,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    console.log(results[0]);
    userID=results[0].userID;//0代表系统作品
    projectID=results[0].projectID;
    imgs=results[0].imgs;
    context=results[0].context;
    zan=0;
    keyword=results[0].keyword;
    collection=0;
    comment=0;
    time=results[0].time;
    connection.query(sql2,[1,userID,projectID,imgs,context,zan,keyword,collection,comment,time],function(err,results){
      //number字段是随便插得，用户作品推送上去的都是插得1.
      if(err){
        console.log(err);
        process.exit(1);
      }
      connection.query(sql3,[req.body.projectID],function(err,results){
        if(err){
          console.log(err);
          process.exit(1);
        }
        res.json({'message':'push success'});
      })
    })
  })
});

//系统作品按照作品ID号搜索
router.post('/api/searchfour/projectID',function(req,res){
  const sql='select * from officialProject where projectID=?';
  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});

//系统作品按照地点查找作品
//router.post('/api/searchfour/place',function(req,res){
 // const sql='select * from officialProject where palce=?';
 // connection.query(sql,[req.body.place],function(err,results){
   // if(err){
     // console.error(err);
     // process.exit(1);
   // }     
   // log(results);
    //res.json(results);    
 // });
//});

//上传系统作品图
router.post('/api/uploadproject', function(req, res) {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = AVATAR_UPLOAD_FOLDER+'officialProject/';     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function(err, fields, files) {//解析上传内容
      if (err) {
            res.json(err);
            return;                    
      }
      log(files);
      //var fileName=files.imageIcon.name; //文件名字
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
     // var avatarName = Date.now() + '.' + extName;
      var fileNameArr=files.imageIcon.name.split('.');
      var fileName=fileNameArr[0]+'.'+extName;
      console.log(fileName);
      //图片写入地址；
      var newPath = form.uploadDir + fileName;
      //显示地址；
      var showUrl =domain+'/upload/officialProject/'+fileName;
      console.log("newPath",newPath);
      //console.log(showUrl);
      console.log(files.imageIcon.path);
      fs.renameSync(files.imageIcon.path, newPath);  //重命名
      console.log(showUrl);
      res.send(showUrl);
    });
});

//创建系统作品
router.post('/api/officialProject/create',function(req,res){
  const sql='insert into officialProject values(?,?,?,?,?,?,?,?,now())';
  connection.query(sql,[0,req.body.projectID,req.body.imgs,req.body.context,0,req.body.keyword,0,0],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   //log(results);
    res.json({'message':'create success'});    
  });
});
//拿到所有评论
router.get('/api/comment',function(req,res){
  const sql='select * from comment';
  connection.query(sql,function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json(results);
  })
});
//按照作品ID号搜索评论
router.post('/api/searchnine/projectID',function(req,res){
  const sql='select * from comment where ProjectID=?';
  connection.query(sql,[req.body.projectID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});
//按照用户ID搜索评论
router.post('/api/searchnine/userID',function(req,res){
  const sql='select * from comment where CommentUserID=?';
  connection.query(sql,[req.body.userID],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }     
   // log(results);
    res.json(results);    
  });
});
//删除评论
router.post('/api/comment/delete',function(req,res){
  const sql='delete from comment where RowGuid=?';

  connection.query(sql,[req.body.RowGuid],function(err,results){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.json({'message':'del success'});
  })
});




