var d=document,isDOM=d.getElementById,isIE=d.all&&d.all.item,isIE5=navigator.appVersion.indexOf('MSIE 5')==-1?false:true,isIE6=navigator.appVersion.indexOf('MSIE 6')==-1?false:true;

var familyStr='',navTimer=null,navOn=false,navVisible='',navPopupDirCurr=null,navPopupDirPrev=null;
var isOnScrollBar=false,activeel='';

function GC() {
this.invert=function(curClass) {return this.mapGC[curClass];}
this.map={
	'idx1':{'top':'GC28','inline':'GC30','back':'GC30'},
	'idx2':{'top':'GC32','inline':'GC34','back':'GC34'}
};
this.mapGC={
	'GC28':'GC29','GC30':'GC31','GC32':'GC33','GC34':'GC35',
	'GC29':'GC28','GC31':'GC30','GC33':'GC32','GC35':'GC34'
};
}
oGC=new GC;

function navCloseSiblings(parID){
	var cnt=0;
	if(familyStr){
		familyArr=familyStr.split(",");
		familyStr=navVisible;
		for(var i=familyArr.length-1;i>0;i--){
			if(parID==familyArr[i]){for(var j=1;j<=i;j++)familyStr+=","+familyArr[j];i=0;}
			else{navClose(familyArr[i]);cnt++;}
		}
		showComboBoxes(true);
	}
	return cnt;
}
function navCloseAll(){
	if(familyStr&&!navOn){
		familyArr=familyStr.split(","),len=familyArr.length;
		familyStr=navVisible;
		for(var i=len-1;i>0;i--){setTimeout('navClose("'+familyArr[i]+'")',25*(len-i));}
		showComboBoxes(true);
	}
}
function navClose(id){d.getElementById(id).style.visibility='hidden';}
function findScrollHeight(){
	var pos=0;
	if(window.pageYOffset){pos=window.pageYOffset;}
	else if(d.documentElement&&d.documentElement.scrollTop){pos=d.documentElement.scrollTop;}
	else if(d.body){pos=d.body.scrollTop;}else{pos=0;}
	return pos;
}
function findScrollWidth(){
	var pos=0;
	if(window.pageXOffset){pos=window.pageXOffset}
	else if(d.documentElement&&d.documentElement.scrollLeft){pos=d.documentElement.scrollLeft}
	else if(d.body){pos=d.body.scrollLeft;}else{pos=0;}
	return pos;
}
function findPosX(o,traverseUp){
	if(traverseUp){
		var x=0;
		while(o.offsetParent){x+=o.offsetLeft;o=o.offsetParent;}
		return x+findScrollWidth();
	}
	else{return o.offsetLeft;}
}
function findPosY(o,traverseUp){
	if(traverseUp){
		var y=0;
		while(o.offsetParent){y+=o.offsetTop;o=o.offsetParent;}
		return y+findScrollHeight();
	}
	else{return o.offsetTop;}
}
function navPos(o,traverseUp){
	this.l=findPosX(o,traverseUp);
	this.t=findPosY(o,traverseUp);
	this.w=(typeof(o.clientWidth)!='undefined'&&o.clientWidth>0?o.clientWidth:o.offsetWidth);
	this.h=(typeof(o.clientHeight)!='undefined'&&o.clientHeight>0?o.clientHeight:o.offsetHeight);
	this.r=function(){return this.l+this.w;}
	this.b=function(){return this.t+this.h;}
}
function displaySubmenu(idxName,submenu,gmM,gm,gmR,orientation){
	var horz=(orientation==1),isFirstSub=(gmM.className.replace(/^.*[ ]?idx[12](.*)$/,'$1').indexOf('Sub')==-1);
	var navPopupDirOrig=(tf.extra?(idxName=='idx1'?tf.extra.index1holder.navPopupDir:tf.extra.index2holder.navPopupDir):navPopupDir),dir=(isFirstSub?navPopupDirOrig:navPopupDirCurr),elNav=d.getElementById(idxName+'Navigation');

	var elSub=d.getElementById(submenu),posSub=new navPos(elSub,true);
	var posView=new navPos(d.documentElement,true);
	var posParL=new navPos(gm,true),posParM=new navPos(gmM,true),posParR=new navPos(gmR,true),posPar=posParL;
	posPar.w=posParL.w+posParM.w+posParR.w;
	posPar.l-=findScrollWidth();
	posPar.t-=findScrollHeight();

	navPopupDirPrev=navPopupDirCurr;

	var _left=0,_top=0;

	switch(dir){
	case 'down':
		_left=(isFirstSub?posPar.l:posPar.r());
		_top=(isFirstSub?posPar.b():posPar.t);
		navPopupDirCurr='right';
		break;
	case 'up':
		_left=(isFirstSub?posPar.l:posPar.r());
		_top=posPar.t-posSub.h;
		navPopupDirCurr='right';
		break;
	case 'right':
		_left=posPar.r();
		_top=(navPopupDirOrig=='up'?posPar.b()-posSub.h:posPar.t);
		navPopupDirCurr='right';
		break;
	case 'left':
		_left=posPar.l-posSub.w;
		_top=(navPopupDirOrig=='up'?posPar.b()-posSub.h:posPar.t);
		navPopupDirCurr='left';
		break;
	}
	if(_left-posView.l<posView.l){
		_left=(isFirstSub?posView.l:posPar.r());
		navPopupDirCurr='right';
	}
	if(_left+posSub.w-posView.l>posView.r()){
		_left=(isFirstSub?posView.r()+posView.l:posPar.l)-posSub.w;
		navPopupDirCurr='left';
	}
	if(_top-posView.t<posView.t&&dir!='up'){
		_top=(isFirstSub?posView.t:posPar.t);
		navPopupDirCurr='down';
	}
	if(_top+posSub.h-posView.t>posView.b()){
		_top=(isFirstSub?posView.b()+posView.t:posPar.b())-posSub.h;
		navPopupDirCurr='up';
	}
	elSub.style.zIndex=501;
	elSub.style.left=_left+'px';
	elSub.style.top=_top+'px';
	elSub.style.visibility='visible';

	familyStr+=","+submenu;
	navOn=true;
	if(navTimer)clearTimeout(navTimer);
}
function endTimer(){if(navOn&&!isIE5||isIE5){clearTimeout(navTimer);navTimer=null;}}

// Generate all the variations of id, ie left, right and mouseovers
function objIDsHandler(id){
	this.base=id.replace(/(Left|Right|MouseOver)/g,'');
	this.mIdx=this.base.replace(/(idx[0-9])(Sub)?.*/,'$1$2');
	this.lIdx=this.mIdx+'Left';
	this.rIdx=this.mIdx+'Right';
	this.id=this.base.replace(this.mIdx,'');
	this.l=this.lIdx+this.id;
	this.m=this.mIdx+this.id;
	this.r=this.rIdx+this.id;
	this.lOvr=this.lIdx+'MouseOver'+this.id;
	this.mOvr=this.mIdx+'MouseOver'+this.id;
	this.rOvr=this.rIdx+'MouseOver'+this.id;

	this.setCls=function(oL,oM,oR,ovr){
		var s=oGC.invert(oM.className.split(' ')[0])+' ',over=(ovr?'MouseOver':'');
		oL.className=s+this.lIdx+over;
		oM.className=s+this.mIdx+over;
		oR.className=s+this.rIdx+over;
	}
}
function mouseOver(gm){
	var ids=new objIDsHandler(gm.id);
	var objL=d.getElementById(ids.l),objM=d.getElementById(ids.m),objR=d.getElementById(ids.r);
	if(objL&&objM&&objR){
		objL.id=ids.lOvr;
		objM.id=ids.mOvr;
		objR.id=ids.rOvr;
		ids.setCls(objL,objM,objR,true);
	}
}
function mouseOut(gm){
	var ids=new objIDsHandler(gm.id);
	var objL=d.getElementById(ids.lOvr),objM=d.getElementById(ids.mOvr),objR=d.getElementById(ids.rOvr);
	if(objL&&objM&&objR){
		if(activeel.lastIndexOf(ids.base)==-1){
			objL.id=ids.l;
			objM.id=ids.m;
			objR.id=ids.r;
			ids.setCls(objL,objM,objR,false);
		}
	}
}
function showComboBoxes(show) {
	if((isIE5||isIE6)&&!window.opera&&(show&&!navOn||!show&&navOn)){
		var a=d.getElementsByTagName('SELECT');
		for(var i=0;i<a.length;i++){
			a[i].style.visibility=(show?'visible':'hidden');
		}
	}
}
function popup(gm,idxName,menuParent,submenu,horz){
	if(!gm.id)gm=gm.parentNode;
	activeel=gm.id;
	var submenuOn=false;
	if(navLoaded){
		if(navCloseSiblings(menuParent)>0)navPopupDirCurr=navPopupDirPrev;
		var ids=new objIDsHandler(gm.id);
		var objL=d.getElementById(ids.l),objM=d.getElementById(ids.m),objR=d.getElementById(ids.r);
		navVisible=idxName;
		if(submenu&&d.getElementById(submenu)&&objL&&objM&&objR){
			displaySubmenu(idxName,submenu,objM,objL,objR,horz);
			submenuOn=true;
		}
	}
	mouseOver(gm)
	navOn=true;
	if(submenuOn||menuParent)showComboBoxes(false);
	setTimeout("endTimer()",500);
}
function popdown(gm){
	if(!gm.id)gm=gm.parentNode;
	activeel='';
	navOn=false;
	if(navLoaded){
		navTimer=setTimeout("navCloseAll()",1000);
		setTimeout('showComboBoxes(true)',1000);
	}
	mouseOut(gm);
}
var navLoaded=true;
