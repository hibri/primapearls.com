// <script>
var d=document,loc=d.location,nav=navigator,wnd=window;function dw(s){d.write(s);}
var isSafari=(nav.appVersion.indexOf('Safari')!=-1);
var tf=this,t=this,LD=this,core,utils,ship_obj,shipping,conf,price,minicart,resellerForm,lang='en-us',currRates=[],ismember=0,lastpage='',testShop=0;
var currentContent='index.html',frontLoaded=false,targeted=false;
var xLoaded=false,coreLoaded=false,greyLoaded=false,LD_loaded=false,xCalled=false,cntyListLoaded=false,langEnterLoaded=false;
var pn=nav.appName,pv=parseInt(nav.appVersion),LMD_this='39404.958252',lmd=[],wssig='ED53AF895DEFF1FF7CE71CBA96A661A9';
var clickThrough='',aid='',rid='',curr='',resell='';

var sfqs=nametag.get('sfqs'),q=loc.search+'&'+sfqs,parm=[];
nametag.del('sfqs');
if(q!=""){
	q=q.substring(1,q.length);
	var pairs=q.split('&'),len=pairs.length;
	for(var i=0;i<len;i++){
		temp=pairs[i].split('=');
		parm[unescape(temp[0])]=unescape(temp[1]);
	}
}
if(parm['aid']){aid=parm['aid'];var aidimg=new Image();aidimg.src='https://www.globecharge.com/webshop/aid_tracker.cgi?aid='+aid;}
if(parm['mid']){clickThrough=parm['mid'];}
if(parm['rid']){rid=parm['rid'];}
if(parm['target']){
	targeted=true;
	var q1=d.URL,quest=q1.indexOf('#'),qs="";
	if(quest>0)qs=q1.substr(quest);
	var prod=(parm['product'])?'#'+parm['product']:'';
	currentContent=parm['target']+prod+qs;
}
else if(loc.hash){currentContent+=loc.hash;}
if(parm['curr']){curr=parm['curr'];}

var docLang=d.documentElement.lang;

if(parm['lang']){lang=parm['lang'];}


function winMgr(){this._a=[];this._rnd=Math.random();this.online=(loc.protocol.indexOf('file:')==-1);var h=(this.online?'':'file://')+loc.pathname.replace(/\\/g,'/');var re=new RegExp('(\/'+lang+')?\/contents\/.*?$|(\/'+lang+')?\/([^/]*){1}$');this.baseurl=h.replace(re,'/')+'contents/';this.host=this.path(escape(tf.location));}
winMgr.prototype.url=function(f,a,l){
var ff=unescape(f),unescaped=(ff!=f);
if(ff.indexOf(':\\')!=-1||ff.indexOf('://')!=-1)return f;
if(ff.substr(0,3)=='../'){f=ff.substr(3);if(unescaped)f=escape(f);}
if(!a&&a!='-')a=this._rnd;
if(l)f=tf.lang+'/'+f;
return (a=='-')?this.baseurl+f:this.add2Q(this.baseurl+f,'lmd',a);
}
winMgr.prototype.add2Q=function(h,p,v){
if(h.indexOf('?')==-1)return h+'?'+p+'='+v;
if(h.indexOf(p)==-1)return h+'&'+p+'='+v;
var t=h.replace('?','&').split('&');
for(var i=0;i<t.length;i++)if(t[i].indexOf(p+'=')==0)t[i]=p+'='+v;
if(t.length>1) t[1]='?'+t[1];return t.join('&').replace('&?','?');
}
winMgr.prototype.jfile=function(f,q){
var ff=unescape(f),unescaped=(ff!=f);
if(ff.indexOf('?')>-1){ff=ff.substr(0,ff.indexOf('?'));if(unescaped)f=escape(ff);}
var m=Math.max(f.lastIndexOf('/'),f.lastIndexOf('\\'));
return (m>-1)?f.substring(m+1):f;
}
winMgr.prototype.path=function(p){
p=p.toString();
var i=p.indexOf('?');if(i!=-1)p=p.substring(0,i);
return (p.charAt(p.length-1)=='/')?p:p.substring(0,p.lastIndexOf('/')+1);
}
var wm=new winMgr();
dw('<scr'+'ipt src="'+wm.url('date.js')+'"><\/sc'+'ript>');
dw('<scr'+'ipt src="'+wm.url('lang_enter.js',null,false)+'" charset="utf-8"><\/sc'+'ript>');



function ld(name,sf,args){var s;if(LD)s=eval('LD.'+name);if(!LD||!s)s=(sf)?sf:'';if(args){var sa=s.split('%%');s='';for(var i=0;i<sa.length;i++)if(args[i])s+=sa[i]+args[i];else s+=sa[i];}return s.replace('%%','');}


function showalerts(){
if(!langEnterLoaded){setTimeout('showalerts()',100);return;}


}



if(typeof(lmd['index'])=='string'&&LMD_this!=lmd['index']&&loc.href.indexOf('lmd=')==-1)
	loc.replace('index1.html'+loc.search+(loc.search?'&':'?')+'lmd='+lmd['index']+loc.hash);
else{
showalerts();






var mfhObj=null;
function mfh(id,idx1H,idx2H){
	if(!mfhObj){
		mfhObj=new makeFullHeight(id,idx1H,idx2H);
		window.onresize=mfhObj.resize;
	}
	mfhObj.resize(true);
}
function makeFullHeight(id,idx1H,idx2H){
	var tfc=content;
	function gl(s){return tfc.document?tfc.document.getElementById(s):null;}

	this.isDescendantOf=function(idParent,idChild){
		var ret=false,el=gl(idChild),elParent=null;
		if(el)elParent=el.offsetParent;
		while(elParent){
			if(elParent.id==idParent){ret=true;break;}
			elParent=elParent.offsetParent;
		}
		return ret;
	}

	this.height=-1;

	this.applyms=function(){
		if(utils&&typeof(utils.ms)=='function'&&gl('idx1Navigation')&&gl('idx2Navigation')){
			var h=Math.max(mfhObj.height, 0);
			if(mfhObj.isDescendantOf(id,'idx1Navigation')){
				if(gl('ms_idx1Navigation'))tf.load('load_index1.html','index1holder',true);
				var idx1Nav=gl('idx1Navigation'),oldpos='',hh=h;
				if(idx1Nav){
					if(idx1Nav.style.position=='static'&&idx1Nav.offsetTop==0){
						oldpos=idx1Nav.style.position;
						idx1Nav.style.position='relative';
					}
					hh=hh-2-idx1Nav.offsetTop;
					if(oldpos)idx1Nav.style.position=oldpos;
				}
				if(idx1H>0&&idx1H<hh)hh=idx1H;else if(idx1H<0)hh+=idx1H;
				if(window.opera)hh-=52;
				for(var n=0;n<tfc.aMS.length;n++){if(tfc.aMS[n][0]=='idx1Navigation'){tfc.aMS[n]=['idx1Navigation',0,hh,true];break;}}
			}
			if(mfhObj.isDescendantOf(id,'idx2Navigation')){
				if(gl('ms_idx2Navigation'))tf.load('load_index2.html','index2holder',true);
				var idx2Nav=gl('idx2Navigation'),oldpos='',hh=h;
				if(idx2Nav){
					if(idx2Nav.currentStyle&&idx2Nav.currentStyle.position=='static'){
						oldpos=idx2Nav.style.position;
						idx2Nav.style.position='relative';
					}
					hh=hh-2-idx2Nav.offsetTop;
					if(oldpos)idx2Nav.style.position=oldpos;
				}
				if(idx2H>0&&idx2H<hh)hh=idx2H;else if(idx2H<0)hh+=idx2H;
				if(window.opera)hh-=52;
				for(var n=0;n<tfc.aMS.length;n++){if(tfc.aMS[n][0]=='idx2Navigation'){tfc.aMS[n]=['idx2Navigation',0,hh,true];break;}}
			}

			



			var cnt=tfc.aMS.length,a;
			for(var n=0;n<cnt;n++){a=tfc.aMS[n];utils.ms(a[0],a[1],a[2],a[3]);}
		}
		else setTimeout('mfhObj.applyms()',100);
	}
	this.redraw=function(el){el.style.zoom='0.99';el.style.zoom='1';}
	this.resize=function(notOnResize){
		if(content.document&&content.document.readyState&&content.document.readyState!='complete'){setTimeout('mfhObj.resize('+notOnResize+')',25);return;}
		if(tf.extra.specialLoading)return;
		var tfcd=tfc.document;

		if(typeof(notOnResize)!='boolean'||!notOnResize){mfhObj.height=-1;notOnResize=false;}
		if(tfcd.body){
			var tfcdbS=tfcd.body.style,tfcddeS=tfcd.documentElement.style;
			tfcdbS.width='auto';
			tfcdbS.height='100%';
			tfcddeS.height='100%';
			if(window.opera||isSafari){tfcdbS.overflow='hidden';tfcddeS.overflow='hidden';}
			else{tfcdbS.overflowY='hidden';tfcddeS.overflowY='hidden';}
		}

		var el=gl(id);
		if(!el){setTimeout('mfhObj.resize('+notOnResize+')',25);return;}

		var wsh=gl('WebSiteHeader'),wsf=gl('WebSiteFooter');
		if(mfhObj.height==-1){if(!wsh||!wsf){setTimeout('mfhObj.resize('+notOnResize+')',25);return;}}

		var elParent=el.offsetParent;
		elParent.style.minHeight='0px';
		elParent.style.height='auto';

		var cyTop=el.offsetTop,cyBottom=elParent.offsetHeight-cyTop-el.offsetHeight;
		var h=(mfhObj.height==-1?tfcd.documentElement.offsetHeight-cyTop-cyBottom:mfhObj.height);
		el.style.minHeight='0px';
		if(h>0){el.style.height=h+'px';mfhObj.height=h;}
		el.style.overflow='hidden';
		for(var n=0;n<el.childNodes.length;++n){
			var nd=el.childNodes[n],ndS=nd.style;
			if(nd.nodeType==1){
				ndS.minHeight='0px';
				if(nd.className&&(h-nd.offsetTop)>=0)ndS.height=(h-nd.offsetTop)+'px';
				if(nd.id=='Content'){if(window.opera||isSafari)ndS.overflow='auto';else{ndS.overflowY='auto';if(typeof(ndS.zoom)!='undefined'){ndS.zoom='0.99';ndS.zoom='1';}}}
				else{ndS.overflow='hidden';}
			}
		}
		if(wsh)mfhObj.redraw(wsh);if(wsf)mfhObj.redraw(wsf);
		mfhObj.applyms();
	}
}

var arrObj=[],bgstyleadded=false;
function load(url,id,isLang,force){
	if(content){
		try{
		var cfe=content.frameElement;
		if(!bgstyleadded&&cfe&&cfe.style.cssText){
			cfe.style.cssText=cfe.style.cssText.replace(/url\(\.\./,'url(contents');
			bgstyleadded=true;
		}
		}catch(e){}
		arrObj[id]=content.document.getElementById(id);
		if(xLoaded&&extra.loadExecute){extra.loadExecute(url,id,isLang,force);}
		else{setTimeout('load("'+url+'","'+id+'",'+isLang+','+force+')',100);}
	}
}
if(currentContent.indexOf('://')!=-1)frontLoaded=true;
var welcomeURL=frontLoaded?'otherurl.html?url='+currentContent.replace(/=/g,'%3d').replace(/&/g,'%26'):currentContent;

var JSON={copyright:'(c)2005 JSON.org',license:'http://www.crockford.com/JSON/license.html',stringify:function(v){var a=[];function e(s){a[a.length]=s;}
function g(x){var b,c,i,l,v;switch(typeof x){case'string':e('"');if(/["\\\x00-\x1f]/.test(x)){l=x.length;for(i=0;i<l;i+=1){c=x.charAt(i);if(c>=' '){if(c=='\\'||c=='"'){e('\\');}
e(c);}else{switch(c){case'\b':e('\\b');break;case'\f':e('\\f');break;case'\n':e('\\n');break;case'\r':e('\\r');break;case'\t':e('\\t');break;default:c=c.charCodeAt();e('\\u00'+
Math.floor(c/16).toString(16)+
(c%16).toString(16));}}}}else{e(x);}
e('"');return;case'number':e(isFinite(x)?x:'null');return;case'object':if(x){if(x instanceof Array){e('[');l=a.length;for(i=0;i<x.length;i+=1){v=x[i];if(typeof v!='undefined'&&typeof v!='function'){if(b){e(',');}
g(v);b=true;}}
e(']');return;}else if(typeof x.valueOf=='function'){e('{');l=a.length;for(i in x){v=x[i];if(typeof v!='undefined'&&typeof v!='function'&&(!v||typeof v!='object'||typeof v.valueOf=='function')){if(b){e(',');}
g(i);e(':');g(v);b=true;}}
return e('}');}}
e('null');return;case'boolean':e(x);return;default:e('null');return;}}
g(v);return a.join('');},parse:function(text){try{return!(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(text.replace(/"(\\.|[^"\\])*"/g,'')))&&eval('('+text+')');}catch(e){return false;}},
parseClone:function(text){var o=this.parse(text);return this.clone(o);},clone:function(arr){var ret=[];for(var i in arr){if(typeof(arr[i])=='object'&&typeof(arr[i].tagName)=='undefined'){ret[i]=this.clone(arr[i]);}else{ret[i]=arr[i];}}return ret;}
};

function saveBskToName(){
	var bsks=[tf.core.Basket,tf.core.Favorite];
	for(var n=0;n<bsks.length;n++){
		var bt=bsks[n];
		if(bt.items.cnt()>0){
			bt.fbsk.bsk='';
			var i=bt.items.start();
			while(i){i.parent='';i=bt.items.next()}
			i=bt.fbsk.items.start();
			while(i){i.parent='';i=bt.fbsk.items.next()}
			

			nametag.add(n==0?'bsk':'fav',tf.JSON.stringify(bt));

			i=bt.items.start();
			while(i){i.parent=bt;i=bt.items.next()}
			i=bt.fbsk.items.start();
			while(i){i.parent=bt;i=bt.fbsk.items.next()}
			
			bt.fbsk.bsk=bt;
		}
	}
	nametag.add('_pArr',tf.JSON.stringify(tf.wm._pArr));
}

function loadBskFromName(){
	var tf=this;
	if(!tf.conf){setTimeout('loadBskFromName()',100);return;}
	var bskStr=nametag.get('bsk');
	if(bskStr){
		tf.conf.coreSettings();
		var obskStr=tf.JSON.parse(bskStr);
		if(obskStr){
			tf.core.Basket.merge(obskStr);
		}
	}
	var favStr=nametag.get('fav');
	if(favStr){
		var ofavStr=tf.JSON.parse(favStr);
		if(ofavStr){
			tf.core.Favorite.merge(ofavStr);
		}
	}
	var _pArrStr=nametag.get('_pArr');
	if(_pArrStr){
		if(typeof(tf.wm._pArr)=='undefined')tf.wm._pArr={};
		var oldArr=tf.JSON.parseClone(_pArrStr)
		for(var oid in oldArr){tf.wm._pArr[oid]=oldArr[oid];}
	}
	if(bskStr&&content.isBasketPage||favStr&&content.isFavoritesPage)content.location.replace(content.location.href);
}

}
// </script>

// $Revision: 16 $
// $HeadURL: /ShopFactory_V6/Common Files/parse/loader.js $
