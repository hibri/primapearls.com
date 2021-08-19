var d=document,isDOM=d.getElementById,isIE=d.all&&d.all.item;

var navHTML='',navCreated=false;
var menuIdx=0,menuArr=[];
var htmlResult='',familyStr;

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

function addMenu(arr,arrIdx,type,subtype,typeClass,subtypeClass,navOrientation,subOrientation,separator){
	arr[arrIdx]=[type,typeClass,navOrientation];
	var mapNameToMenu=[],topLevelID=(type=='idx1'?'D-34':'D-33');
	mapNameToMenu[topLevelID]=arr[arrIdx];
	var md=(type=='idx1'?md1:md2),o,shift=0;
	while(o=md[shift++]){
		var mnu=mapNameToMenu[o[1]],tmp=getMainCSS(o[0],o[1]);
		if(o[1]==topLevelID){addItem(mnu,type,o[0],o[3],'self',o[2],separator);}
		else{
			if(!mnu){
				arr[++arrIdx]=[o[1],subtypeClass,subOrientation,o[4]];
				mapNameToMenu[o[1]]=arr[arrIdx];
				mnu=arr[arrIdx];
			}
			if(mnu){addItem(mnu,tmp+subtype,o[0],o[3],'self',o[2],separator);}
		}
	}
}
function addItem(m,type,id,url,tar,name,sep){
	if(tar=="self")tar="_"+tar;
	var n=m.length;
	m[n++]=type;
	m[n++]=id;
	m[n++]=url+(tar?"\\\" target=\\\""+tar:"");
	m[n++]=name.replace(/\"/g,"\\\"").replace(/[\n|\r]/mg,' ');
	m[n++]=sep;
}
function _objC(id,cname,side){
	if(!side)side='';else id+='';
	var topLevel=(cname.indexOf('idx2')==0)?'idx2':'idx1';
	var top=(cname.indexOf(topLevel+'Sub')==0)?'inline':'top';
	var gcName=oGC.map[topLevel][top];
	return 'id="'+cname+id+'" sf:object="'+cname+side+'" class="'+gcName+' '+cname+side+'"';
}
function ahref(href,disp){
	if(!disp)return '';
	return '<a href="'+href+'">'+disp+'</a>';
}
function create_td(id,cname,mouse,familyHref,dispText,href){
	if(href)href=unescape(href);
	var onclick='';
	if(!mouse)mouse='';
	var inner=(typeof(dispText)=='undefined'?'':dispText);
	if(href){
		var pos=href.indexOf('"');
		if(pos!=-1){href=href.substring(0,href.indexOf('"'));}
		if(href.indexOf('familyStr')==-1)onclick="onclick=\"tf.utils.navClk(this,'"+href+"','"+id+"')\" ";
	}
	return "<td "+onclick+_objC('Left'+id,cname,'Left')+mouse+'>&nbsp;</td>'+
	"<td style=\"overflow-x:hidden\" "+onclick+_objC(id,cname)+mouse+'><a style="background-color:transparent;">'+inner+'</a></td>'+
		"<td "+onclick+_objC('Right'+id,cname,'Right')+mouse+'>&nbsp;</td>';
}
function createLinks(i,arg,horz){
	var s='';iClass=arg[i];subMenu=arg[i+1];iURL=arg[i+2];iName=arg[i+3];iDivider=arg[i+4];
	if(!horz){s+='<tr class="'+iClass+'">';}
	if(i==0&&iURL==""){
		s+=create_td(iClass,iClass,'','','','','');
	}else{
		var _ms=" onmouseover=\"popup(this,'"+navVisible+"','"+menuID+"','"+subMenu+"',"+horz+")\" onmouseout=\"popdown(this)\"";
		s+=create_td(subMenu,iClass,_ms,iURL,iName,iURL);
	}
	if(!horz){s+="</tr>"}
	if(i+5==arg.length)iDivider=0;
	if(iDivider){
		if(!horz){s+='<tr><td colspan="3" class="divider"></td></tr>'}
		else{s+='<td class="divider"></td>';}
	}
	return s;
}
function createMenus(){
	arg=createMenus.arguments;menuID=arg[0];
	var cls=arg[1],horz=arg[2],hdrCls=(menuID=='idx1'||menuID=='idx2')?menuID:arg[4],starti=(menuID=='idx1'||menuID=='idx2'||menuID=='')?3:4;
	var topLevel=hdrCls.replace(/^(idx.).*$/,'$1'),s='',clsMap=oGC.map[topLevel];
	if(typeof(clsMap)=='undefined')return '';
	if(navVisible&&(navVisible==menuID)){
		s+='<div id="'+menuID+'" style="visibility:visible;position:relative;">';
	}else{
		s+='<div id="'+menuID+'" style="visibility:hidden;position:absolute;left:0;top:0;z-index:999;">';
	}
	s+='<table cellpadding="0" cellspacing="0" border="0" sf:object="'+cls+'" class="'+clsMap[hdrCls==topLevel+'Sub'?'inline':'top']+' '+cls+'">';
	if(horz){s+="<tr>"}
	var bgLen=cls.length-"Background".length;
	if(cls.lastIndexOf("Background")==bgLen){hdrCls=cls.substr(0,bgLen);}
	s+=createLinks(0,[hdrCls+"Head",hdrCls+"Head","","",0],horz);
	for(var i=starti;i<arg.length-1;i+=5){
		s+=createLinks(i,arg,horz);
		iStatusText="";
	}
	s+=createLinks(0,[hdrCls+"Foot",hdrCls+"Foot","","",0],horz);
	if(horz){s+="</tr>"}
	s+="</table></div>";
	htmlResult=s;
	return familyStr;
}
function createMenu2(theArray){
	if(!theArray){
		var arr=getMenus('curr');
		if(typeof(arr)=='undefined')return'';
		navVisible=arr[0];
		eval("createMenus("+arr[1]+");");
		return htmlResult;
	}
	theStr="\""+theArray[0]+"\"";
	for(var j=1;j<theArray.length;j++){
		if(theArray[j]+" "=="0 "||theArray[j]+" "=="1 "||theArray[j]+" "=="true "||theArray[j]+" "=="false "){
			theStr+=","+theArray[j];
		}else{theStr+=',"'+theArray[j]+'"';}
	}
	var fstr=eval("createMenus("+theStr+");");
	if(fstr)saveMenus([navVisible,theStr,fstr]);
	return htmlResult;
}
if(this.name&&parent!=this){
	if(!parent.ms)parent.ms=[];
	if(!parent.ms[this.name])parent.ms[this.name]=[];
	var ms=parent.ms[this.name];
}
if(!this.ms)ms=[];
function saveMenus(arr){
	if(arr[1].indexOf(navVisible)!=1)return;
	ms['last']=ms['curr'];ms['curr']=arr;
}
function getMenus(state){return ms[state]}
var _mapping=[];
function getMainCSS(id,pid){
	if(pid!='D-33'&&pid!='D-34'){
		if(!_mapping[id]){if(pid)pid=_mapping[pid];else pid=id;}
		else pid=_mapping[id];
	}
	_mapping[id]=pid;
	if(pid=='D-33')return 'idx2'
	if(pid=='D-34')return 'idx1';
	return '';
}

function loadMenu(type,vis){
	addMenu(menuArr,menuIdx++,type,"Sub",type+"Background",type+"SubBackground",navOrientation,0,0);
	var created=0;
	for(var i=0;i<menuArr.length;i++){
		if(menuArr[i][4]=='Sub')continue;
		navHTML+=createMenu2(menuArr[i]);
		if(menuArr[i][0]==navVisible)created=1;
	}
	if(!created&&typeof(sf)!='undefined'&&!sf)navHTML+=createMenu2();
}

if(typeof(nvLoad)=='function')nvLoad();
dw(navHTML);
var aa=navHTML;aa=(typeof(aa)=="object"?aa.toString():aa);
if(aa.indexOf("<script>")!=-1){aa=aa.replace(/<\/script>(.*)?<script>/,'');aa=aa.replace(/(.*)?<script>/,'');aa=aa.replace(/<\/script>(.*)?/,'');eval(aa);
}
navCreated=true;

// $Revision: 12 $
// $Archive: /ShopFactory_V6/Templates/Website/shared_files/navdropdown_create.js $