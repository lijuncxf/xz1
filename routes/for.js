for (var i=0;i<3 ;i++ )
{setTimeout(function(){
	console.log(i);
},0);
console.log(i);
}
i++;
console.log(i);//结果耐人寻味，事件队列