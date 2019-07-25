const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
var router=express.Router();

//1.注册页面
router.post('/reg',(req,res)=>{
	 var obj=req.body;
	console.log(obj);
	
	//验证用户名是否为空, obj.uname===''
	 if(!obj.uname){
		res.send({code:401,msg:'uname required'});
		//阻止往后执行
		return;
	}
	
	
//验证用户名是否为空,
      if(!obj.upwd){
		res.send({code:402,msg:'upwd required'});
		//阻止往后执行
		return;
	}


//验证邮箱是否为空,
      if(!obj.email){
		res.send({code:403,msg:'email required'});
		//阻止往后执行
		return;
	}
	

//验证电话是否为空,
      if(!obj.phone){
		res.send({code:404,msg:'phone required'});
		//阻止往后执行
		return;
	}
	//执行SQL语句
      pool.query('INSERT INTO xz_user SET ?', [obj],function(err,result){
		if(err) throw err;
		console.log(result);
		//如果注册成功
		//{code:200,msg:'register suc'}
		if(result.affectedRows>0){
			res.send({code:200,msg:'register suc'});
		}
	});
	
});

//2.登录页面
router.post('/login',(req,res)=>{
	var obj=req.body;  //
	console.log(obj);
	//验证用户是否为空, obj.uname===''
	if(!obj.uname){
		res.send({code:401,msg:'uname required'});
		//阻止往后执行
		return;
	}
//验证密码是否为空,
   if(!obj.upwd){
		res.send({code:402,msg:'upwd required'});
		//阻止往后执行
		return;
	}
	
	//执行SQL语句
	pool.query('SELECT *FROM xz_user WHERE uname=? AND upwd=?', [obj.uname,obj.upwd],function(err,result){
		if(err) throw err;
		//如果注册成功
		//{code:200,msg:'register suc'}
		
		if(result.length>0){
			res.send({code:200,msg:'login suc'});
		}else{
			res.send({code:301,msg:'login err'});
			}
			
	});
	
});

//3.检索用户
router.get('/detail',(req,res)=>{
	//获取数据     req.query.uid
	var num=req.query.uid;
	//验证为空
	if(!num){
		res.send({code:401,msg:'uid required'});
		return;
	}
	//执行SQL语句
	pool.query('SELECT *FROM xz_user WHERE  uid=?;',[num],function(err,result){
		if(err) throw err;
		if(result.length>0){
			//res.send(result);
			res.send(result[0]);
		}else{
			res.send({code:301,msg:'uid is empty'});
		}
	});
});
//4.修改用户
router.get('/update',(req,res)=>{
	var obj=req.query;
	var i=400;
	for(var key in obj){
		i++;
		if(obj[key]==''){
			res.send({code:i,msg:key+' required'});
			return;
		}
	}
//执行SQL语句
	pool.query('UPDATE xz_user SET ? WHERE  uid=?;',[obj,obj.uid],function(err,result){
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'update suc'});
		}else{res.send({code:301,msg:'update err'});}
	});
});
//分页查询
router.get('/list',(req,res)=>{
	//req.query 对象: pno size
	var obj=req.query;
	var pno=obj.pno;
    var size=obj.size
	if(!pno)pno=1;
	if(!size)size=3;
	//转为整型
    pno=parseInt(pno);
	size=parseInt(size);
	//计算开始查询的值
	var start=(pno-1)*size;
	pool.query('select uname from xz_user limit ?,? ',[start,size],(err,result)=>{
		if(err) throw err;
		res.send(result);
	});

  });
//删除用户
router.get('/delete',(req,res)=>{
	//req.query
	var a=parseInt(req.query.uid);
	pool.query('delete from xz_user where uid=?',a,(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'delete suc'});
		}else{res.send({code:301,msg:'delete err'})}
	});

});
//导出路由器对象
module.exports=router;