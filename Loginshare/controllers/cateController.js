var dbConfig=require('../util/dbconfig')

getCate=(req,res)=>{
    var sql='select * from cate'
    var sqlArr=[];
    var callBack=(err,data)=>{
      if(err){
        console.log('连接出错了');
      }else{
        res.send({
          'list':data,
        })
      }
    }
    dbConfig.sqlConnect(sql,sqlArr,callBack)
}
getPostCate=(req,res)=>{
    let {id}=req.query;
    var sql='select * from post where id=?';
    var sqlArr=[id];
    var callBack=(err,data)=>{
        if(err){
          console.log('连接出错了');
        }else{
          res.send({
            'list':data,
          })
        }
      }
      dbConfig.sqlConnect(sql,sqlArr,callBack)
}
module.exports={
    getCate,
    getPostCate
}