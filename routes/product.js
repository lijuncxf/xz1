const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
router.get('/list',(req,res)=>{
	var obj=req.query;
	//console.log(obj);
	var pno= parseInt(obj.pno);
	var size=parseInt(obj.size);
	if(!pno){pno=0}
	if(!size){size=1}
	pool.query('select *from xz_laptop limit ?,?',[pno,size],(err,result)=>{
		if(err) throw err;
		if(result.length>0){res.send(result);}
		else{res.send({code:301,msg:'limit err'});}
	})

});

//导出路由器对象
module.exports=router;