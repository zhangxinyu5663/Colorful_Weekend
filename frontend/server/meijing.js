

//请求首页详情和首页作品评论
router.post('/api/homedetail',function(req,res){
  const sql1 = "select homeRecommend.*,user.userName,head from homeRecommend,user where homeRecommend.userID=user.ID and projectID=?";
  const sql2 = "select comment.*,user.userName,head from comment,user where comment.CommentUserID=user.ID and projectID=? order by CommentDate";
  var detail,comments;

  connection.query(sql1,[req.body.id],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    detail=results;
  });
  connection.query(sql2,[req.body.id],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    comments=results;
    res.json({"detail":detail,"comments":comments});
  });
});
//添加评论
router.post('/api/majorcomment',function(req,res){
  const sql1 = "insert into comment values(uuid(),null,?,?,now(),null,?)";
  const sql2 = "select head,userName from user where ID=?"
  connection.query(sql1,[req.body.context,req.body.userID,req.body.projectID],function(err,results){
  
    if(err){
      console.log(err);
      project.exit(1);
    }
    connection.query(sql2,[req.body.userID],function(err,results){
      if(err){
        console.log(err);
        project.exit(1);
      }
    console.log(results[0]);
    res.json(results[0]);
    })
  });

})

//回复评论
router.post('/api/addcomment',function(req,res){
  const sql1 = "insert into comment values(uuid(),?,?,?,now(),?,?)";
  const sql2 = "select CommentUserID from comment where RowGuid=?";
  var ToUserID;

  connection.query(sql2,[req.body.RowGuid],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    console.log(results);
    ToUserID=results[0].CommentUserID;
    console.log(ToUserID);

  connection.query(sql1,[req.body.RowGuid,req.body.context,req.body.userID,ToUserID,req.body.projectID],function(err,results){
    console.log(ToUserID);
    if(err){
      console.log(err);
      project.exit(1);
    }
    console.log(results);
    res.json({"message":"sucessful"});
  });

})
});

//我评论的和评论我的。
router.post('/api/comment',function(req,res){
  const sql1="select comment.CommentText,CommentDate,user.head,userName,homeRecommend.imgs from comment,user,homeRecommend where comment.CommentUserID=user.ID and comment.CommentUserID=? and comment.ProjectID=homeRecommend.projectID"; 
  const sql2="select comment.CommentText,CommentDate,user.head,userName,homeRecommend.imgs from homeRecommend,comment,user where homeRecommend.userID=? and user.ID=homeRecommend.userID and homeRecommend.projectID=comment.ProjectID" 

  var Mycomment=[],commentMy=[];
  connection.query(sql1,[req.body.userID],function(err,results){
    if(err){
      console.log(err);
      process.exit(1);
    }
    Mycomment=results;
    log(Mycomment);
    connection.query(sql2,[req.body.userID],function(err,results){ 
      if(err){
        console.log(err);
        process.exit(1);
      }
      commentMy=results;

      res.json({"commentMy":commentMy,"Mycomment":Mycomment});
    })
  })
});
  
