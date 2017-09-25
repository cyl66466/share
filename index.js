function id(ID){
	return document.getElementById(ID);
}
function tag(name,father){
	father=father||document;
	return father.getElementsByTagName(name);
}
//旋转木马		
var rota_index=0;//记录当前角度
var rota_handler=null;//记录定时器
var dir=0;  //记录此时旋转方向
function rotating_left(){
	rota_index=rota_index+60;
	dir=0;
	id('rotate').style.transform="rotateY("+(-rota_index)+"deg)";
}
function rotating_right(){
	rota_index=rota_index-60;
	dir=1;
	id('rotate').style.transform="rotateY("+(-rota_index)+"deg)";
}
function slide(){// 左右点击滑动上/下一张事件
	var stage_left=id('stage_left');
	var stage_right=id('stage_right');
	var rotate=id('rotate');
	id('rotate').onmouseover=function(){
		clearInterval(rota_handler);
	}
	id('rotate').onmouseout=function(){
		if(dir==1){
			rota_handler=setInterval(rotating_right,3000);
		}else{
			rota_handler=setInterval(rotating_left,3000);	
		}
	}			
	stage_left.onclick=function(){
		rotating_left();
		clearInterval(rota_handler);
		rota_handler=setInterval(rotating_left,3000);	
	}
	stage_right.onclick=function(){
		// var index=index-(index-1)
		rotating_right();	
		clearInterval(rota_handler);
		rota_handler=setInterval(rotating_right,3000);
	}
}
// var curIndex=1;
// function changeImage(nextIndex){
// 	var imgs=tag('img',id('banner'));
// 	var lis=tag('li',id('bannerLis'));
// 	imgs[curIndex].className='hide';
// 	imgs[nextIndex].className='show';
// 	lis[curIndex].className='';
// 	lis[nextIndex].className='active';
// 	curIndex=nextIndex;
// }

// function autoChange(){
// 	var imgs=tag('img',id('banner'));
// 	var nextIndex=nextIndex||(curIndex+1>=imgs.length?0:curIndex+1);
// 	changeImage(nextIndex);
// }
window.onload=function(){
	rota_handler=setInterval(rotating_left,3000);
	slide();
	var firstLi=tag('li',id('rightPart2'))[1];
	// console.log(firstLi.innerText);
	toggle.call(toggle,2,firstLi); 
	// handler=setInterval(autoChange,3000);
	// id('banner').onmouseover=function(){
	// 	clearInterval(handler);
	// }
	// id('banner').onmouseout=function(){
	// 	handler=setInterval(autoChange,3000);
	// }
	// var lis=tag('li',id('bannerLis'));
	// for(var i=0;i<lis.length;i++){
	// 	(function(i){
	// 		lis[i].onclick=function(){
	// 			changeImage(i);
	// 		}
	// 	})(i);
	// }
}
var curPage=1;
var nextPage=1;
var tagData=0;var tagData2=1;
var dataNext=['umbrella','cars','bicycle','charge'];
var funC=null;
var data={
	umbrella:[		
	{id:'101',品牌:'魔力伞',遗失率:'25%',损坏率:'40%',借出率:'10%',押金:'25'},
	{id:'102',品牌:'OTO',遗失率:'15%',损坏率:'50%',借出率:'60%',押金:'35'},
	{id:'103',品牌:'有把伞',遗失率:'45%',损坏率:'45%',借出率:'10%',押金:'45'},
	{id:'104',品牌:'共享e伞',遗失率:'15%',损坏率:'60%',借出率:'50%',押金:'25'},
	{id:'105',品牌:'JJ伞',遗失率:'35%',损坏率:'70%',借出率:'10%',押金:'45'},
	{id:'106',品牌:'春笋',遗失率:'15%',损坏率:'50%',借出率:'40%',押金:'5'},
	],
	cars:[	
	{id:'201',品牌:'Car2Go',损坏率:'30%',款式:'宝马3系',使用率:'10%',押金:'1000'},
	{id:'202',品牌:'Car2Share',损坏率:'30%',款式:'标志530',使用率:'70%',押金:'2000'},
	{id:'202',品牌:'TOGO',损坏率:'30%',款式:'标志530',使用率:'50%',押金:'20000'},
	{id:'203',品牌:'EVCARD',损坏率:'20%',款式:'宝马3系',使用率:'70%',押金:'19999'},
	{id:'204',品牌:'快的',损坏率:'40%',款式:'modelS',使用率:'20%',押金:'200'},
	{id:'205',品牌:'神州专车',损坏率:'10%',款式:'宝马3系',使用率:'70%',押金:'10000'},
	{id:'206',品牌:'苏打出行',损坏率:'60%',款式:'现代',使用率:'10%',押金:'20000'},
	],
	bicycle:[	
	{id:'301',品牌:'ofo',损坏率:'70%',使用率:'88%',占有率:'50%',押金:'199'},
	{id:'302',品牌:'mobike',损坏率:'40%',使用率:'48%',占有率:'20%',押金:'299'},
	{id:'303',品牌:'悟空单车',损坏率:'60%',使用率:'28%',占有率:'10%',押金:'199'},
	{id:'304',品牌:'优拜单车',损坏率:'30%',使用率:'48%',占有率:'4%',押金:'99'},
	{id:'305',品牌:'小蓝单车',损坏率:'20%',使用率:'28%',占有率:'4%',押金:'299'},
	{id:'306',品牌:'永安行',损坏率:'10%',使用率:'18%',占有率:'10%',押金:'99'},
	],
	charge:[		
	{id:'401',品牌:'来电科技',损坏率:'10%',使用率:'50%',款式:'A',押金:'30'},
	{id:'402',品牌:'街电科技',损坏率:'40%',使用率:'30%',款式:'B',押金:'20'},
	{id:'403',品牌:'小电科技',损坏率:'30%',使用率:'50%',款式:'B',押金:'0'},
	{id:'404',品牌:'云充吧',损坏率:'60%',使用率:'20%',款式:'B',押金:'100'},
	]
}
function del(target){
	switch(curPage){
		case 1:
			for(var i=0;i<data.umbrella.length;i++){
				if(data.umbrella[i].id=target){
					data.umbrella.splice(i,1);
					return true;
				}else
				 	return false;
			}
		;
		break;
		case 2:
			for(var i=0;i<data.cars.length;i++){
				if(data.cars[i].id=target){
					data.cars.splice(i,1);
					return true;
				}else
				 	return false;
			}
		;
		break;
		case 3:
			for(var i=0;i<data.bicycle.length;i++){
				if(data.bicycle[i].id=target){
					data.bicycle.splice(i,1);
					return true;
				}else
				 	return false;
			}
		;
		case 4:
			for(var i=0;i<data.charge.length;i++){
				if(data.charge[i].id=target){
					data.charge.splice(i,1);
					return true;
				}else
				 	return false;
			}
		;
		break;
	}			
}
window.onmessage=function(e){  //收到子窗口的信息
	var msg=JSON.parse(e.data);
	var sendMsg=null;
	var iframeWindow=document.getElementById('child1').contentWindow;	
	switch(msg.flag){
		case 'del':
			var result=del(e.data);
			if(result){
				sendMsg={flag:'delcomplet'};
				sendMsg=JSON.stringify(sendMsg);
				iframeWindow.postMessage(sendMsg,'*');
			}
		break;
		case 'add':
				add(e.data);
				sendMsg={flag:'addcomplet'};
				sendMsg=JSON.stringify(sendMsg);
				iframeWindow.postMessage(sendMsg,'*');
			
		;
		break;
		case 'update':
				update(e.data);
				sendMsg={flag:'updatecomplet'};
				sendMsg=JSON.stringify(sendMsg);
				iframeWindow.postMessage(sendMsg,'*');
		;
		break;
		default:break;
	}
}
function search(){

}	
function childLoad(target){
	switch(curPage){
		case 1:
			var msg={
			flag:'show',
			data:data.umbrella,
		};
		break;
		case 2:
			var msg={
			flag:'show',
			data:data.cars
		};
		break;
		case 3:
			var msg={
			flag:'show',
			data:data.bicycle
		};
		break;
		case 4:
			var msg={
			flag:'show',
			data:data.charge
		};
		break;
		default:
			var msg={
				flag:'show',
				data:data.umbrella,
			};
		break;
	}
	
	msg=JSON.stringify(msg);
	target.contentWindow.postMessage(msg,'*');
}	
function toggle(index,target){
	// console.log(target);
	curPage=index;
	var page=document.getElementById('child1');
	page.src='iframes/child'+index+'.html';
	page.setAttribute('data-page',index);
	// inner(index);
	dataShow(curPage,target);
	scrollData(index);
	curPage=index;

}
function scrollData(index){
	//定时器全局
	var dataLiCur1=[];
	var dataLiCur2=[];
	var tagData=0;

	var tagData2=1;
	var dataCur=data[dataNext[index-1]]; //当前页面展示的数据
	var lengthCur=dataCur.length-1; //当前页面数据长度
	// console.log(lengthCur);
	// var funD=setInterval(function(){console.log(1);},1000)
	if(nextPage==curPage) return;
	else{		
		clearInterval(funC);
	}
	funC=setInterval(function(){
		dataLiCur1=[];
		dataLiCur2=[];

		tagData>lengthCur-1?tagData=0:tagData++;
		tagData2>lengthCur-1?tagData2=0:tagData2++;

		for(var i in dataCur[tagData]){
			// console.log(dataCur[tagData][i]);
			dataLiCur1.push(dataCur[tagData][i]);
			dataLiCur2.push(dataCur[tagData2][i]);
		}
		drawData(dataLiCur1,dataLiCur2);
		// console.log(dataLiCur1+dataLiCur2);
	},1000)
	
	nextPage=curPage;
}
// 填充数据
function drawData(dataLiCur1,dataCur2){
	// console.log(dataLiCur1+dataCur2);
	var bestUl2=document.getElementById('bestUl2');

	var bestUl1=document.getElementById('bestUl1');
	// bestUl2.className='';

	var bestLis=bestUl1.getElementsByTagName('li');
	var bestLis1=bestUl2.getElementsByTagName('li');
	var bestUl1html='';

	var bestUl2html='';
	for(var i=0;i<dataLiCur1.length;i++){
		bestUl1html+='<li class="liChange1">'+dataLiCur1[i]+'</li>';
	}
	bestUl1.innerHTML=bestUl1html;
	// bestUl1.className='liChange2';
	for(var i=0;i<dataCur2.length;i++){
		bestUl2html+='<li class="liChange2">'+dataCur2[i]+'</li>';
	}
	bestUl2.innerHTML=bestUl2html;
	// console.log()
}
function dataShow(index,target){		
	var h3=document.getElementById('rightTop').getElementsByTagName('h3')[0];
	h3.innerText=target.innerText+'项目展示';
	var divMain=document.getElementById('rightMain');
	var dataCur=data[dataNext[index-1]]; //当前页面展示的数据
	var lengthCur=dataCur.length-1; //当前页面数据长度
	// console.log(lengthCur);
	var lisOne=divMain.getElementsByTagName('ul')[0].getElementsByTagName('li');
	var num=0; //辅助变量添加滚动的标题;
	//var tag=0; //记录当前滚动的行
	var dataArr=[];
	var dataB=null;var dataA=null;
	for(var i in dataCur[0]){  //滚动标题栏			
			lisOne[num].innerText=i;
			num++;														
		}		
}			
function add(obj){
	obj=JSON.parse(obj);		
	switch(curPage){
		case 1:
			data.umbrella.push(obj.data);
		;
		break;
		case 2:
			data.cars.push(obj.data);
		;
		break;
		case 3:
			data.bicycle.push(obj.data);
		;
		break;
		case 4:
			data.charge.push(obj.data);
		;
		break;
		default:break;
	}
}
function update(obj){
	obj=JSON.parse(obj);
	switch(curPage){
		case 1:
			for(var i=0;i<data.umbrella.length;i++){
				if(data.umbrella[i].id==obj.data.name)
					data.umbrella[i]=obj.data;
			}
		;
		break;
		case 2:
			for(var i=0;i<data.cars.length;i++){
				if(data.cars[i].id==obj.data.name)
					data.cars[i]=obj.data;
			}
		;
		break;
		case 3:
			for(var i=0;i<data.bicycle.length;i++){
				if(data.bicycle[i].id==obj.data.name)
					data.bicycle[i]=obj.data;
			}
		;
		break;
		case 4:
			for(var i=0;i<data.charge.length;i++){
				if(data.charge[i].id==obj.data.name)
					data.charge[i]=obj.data;
			}
		;
		break;
	}
}