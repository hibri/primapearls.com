// <script>
var gmtTime=0,tf=core=utils=LD=content=this,tfc=tf.content,tfcd=tfc.document;

var wx=window.external,arrLoad=[];
function load(url,id,isLang){
	if(wx&&wx.getPageID){
	if(wx.getPageID()=='D-34'&&id=='index1holder'||wx.getPageID()=='D-33'&&id=='index2holder'){
		var xid='x_'+id;
		arrLoad[xid]={'url':url,'id':id,'isLang':isLang};
		d.onreadystatechange=loadReady;
	}
	else if(wx.getPageID()!='D-34'&&wx.getPageID()!='D-33'&&id=='core'){
		var site='WebSiteContent';
		if(!gl(site))site='WebSite';
		setTimeout("wxecamtb2('"+site+"','Content')",50);
	}}
}
function loadReady(){
	if(d.readyState=='complete'){
		for(var xid in arrLoad){
			var a=arrLoad[xid];
			d.body.insertAdjacentHTML('afterBegin','<iframe name="'+xid+'" id="'+xid+'" width="0" height="0" frameborder="0" border="0"></iframe>');
			d.frames[xid].location.replace(tf.wm.url(a['url'],null,a['isLang']));
		}
		applyms();
	}
}
function loadCallback(doc,id){
	id=id.replace(/^x_/,'');
	var el=gl(id);
	el.innerHTML=doc.body.innerHTML;
	var parid=id;
	while(el.parentNode&&el.parentNode.id!='WebSite'){
		el=el.parentNode;
		if(el.id&&!el.getAttribute('sf:object')&&el.className&&el.tagName!='BODY'){
			parid=el.id;break;
		}
	}
	wxecamtb(parid);
}
function wxecamtb(id){
	if(typeof(ms_done)!='undefined'&&ms_done){
		wx.extractContentAndMoveToBody('',id);
	}
	else{setTimeout('wxecamtb("'+id+'")',50);}
}
function wxecamtb2(id,id2){
	var bReady=(d.readyState=='complete'&&!tfc.specialLoading);
	var a=d.getElementsByTagName('OBJECT');
	for(var n=0;n<a.length;n++){bReady=(!a[n].Playing||a[n].object.ReadyState==4)}
	if(bReady){
		a=d.getElementsByTagName('IFRAME');
		for(var n=0;n<a.length;n++){bReady=(a[n].readyState=='complete');}
	}
	if(bReady){
			var dummy;
			wx.extractContentAndMoveToBody(dummy,dummy);
			wx.extractContentAndMoveToBody(id,id2);
	}
	else{setTimeout('wxecamtb2("'+id+'","'+id2+'")',50);}
}


var currencies=new Array();
function currency(i,a,m,d) {
	this.iso=i;
	
	this.abbrev=a;
	this.multiplier=m;
	this.decimal_places=d;
}
var shopCurrency = new currency("GBP", "??", 1.0, 2);
var currentCurrency = shopCurrency;

var secondCurrency = null;


var loc=d.location,nav=navigator,wnd=window;
function winMgr(){this._a=[];this._rnd=Math.random();this.online=(loc.protocol.indexOf('file:')==-1);var h=(this.online?'':'file://')+loc.pathname.replace(/\\/g,'/');var re=new RegExp('(\/'+lang+')?\/contents\/.*?$|(\/'+lang+')?\/([^/]*){1}$');this.baseurl=h.replace(re,'/')+'contents/';}
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
var wm=new winMgr();
var navPopupDir='down';
function addEvent(e,f){if(window[e] instanceof Function){var h=window[e];window[e]=function(p){h(p);f();};}else{window[e]=f;}}
function coreSettings(){
if (!tf.coreLoaded||!tf.core||!tf.core.Basket){setTimeout("coreSettings()",100);return;}
core=tf.core;
core.Basket.shDisc('1','0.000','');
core.Basket.tax=new core.tax();
core.BTax=core.Basket.tax;
core.STax=new core.tax();

	core.BTax.init(core.shopRegion,false);
	core.STax.init(core.shopRegion,false);
	core.BTax.addArea('TD1','','0.000','No tax',false, 0);
	


// Add tax descriptions for taxes included into price
populateTSI();
core.confLoaded=true;
}
coreSettings();

function populateTSI(){
if(!core)core=tf.core;
if(!core)return;
var TS=new Array();
TS['TD1']='';
core.tsI=new Array();
var country_code=(core.region)?core.region:core.shopRegion;

for(var s in TS){{core.tsI[s]=TS[s];}}
}

function greySettings(){
if (!tf.coreLoaded||!tf.greyLoaded||!tf.shipping||!tf.shipping.shipping||!tf.cntyListLoaded){setTimeout("greySettings()",100);return;}
core=tf.core,grey=tf.shipping;
grey.core=core;
grey.ship=new grey.shipping(grey.cnty, 0, 0.000);
tf.ship_obj=grey.ship;


grey.ship.addMeth('SM1', 'First Class Recorded Delivery');
grey.ship.addRegn('SM1RS1','Local Region','UK,');
grey.ship.link('SM1','SM1RS1',0.000,'0',0,'0.000,25.000,1.99;25.000,50.000,2.99;50.000,1000.000,0',0.000,'0',0.000,0.000,'SM1,SM1RS1,0.000,0,0,0.000,25.000,1.99;25.000,50.000,2.99;50.000,1000.000,0,0.000,0,0.000,0.000/F206C630E595A5A043F1B6CAEA52F2C4');


grey.ship.addMeth('SM2', 'Special Delivery (includes insurance)');
grey.ship.addRegn('SM2RS1','Local Region','UK,');
grey.ship.link('SM2','SM2RS1',0.000,'0',0,'0.000,50.000,4.99;50.000,200.000,5.99;200.000,1000.000,6.99',0.000,'0',0.000,0.000,'SM2,SM2RS1,0.000,0,0,0.000,50.000,4.99;50.000,200.000,5.99;200.000,1000.000,6.99,0.000,0,0.000,0.000/E1651E5BCF391394DC1874B0B6454C9C');




grey.ship.type('2', '0.000000');
}
greySettings();

function custInfo(){
	var grey=tf.shipping;
	var ret=[];

	var FF=[
	'0,First Name,customer_firstname,1,0,0,20,1,50,0,0,0,1,1,1,1,'
	,'1,Last Name,customer_lastname,1,0,0,20,1,50,0,0,0,1,1,1,1,'
	,'2,Company Name,company_name,1,0,0,20,1,200,0,0,0,1,0,1,1,'
	,'3,Country,customer_country,1,0,0,20,1,80,0,0,0,1,1,1,1,'
	,'4,House Number,customer_house_number,1,0,0,20,1,70,0,0,0,1,1,1,1,'
	,'5,Street,customer_street,1,0,0,20,1,70,0,0,0,1,1,1,1,'
	,'6,City/Town,customer_city,1,0,0,20,1,80,0,0,0,1,1,1,1,'
	,'7,State,customer_state,1,0,0,20,1,80,0,0,0,1,1,1,1,'
	,'8,County,customer_county,1,0,0,20,1,80,0,0,0,1,0,1,1,'
	,'9,Zip,customer_zip,1,0,0,20,1,20,0,0,0,1,1,1,1,'
	,'10,Phone,customer_phone,1,0,0,20,1,25,0,0,0,1,1,1,1,'
	,'12,Email,customer_email,1,0,0,20,1,200,0,0,0,1,1,1,1,'
	,'13,Your notice to us,customer_notice,2,0,0,50,5,200,0,0,0,1,1,1,1,'

];
	ret['Billing Address']=grey.crCGIFlds('customer', FF);

	var FF=[
	'0,First Name,delivery_firstname,1,0,0,20,1,50,0,0,0,1,1,1,1,'
	,'1,Last Name,delivery_lastname,1,0,0,20,1,50,0,0,0,1,1,1,1,'
	,'2,Company Name,company_name,1,0,0,20,1,200,0,0,0,1,0,1,1,'
	,'3,Country,delivery_country,1,0,0,20,1,80,0,0,0,1,1,1,1,'
	,'4,House Number,delivery_house_number,1,0,0,20,1,70,0,0,0,1,1,1,1,'
	,'5,Street,delivery_street,1,0,0,20,1,70,0,0,0,1,1,1,1,'
	,'6,City/Town,delivery_city,1,0,0,20,1,80,0,0,0,1,1,1,1,'
	,'7,State,delivery_state,1,0,0,20,1,80,0,0,0,1,1,1,1,'
	,'8,County,delivery_county,1,0,0,20,1,80,0,0,0,1,1,1,1,'
	,'9,Zip,delivery_zip,1,0,0,20,1,20,0,0,0,1,1,1,1,'
	,'10,Phone,delivery_phone,1,0,0,20,1,25,0,0,0,1,1,1,1,'

];
	ret['Delivery Address']=grey.crCGIFlds('customer', FF);

	return ret;
}

function payMethod(){
	var grey=tf.shipping;
	var ret=[];

	return ret;
}



tf.conf=this.window;
tf.confLoaded='en-us';

function coreSettings(){} // Override this function that's in conf.tmpl to make it do nothing
var isIEBefore7=parseFloat(navigator.appVersion.split('MSIE')[1])<7;

var sfImgPopWnd=null,aImgPopTmp=null;
function sfImgPop(a,lmd,prid,css){
	if(!tfc.isInSF()){
		if(a[prid]){
			if(css)css=tf.wm.url(css,lmd);
			var url=tf.wm.url("image_viewer.html",lmd,1),mw=screen.availWidth*0.9,mh=screen.availHeight*0.9;
			aImgPopTmp=[css,'mw='+mw,'mh='+mh];aImgPopTmp=aImgPopTmp.concat(a[prid]);
			if(!sfImgPopWnd||(sfImgPopWnd&&sfImgPopWnd.closed)){
				sfImgPopWnd=window.open(url,"sfImgPop","location=no,menubar=no,toolbar=no,directories=no,width=160,height=120,left="+((screen.availWidth-160)/2)+",top="+((screen.availHeight-120)/2));
			}
			else{sfImgPopWnd.focus();if(sfImgPopWnd.start)sfImgPopWnd.start(aImgPopTmp);}
		}
	}
}


function populatePrice(){var a=tfc.ppriceArr;if(!a||!tf.core.region){setTimeout('tf.utils.populatePrice()',1000);return;}for(var i=0;i<a.length;i++){var el=gl('ProductPrice-'+a[i][0]);if(el)el.innerHTML=core.pprice(a[i]);}}
function populatedata(){
tfc.specialLoading=true;
if(wx&&typeof(wx.getPageID)=='function'&&(wx.getPageID()=='D-34'||wx.getPageID()=='D-33'))return;

core=tf.core;
if(!tfc.ppriceArr||(tfc.document.readyState&&tfc.document.readyState!='complete')||!core||!core.tsI){setTimeout('populatedata()',50);return;}
populatePrice();
var a=tfc.bpriceArr;for(var i=0;i<a.length;i++){var el=gl('ProductBasePrice-'+a[i][0]);if(el)el.innerHTML=core.bprice(a[i]);}
a=tfc.crFFldArr;var optHTML=[];for(var i=0;i<a.length;i++){var choicesOnly=a[i][12],id=a[i][choicesOnly?2:8];if(!optHTML[id])optHTML[id]='';optHTML[id]+=core.crFFld(a[i]);}
for(i in optHTML){var el=gl((choicesOnly?'ProductOptionChoices-':'ProductOptions-')+i);if(el)el.innerHTML=optHTML[i];}
tfc.specialLoading=false;
}


function sfMM(a){
	var wm, id=a[0],lmd=a[1],t=a[2],src=a[3],w=parseInt(a[4]),h=parseInt(a[5]),mw=parseInt(a[6]),mh=parseInt(a[7]),alt=a[8];
	var dim=' width="'+(w>0?w:mw)+'" height="'+(h>0?h:mh)+'"',s='';
	if(src.toLowerCase().lastIndexOf(t)==src.length-t.length){
		src=tf.wm.url(src,lmd);src=src.replace(/\\/g,'/');if(!tf.wm.online)src=src.replace(/^(file:\/\/)?(.*)$/,'file://$2');
		switch(t){
		case 'swf':
			s+='<object classid="CLSID:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" '+dim+' title="'+alt+'">'
			+'<param name="movie" value="'+unescape(src)+'"><param name="src" value="'+unescape(src)+'"><param name="WMode" VALUE="Transparent"><param name="menu" VALUE="false">'
			+'<embed src="'+src+'" quality="high" '+dim+' title="'+alt+'" type="application/x-shockwave-flash" wmode="transparent" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" menu="false"></embed>';
			s+='</object>';
			break;
		case 'class':
			s+='<applet code="'+tf.wm.jfile(src).replace(/\?.*/,'')+'" codebase="'+tf.loc.toString().replace(/[^\/]*$/,'contents/media/')+'"'+dim+' title="'+alt+'"></applet>';
			break;
		default:
			s+='<img src="../media/trans.gif" width="'+(w>0?w:mw)+'" height="1">';
		}
	}
	return s;
}

function sfMMDraw(){var a=tfc.aMM;if(a){for(var i=0;i<a.length;i++){if(a[i]){var el=gl(a[i][0]);if(el){el.innerHTML=sfMM(a[i]);a[i]=null;}}}}}

function pngIE(d){
if(!isIEBefore7)return;
d=d?d:tfc.document,a=d.images,alpha="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader";
for(var i=0;i<a.length;i++){
var img=a[i],imgName=img.src;
if (imgName.substring(imgName.length-3,imgName.length).toUpperCase()=="PNG"){
var imgID=(img.id?'id="'+img.id+'" ':'');
var imgClass=(img.className?'class="'+img.className+'" ':'');
var imgTitle='title="'+(img.title?img.title:img.alt)+'" ';
var imgStyle='display:inline-block;'+img.style.cssText;
if (img.align=="left"||img.align=="right")imgStyle='float:'+img.align+';'+imgStyle;
if (img.parentElement.href)imgStyle='cursor:hand;'+imgStyle;
function cdestrip(o,e){return o[e]?e+'="'+o[e].toString().replace(/^([\n\r]|.)*\{[\n\r]*(([\n\r]|.)*)[\n\r]*\}[\n\r]*$/,'$2')+'" ':'';}
var s="<span "+cdestrip(img,'onmouseover')+cdestrip(img,'onmouseout')+imgID+imgClass+imgTitle+" style=\""+"width:"+img.width+"px;height:"+img.height+"px;"+imgStyle+";"+alpha+"(src=\'"+img.src.replace(/\'/,'%27')+"\',sizingMethod='scale');\" src=\'"+img.src+"\'></span>";
img.outerHTML=s;
i--;
}}
var an=['DIV','SPAN','H1'];
for(var n in an){
var a=d.getElementsByTagName(an[n]);
for(var i=0;i<a.length;i++){
var img=a[i],src=img.currentStyle.backgroundImage.replace(/url\(\"(.*)\"\)/,'$1');
pngIEbg(img,src);
}}}
function pngIEbg(img,src,title){
if(!isIEBefore7)return;
if(img.childNodes.length == 0) return;
if (src.substring(src.length-3,src.length).toUpperCase()=="PNG"){
img.style.backgroundImage='none';
var el=tfc.document.createElement('div'),l=0,t=0,zIndex=-1;
var oParent=img;while(oParent&&oParent.currentStyle.position!='relative'&&oParent.currentStyle.position!='absolute'){zIndex=0;l+=oParent.offsetLeft;t+=oParent.offsetTop;oParent=oParent.offsetParent;}
var w=Math.max(img.scrollWidth,img.offsetWidth),h=Math.max(img.scrollHeight,img.offsetHeight);
el.style.cssText="position:absolute;z-index:"+zIndex+";left:"+l+"px;top:"+t+"px;width:"+w+";height:"+h+";float:"+img.style.styleFloat+";"+this.alpha+"(src='"+src.replace(/\'/,'%27')+"',sizingMethod='scale');\"";
img.insertBefore(el,img.childNodes[0]);
}}
function imgs(){sfMMDraw();pngIE();if((!wx||typeof(wx.loadFlashXML)!='function')&&typeof(embIE)=='function')embIE();}

function navRO(ovr,o,id,gc){
	function rmGC(s){return(s.split(' ')[1])?s.split(' ')[1]:s;}
	function addOvr(o){o.className=gc+rmGC(o.className)+movr;}
	function rmOvr(o){o.className=gc+rmGC(o.className).replace(/MouseOver$/,'');}
	gc+=' ';
	var className=rmGC(o.className);
	var s=className.replace(/MouseOver$/,'');s=s.replace(/Left$|Right$/,'');
	var movr='MouseOver',ell=gl(s+'Left'+id),elc=gl(s+id),elr=gl(s+'Right'+id);
	if(ell&&elc&&elr){
		if(ovr){addOvr(ell);addOvr(elc);addOvr(elr);}
		else{rmOvr(ell);rmOvr(elc);rmOvr(elr);}
	} else{
		if(ovr)o.className=gc+className+'MouseOver';
		else o.className=gc+className.replace(/MouseOver$/,'');
	}
}
function navOvr(o,id,gc){navRO(true,o,id,gc);}function navOut(o,id,gc){navRO(false,o,id,gc);}
var aOtherURL={};
function navClk(o,h,id){var url=unescape(tf.wm.url(h,'-',1));
if(typeof(aOtherURL[id])=='undefined'){tfc.location.href=url;}
else{
	if(aOtherURL[id]==0){tfc.location=tf.wm.url('otherurl.html?ourl='+id,'-',1);}
	else{window.open(url);}
}}

function applyms(){
	if(typeof(ms)=='function'&&(!tf.extra||tf.extra.loadInProgress<1)){
		var aMS=tf.content.aMS;
		if(aMS){
			var cnt=aMS.length,a;
		for(var n=0;n<cnt;n++){a=aMS[n];ms(a[0],a[1],a[2],a[3]);}
	}
	}
	else{setTimeout('applyms()',100);}
}
var ms_rv,ms_lv,ms_dv,ms_uv,ms_oldn,ms_n,ms_sp=3,ms_sp2=20;
function ms_rt(id){var el=gl('ms_'+id),x=parseInt(el.style.left);if(x>(ms_n-ms_oldn-128-36))el.style.left=(x-ms_sp)+'px';ms_rv=setTimeout('ms_rt(\''+id+'\')',ms_sp2);}
function ms_lt(id){var el=gl('ms_'+id),x=parseInt(el.style.left);if(x<0)el.style.left=(x+ms_sp)+'px';ms_lv=setTimeout('ms_lt(\''+id+'\')',ms_sp2);}
function ms_dn(id){var el=gl('ms_'+id),y=parseInt(el.style.top);if(y>(ms_n-ms_oldn-18))el.style.top=(y-ms_sp)+'px';ms_dv=setTimeout('ms_dn(\''+id+'\')',ms_sp2);}
function ms_up(id){var el=gl('ms_'+id),y=parseInt(el.style.top);if(y<0)el.style.top=(y+ms_sp)+'px';ms_uv=setTimeout('ms_up(\''+id+'\')',ms_sp2);}
function ms_stop(dir){clearTimeout(eval('ms_'+dir.substr(0,1)+'v'));}
function ms_set(oldn,n,sp,sp2){ms_oldn=oldn;ms_n=n;if(typeof(sp)!='undefined')ms_sp=sp;if(typeof(sp2)!='undefined')ms_sp2=sp2;}





function showPopup(url){
	function mywnd(wnd){
	this.wnd=wnd;
	this.getWidth=function(){
		var x=0,w=this.wnd;
		if(x==0&&typeof(w.innerWidth)!='undefined'){x=w.innerWidth;}
		if(x==0&&typeof(w.clientWidth)!='undefined'){x=w.clientWidth;}
		return x;
	}
	this.getHeight=function(){
		var y=0,w=this.wnd;
		if(y==0&&typeof(w.innerHeight)!='undefined'){y=w.innerHeight;}
		if(y==0&&typeof(w.clientHeight)!='undefined'){y=w.clientHeight;}
		return y;
	}
	this.getScrollTop=function(){
		var y=0,w=window;
		if(w.pageYOffset){y=w.pageYOffset;}
		else if(w.document.documentElement){y=w.document.documentElement.scrollTop;}
		return y;
	}
	this.getScrollLeft=function(){
		var x=0,w=window;
		if(w.pageXOffset){x=w.pageXOffset}
		else if(w.document.documentElement){x=w.document.documentElement.scrollLeft;}
		return x;
	}
	this.center=function(){
		var wcs=this.wnd.style;
		wcs.position='absolute';wcs.zIndex='9999';
		wcs.left='50%';wcs.top='50%';
		wcs.marginLeft=(-this.getWidth()/2 + this.getScrollLeft())+'px';
		wcs.marginTop=(-this.getHeight()/2 + this.getScrollTop())+'px';
	}}

	var tfcd=tfc.document,el=tfcd.createElement('div');
	el.id='sfPopupDiv';
	el.className='GC41 '+el.className;
	el.style.border='1px #000000 solid';
	el.style.width='600px';
	el.style.height='400px';
	el.style.textAlign='right';
	el.innerHTML='<iframe name="sfPopupFrame" id="sfPopupFrame" src="about:blank" width="100%" height="370" frameborder="0" border="0" unselectable="on"></iframe>';
	el=tfcd.body.appendChild(el);

	var mwnd=new mywnd(el);
	mwnd.center();

	var btn=tfcd.createElement('input');
	btn.type='button';
	btn.className='GC25 Button';
	btn.value=tf.LD.LD_SEARCH_CLOSE;
	btn.style.padding='0 6px';
	btn.style.margin='4px';
	btn.onclick=function(){tfcd.body.removeChild(gl('sfPopupDiv'));}

	el.appendChild(btn);
	el.style.visibility='visible';
	tfc.sfPopupFrame.location=url;
	setTimeout('tfc.sfPopupFrame.location="'+url+'"', 100)
	tfc.sfPopupFrame.focus();
}

function equaldiv(c) {
	if(!c)c='EqualHeight';
	var tfcd=tfc.document,t=tfcd.getElementsByTagName('div');
	var maxh=0;
	for (var x = 0; x<t.length; x++) {
		var cls=t[x].getAttribute('class');
		if (!cls) cls=t[x].getAttribute('className');
		if (cls && cls.indexOf(c) != -1) {
			if (tfcd.defaultView != undefined) {
				maxh = Math.max(maxh, parseInt(tfcd.defaultView.getComputedStyle(t[x], "").height));
			} else if (t[x].clientHeight) {
				maxh = Math.max(maxh, t[x].clientHeight);
			} else if (t[x].offsetHeight) {
				maxh = Math.max(maxh, t[x].offsetHeight);
			}
		}
	}
	for (x=0; x<t.length; x++) {
		var cls=t[x].getAttribute('class');
		if (!cls) cls=t[x].getAttribute('className');
		if (cls && cls.indexOf(c) != -1) {
			t[x].style.height = maxh+'px';
			if(document.all){
				var ifr=tfcd.getElementsByTagName('iframe');
				for (var y=0; y<ifr.length; y++){
					var bdr=ifr[y].style.border;
					ifr[y].style.border='1px #ffffff dotted';
					ifr[y].style.border=bdr;
				}
			}
		}
	}
}

var tf=parent.tf,LD=tf,tfc=tf.content;

if(typeof(SymRealWinOpen)!='undefined')window.open=SymRealWinOpen;
if(window.NS_ActualOpen){window.open=NS_ActualOpen;}

var str_sep1='~|`';

var shopName='',shopRegion='UK';


var confLoaded=false;
var region='',regionChanged=false,method='';



function ld(name,sf,args){var s;if(LD)s=eval('LD.'+name);if(!LD||!s)s=(sf)?sf:'';if(args){var sa=s.split('%%');s='';for(var i=0;i<sa.length;i++)if(args[i])s+=sa[i]+args[i];else s+=sa[i];}return s.replace('%%','');}

var d=document;function dw(s){d.write(s);}function gl(s){return d.getElementById(s);}
function isInSF(){return (window.external&&typeof(window.external.isInSF)!='undefined'?true:false);}
var scr={
	load:function(id,url){
		this.rmv(id);
		var scr=d.createElement('script');
		scr.id=id;
		scr.src=url;
		scr.type='text/javascript';
		d.getElementsByTagName("head")[0].appendChild(scr);
	},
	rmv:function(id){var el=gl(id);if(el)d.getElementsByTagName("head")[0].removeChild(el);}
};

var active_servers=[],gmtTime=0;
var ping={
	timer1:null,
	timer2:null,
	timer3:[],
	poll:function(){
		if(typeof(country_code)=='undefined'){this.timer1=setTimeout("ping.poll()",100);return;}
		if(active_servers.length>0){for(var tt in this.timer3){clearTimeout(this.timer3[tt]);}this.timer3=[];}
		clearTimeout(this.timer2);
		if(country_code!=''&&country_code!='A1'&&country_code!='A2'&&shopRegion.indexOf(country_code)!=0)region=country_code;
		else if(shopRegion.indexOf(country_code)==0)region=shopRegion;
	},
	failed:function(){
		clearTimeout(this.timer1);
		this.go(true);
		if(!region){region=shopRegion;if(tf.utils)tf.utils.populatePrice();}
	},
	go:function(all){
		function id(n){return'ping'+servers[n].replace(/[^a-zA-Z0-9]/g,'');}
		function url(n){return servers[n]+fake_country+'t='+tf.testShop+'&u='+escape(location.protocol+'//'+location.hostname+tf.wm.baseurl)+'&lmd='+(tf.lmd?tf.lmd['index']:'');}
		var i=0,servers='http://timecheck.shopfactory.com/ping/v7ping.js,http://secure11.globecharge.com/ping/v7ping.js,http://secure17.globecharge.com/ping/v7ping.js,http://secure18.globecharge.com/ping/v7ping.js,http://secure19.globecharge.com/ping/v7ping.js,http://secure20.globecharge.com/ping/v7ping.js'.split(','),fake_country=(tf.parm&&tf.parm['fake_country'])?'?c='+tf.parm['fake_country']+'&':'?';
		scr.load(id(i),url(i));
		if(all){
			for(i=1;i<servers.length;i++){
				this.timer3.push(setTimeout("scr.load('"+id(i)+"','"+url(i)+"')",1000*i));
			}
		}
		this.poll();
	}
};
if(!isInSF()){ping.go(false);ping.timer2=setTimeout('ping.failed()',5000);}
else{country_code=region=shopRegion;} // We don't ping if in SF, so we need to initialise country_code


tf.wm.rld=function(w,u,p,h){if(w==null)return;if(u==null)w.location.reload();else w.location=this.url(u,p,h);return;}
tf.wm.pProp=function(id,prop){if(this._pArr==null)this._pArr=[];if(prop!=null)this._pArr[id]=prop;return this._pArr[id];}
tf.wm.pPropQty=function(id,qty){if(this._pArr[id])if(typeof(qty)!='undefined')this._pArr[id][4]=qty;else return this._pArr[id][4]}

var pg=new Array(),lang=tf.lang?tf.lang:'en-us';
pg={'D-33':'load_index2.html','D-34':'load_index1.html','D-2':'front.html','D-3':'about.html','D-4':'privacy.html','D-5':'terms.html','D-6':'basket.html','D-7':'customerdtl.html','D-8':'thankyou.html','D-9':'contactus.html','D-10':'favorites.html','D-11':'blog.html','D-12':'index.html','D-13':'search.html','D-14':'changecurrency.html','D-15':'login.html','D-16':'unsuccessful.html','D-17':'orderterms.html','D-18':'ordertotal.html','D-19':'reseller.html','D1':'d1.html','D2':'d2.html','D3':'d3.html','D4':'d4.html','D5':'d5.html','D6':'d6.html','D7':'d7.html','D8':'d8.html','D9':'d9.html'};

var pm=[],prMap=[], splitNum=10;
var pm_str='D4,P73,P19,P7,P3,P56,P30,P60,P18,P44,P28,P45,P16,P38,P5,P6,P9,P17,P15,P14,P32,P65,P67,P50,P13,P40,P8,P35,P51,P55,;D5,P49,P21,P1,P2,P48,P59,;D6,P25,P12,P57,P52,P27,P22,P36,P24,P26,;D7,P46,P62,P63,P64,P70,P66,P54,P42,P43,;D8,P53,P37,P29,P39,P68,P71,P33,;D9,P62,P63,P64,P70,P66,P73,P65,P67,P69,P68,;';
var pm_arr=pm_str.split(';');

for (i in pm_arr) {
	if(!pm_arr[i])continue;
	var prs=pm_arr[i].split(',');
	pm[prs[0]]='';
	for(var j=1;j<prs.length;j++) {
		if(!prs[j]) continue;
		var suf=parseInt((j-1)/splitNum);
		if(suf==0) suf='';
		else {
			if(suf<10) suf='0'+suf;
			suf='_'+suf;
		}
		prMap[prs[j]]=escape(unescape(pg[prs[0]]).replace('.html','')+suf+'.html');
	}
}

function getParentPage(productId){return prMap[productId];}






function regionalSettingsObj(rulesList) {
 this.defDecimal='.';
 this.defThousand=',';
 this.defPosition=0;
 this.regions=[];

 this.region=function(dec,thous,pos) {
	this.decimal=dec;
	this.thousand=thous;
	this.position=pos;
 }

 for (var i in rulesList) {
	switch (rulesList[i].length) {
		case 1: this.regions[rulesList[i][0]]=new this.region(this.defDecimal,this.defThousand,this.defPosition);break;
		case 3: this.regions[rulesList[i][0]]=new this.region(rulesList[i][1],rulesList[i][2],this.defPosition);break;
		case 4: this.regions[rulesList[i][0]]=new this.region(rulesList[i][1],rulesList[i][2],rulesList[i][3]);break;
	}
 }

 this.getCurrentSettings=function() {
	return this.getSettings((navigator.language)?navigator.language:navigator.userLanguage);
 }


 this.getSettings=function(lang)  {
	if(lang&&this.regions[lang])return this.regions[lang];
	else if (lang&&lang.length>2&&this.regions[lang.substr(0,2)])return this.regions[lang.substr(0,2)];
	else return this.defRegion;
 }

 this.getMerchantSettings=function() {
	return this.getSettings('en-us');
 }

 this.defRegion=new this.region(this.defDecimal,this.defThousand,this.defPosition);
}



var regionalSettings=new regionalSettingsObj([["af",".",",",2],["ar",".",",",2],
["az",",","",3],["be",",","",3],["bg",",","",3],["ca",",",".",3],["cs",",","",3],
["da",",",".",2],["de",",",".",3],["de-at",",",".",2],["de-ch",".","'",2],
["de-li",".","'",2],["de-lu",",",".",3],["div",".",",",3],["el",",",".",3],
["en"],["es",",",".",3],["es-ar",",",".",2],["es-bo",",",".",2],["es-cl",",",".",2],
["es-co",",",".",2],["es-cr",",",".",0],["es-do"],["es-ec",",",".",2],
["es-es",",",".",3],["es-gt"],["es-hn",".",",",2],["es-mx"],["es-ni",".",",",2],
["es-pa",".",",",2],["es-pe",".",",",2],["es-pr",".",",",2],["es-py",",",".",2],
["es-sv"],["es-uy",",",".",2],["es-ve",",",".",2],["et",".","",3],["eu",",",".",3],
["fa","/",",",2],["fi",",","",3],["fo",",",".",2],["fr",",","",3],["fr-be",",",".",3],
["fr-ca",",","",3],["fr-ch",".","'",2],["fr-lu",",","",3],["fr-mc",",","",3],
["gl",",",".",2],["gu",".",",",2],["he",".",",",2],["hi",".",",",2],
["hr",",",".",3],["hu",",","",3],["hy",".",",",3],["id",",",".",0],
["is",",",".",3],["it",",",".",2],["it-ch",".","'",2],["ja"],["ka",",","",3],
["kk","-","",0],["kn",".",",",2],["ko"],["kok",".",",",2],["ky","-","",3],
["lt",",",".",3],["lv",",","",2],["mk",",",".",3],["mn",",","",1],
["mr",".",",",2],["ms",",",".",0],["ms-bn",",",".",0],["nb",",","",2],
["nl",",",".",2],["nl-be",",",".",3],["nn-no",",","",2],["pa",".",",",2],
["pl",",","",3],["pt",",",".",0],["pt-pt",",",".",3],["ro",",",".",3],
["ru",",","",1],["sa",".",",",2],["sk",",","",3],["sl",",",".",3],
["sq",",",".",1],["sr",",",".",3],["sv",",",".",3],["sv-fi",",","",3],
["sw"],["syr",".",",",2],["ta",".",",",2],["te",".",",",2],["th"],
["tr",",",".",3],["tt",",","",3],["uk",",","",3],["ur"],["uz",",","",3],
["vi",",",".",3],["zh"]]);


function def(str) {return (str==null)?'':str;}

function split(str, del)
{
	function _s(a, s, d)
	{
		var idx=s.indexOf(d);
		if (idx==-1) a[a.length] = s;
		else {
			a[a.length] = s.substring(0, idx);
			_s(a, s.substring(idx+d.length, s.length), d);
		}
	}

	var arr = new Array();
	_s(arr, str, del);
	return arr;
}

function ckCodeStr(obj, order, sep, str)
{
	if (str==null) str = '';
	function delim(i, s) {return (i==0)?'':s}

	var cstr = '';
	var arr  = split(str, sep);
	var len  = arr.length;

	for (var i=0; i<order.length; i++){
		var val='';
		if(typeof(arr[i])=='string'){
			if(len>1)val=unescape(arr[i]);
			val=val.replace(/"/g,'\\"');
			val=val.replace(/,/g,'&#44;');
			val=val.replace(/-/g,'&#45;');
		}
		else{arr[i];}
		val = (isNaN(val)||val=='')?'"'+val+'"':parseFloat(val);
		val	= (len>1)?'='+val:'';
		cstr += delim(i,sep) + def(len>1?eval('obj.'+order[i]+val):escape(eval('obj.'+order[i]+val)));
	}

	if (typeof(obj.xcode)=='function') cstr += sep + obj.xcode((str!='')?arr[i]:'');
	return cstr;
}


var sym = new Array();
sym['yen']   = '%A5';
sym['pound'] = '%A3';

function entities(s)
{
	var i=s.indexOf('&');
	if (i==-1) return s;
	var j=s.indexOf(';', i);
	var s1=s.substring(0,i);
	var s2=unescape(sym[s.substring(i+1,j)]);
	var s3=entities(s.substring(j+1,s.length));
	return s1+s2+s3;
}

function dCurr(val, raw, c1, c2, del)
{
	if (isNaN(val)) return val;
	var scurr='';
	if (c1==null) return nfmt.display(val);
	if (c2!=null) {
		var val2 = val*c2.multiplier/tf.shopCurrency.multiplier;
		if (!raw) scurr = nfmt.display(val2, c2.decimal_places,entities(c2.abbrev));
		scurr=del+'('+scurr+')';
	}
	if (!raw) val = nfmt.display(val*c1.multiplier/tf.shopCurrency.multiplier, c1.decimal_places,c1.abbrev);
	return val+scurr;
}

function dispCurr(val, c1, c2) {return dCurr(val, 0, c1, c2);}
function showPrc(val, type,del) {
	if (type||!tf.secondCurrency) return dCurr(val, 0, tf.currentCurrency);
	if (!del) del=' ';
	return dCurr(val, 0, tf.currentCurrency, tf.secondCurrency,del);
}

function rl_total()
{
	Basket.refreshTotal();
}

function createMap(arr) {
var ret=[];
for (var i in arr) ret[arr[i]]=1;
return ret;
}




function updateReseller(prdc,values,type){
if (Basket&&Basket.gdisc) {
for (var i=0; i<prdc.length; i++) {
Basket.gdisc.eAdd(prdc[i], new Array(type,values[i],''))
}}}


function smart_unescape(s) {
try {
 return unescape(s);
} catch (e) { return s;}
}

function smart_escape(s) {
if(window.encodeURI) return encodeURI(s);
else return escape(s)
}


var startS=0;
var startR=0;
function getStyleClass(className,d){
var ss;
if(d.all){
for(var s=startS; s<d.styleSheets.length; s++){
startS=s+1;
if(!d.styleSheets[s].imports) continue;
if(d.styleSheets[s].imports.length==0)continue;
ss=d.styleSheets[s].imports[0];
for(var r=startR; r<ss.rules.length; r++){
startR=r+1;
if(ss.rules[r].selectorText==className){startS=s;return ss.rules[r];}
}}}
else if(d.getElementById){
for (var s=startS; s<d.styleSheets.length; s++){
startS=s+1;
if(d.styleSheets[s].cssRules.length==0)continue;
if(d.styleSheets[s].cssRules[0].type!=3)continue;
ss=d.styleSheets[s].cssRules[0].styleSheet;
for (var r=startR; r<ss.cssRules.length; r++){
startR=r+1;
if(ss.cssRules[r].selectorText==className){return ss.cssRules[r];}
}}}
return null;
}
function getCssText(className,d) {
if(!d)d=tf.content.document;
if(!d.styleSheets)return'';
startS=0;
startR=0;
var prevClass=getStyleClass(className,d);
var curClass=prevClass;
while(curClass) {
curClass=getStyleClass(className,d);
if (curClass) prevClass=curClass;
}
if (!prevClass) return '';
return prevClass.style.cssText;
}



function savCookStr(name,str,exp,test) {
	var cookieStr="0400"+str
	var cookie=name+"="+escape(cookieStr);
	var expiration=new Date();
	if (exp!='') {
	if (exp==-1) {
		expiration.setYear(2010);
		expiration.setMonth(01);
		expiration.setDate(01);
	} else {
		var t=expiration.getTime();
		var msPerDay=24*60*60*1000;
		t+=(msPerDay*exp);
		expiration.setTime(t);
	}}
	if(exp!='') {
	if(exp!=0) {
		cookie+="; expires="+expiration.toGMTString();
	} else {	// zero duration...  explicitly clear cookie
		cookie=name+"=";
	}}
	d.cookie=cookie;
	if(typeof(test)=='undefined')savCookStr('test','529fca4d-67b6-40de-8252-dc76d8b96775',exp,true);
}

function getCookStr(name) {
	var allCookies=d.cookie,id='0400529fca4d-67b6-40de-8252-dc76d8b96775';
	var testPos=allCookies.indexOf('test=');
	if(testPos==-1||allCookies.substr(testPos+5,id.length)!=id){d.cookie=name+'=0000; expires=Fri, 31 Dec 1990 23:59:59 GMT';return'';}
	var start=allCookies.indexOf(name+"=");
	if(start==-1)return'';
	start+=name.length+1;
	var end=allCookies.indexOf(';',start);
	if(end==-1) end=allCookies.length;
	var cookieStr=unescape(allCookies.substring(start,end));
	if(cookieStr.length<4) return("");
	if(cookieStr.substring(0,4)!="0400") return("")
	cookieStr=cookieStr.substring(4,cookieStr.length);
	return(cookieStr);
}



function timeMgr(offset)
{
	this.setTime = tmSetTime;
	this.getTime = tmGetTime;
	this.isActive = tmIsActive;
	this.offset = tmOffset;

	this.myTZ = (new Date()).getTimezoneOffset() / 60 * -1;
	this.timestamp = new Date();

	this.offset(offset);
	return this;
}

var currTime = new timeMgr('');
currTime.getTime();

function tmGetTime(){
if (gmtTime==0) setTimeout("currTime.getTime()", 500);
else (this.setTime(gmtTime));
}

function tmSetTime(ti)
{
	if (ti==null) return this._cTime;
	this._cTime = ti;
	return this._cTime;
}

function tmOffset(os)
{
	if (os!=null&&os!='') this._offset=os;
	return this._offset;
}

function tmIsActive(fr, to, rep, freq)
{
	if (fr==null || fr=='') return 1;
	if (to==null) {
		var a=fr.split(',');
		if (a.length==1) return 1;
		return this.isActive(a[0],a[1],a[2],a[3]);
	}
	fr=parseInt(fr);to=parseInt(to);rep=parseInt(rep);freq=parseInt(freq);
	var now  = this.setTime();
	for (var i=0; i<=rep; i++) {
		var period = i*freq*86400;
		if (fr+period <= now && now <= to+period) return 1;
	}
	return 0;
}




function numeric(fmt, dp)
{
	this.cvt = numCvt;
	this.fmt = numFmt;
	this.display = numDisplay;
	this.parse = numParse;
	this.delim = numDelim;
	this.round = numRnd;
	this.toLoc = numToLoc;
	this.fromLoc = numFromLoc;
	this.getDecPlaces=numDecimalPlaces;
	this.fmt(fmt, dp);
	return this;
}

function numDelim() {return this.del2};

function numFmt(fmt, dp)
{


	if(!regionalSettings.getCurrentSettings())
		this.settings=regionalSettings.getMerchantSettings();
	else
		this.settings=regionalSettings.getCurrentSettings();
	this.del2=this.settings.decimal;
	this.del1=this.settings.thousand;
	this.pos=this.settings.position;

	this.dec_sep='.';
	this.dec_num=2;
	this.dec = (!dp||isNaN(dp))?0.01:parseFloat(dp);
}

function numCvt(val, del)
{
	var len = val.length;
	if (len <= 3) return val;

	var rem = this.cvt(val.substring(0, len - 3), del);
	var dig = val.substring(len - 3, len);
	if (rem == '') del = '';
	return rem+del+dig;
}
function numToLoc(val)
{
	val=''+val;val=val.replace(/^0*/,'');
	var a=split(val,this.dec_sep);
	if(a.length==1)return ''+parseFloat(val.replace(this.del2,''));
	if(a.length>1){
		if(!a[0])a[0]='0';if(!a[1])a[1]='0';
		return ''+parseInt(a[0])+this.del2+a[1];
	}
	else return val;
}
function numFromLoc(val)
{
	val=''+val;val=val.replace(/^0*/,'');
	var a=split(val,this.del2);
	if(a.length==1)return ''+parseFloat(val.replace(this.del1,''));
	if(a.length>1){
		if(!a[0])a[0]='0';if(!a[1])a[1]='0';
		return ''+parseInt(a[0])+this.dec_sep+a[1];
	}
	else return val;
}

function numRnd(val,dp,roff)
{
	var ret=val;
	if (dp==null) dp = this.dec;
	if (roff) return Math.round(val/roff)*roff;
	if(!dp)return val;
	ret=Math.round(val/dp)*dp;
	var pow=Math.pow(10, this.dec_num);
	return Math.round(ret*pow)/pow;
}
function numDecimalPlaces(v)
{
	var s=v.toString();
	s=s.substr(s.indexOf('.')+1);
	return 1/Math.pow(10,s.length);
}
function numDisplay(val, dp, curSym)
{
	if (!dp) dp = this.dec;
	val = this.round(val,this.getDecPlaces(val)).toString();
	var idx = val.indexOf(this.dec_sep);
	var itr = (idx == -1)?val:val.substring(0, idx);
	var dec = (idx == -1)?'':val.substring(idx+1, idx+dp+1);

	itr = this.cvt(itr, this.del1);
	for (var i=dec.length;i<dp; i++) dec += '0';
	var ret=(dp<1)?itr:itr + this.del2 + dec;

	switch(this.pos) {
		case 1: ret=ret+curSym;break;
		case 2: ret=curSym+' '+ret;break;
		case 3: ret=ret+' '+curSym;break;
		default: ret=curSym+ret;break
	}
	return ret;
}

function numParse(str,dec)
{
	str=str.toString();
	if (str=='') return 0;

	function _chg(s,del) {
		var idx = s.indexOf(del);
		if (idx == -1) return s;
		var ts = s.substring(0, idx) + _chg(s.substring(idx+1, s.length));
		return ts;
	}
	var pwr = Math.pow(10, (dec==null)?1:dec);
	return (Math.round(parseFloat(_chg(str,this.del1))*pwr)/pwr);
}





var hexdelim	= "O";
var chrsz	= 8;
var hexcase = 0;
var b64pad  = "";

function add(s) {return binb2hex(core_sha1(str2binb(s),s.length * chrsz))}
function core_sha1(x, len)
{
	x[len >> 5] |= 0x80 << (24 - len % 32)
	x[((len + 64 >> 9) << 4) + 15] = len
	var w = Array(80)
	var a =  1732584193
	var b = -271733879
	var c = -1732584194
	var d =  271733878
	var e = -1009589776
	for(var i = 0; i < x.length; i += 16)
	{
		var olda = a
		var oldb = b
	var oldc = c
	var oldd = d
	var olde = e
		for(var j = 0; j < 80; j++)
		{
			if(j < 16) w[j] = x[i + j]
			else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1)
			var t = safe_add(safe_add(rol(a, 5), ft(j, b, c, d)),
											 safe_add(safe_add(e, w[j]), kt(j)))
			e = d
			d = c
			c = rol(b, 30)
			b = a
			a = t
		}
		a = safe_add(a, olda)
		b = safe_add(b, oldb)
		c = safe_add(c, oldc)
		d = safe_add(d, oldd)
		e = safe_add(e, olde)
	}
	return Array(a, b, c, d, e)
	function ft(t, b, c, d)
	{
		if(t < 20) return (b & c) | ((~b) & d);
		if(t < 40) return b ^ c ^ d;
		if(t < 60) return (b & c) | (b & d) | (c & d);
		return b ^ c ^ d;
	}
	function kt(t)
	{
		return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
					 (t < 60) ? -1894007588 : -899497514;
	}
}
function safe_add(x, y)
{
	var lsw = (x & 0xFFFF) + (y & 0xFFFF)
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
	return (msw << 16) | (lsw & 0xFFFF)
}
function rol(num, cnt)
{
	return (num << cnt) | (num >>> (32 - cnt))
}
function str2binb(str)
{
	var bin = Array()
	var mask = (1 << chrsz) - 1
	for(var i = 0; i < str.length * chrsz; i += chrsz)
		bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32)
	return bin
}
function binb2hex(binarray)
{
	var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef"
	var str = ""
	for(var i = 0; i < binarray.length * 4; i++)
	{
		str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
					 hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF)
	}
	return str
}

function place(s) {
	var t = "";
	for (var x = 0; x < s.length; x++) {
		t += binb2hex(String(s.charCodeAt(x)).split()).replace(/^0+/,'');
	}
	return t
}
function show(v) {
	var t = "";
	if((v.length%2)==0){
		for (var x = 0; x < v.length; x+=2) {
			t += String.fromCharCode(parseInt(v.charAt(x)+v.charAt(x+1),16));
		}
	}
	return t
}




function dynObj(gid)
{
	this.gid = gid;
	this._arr = new Array();
	this._idtags = new Array();
	this._cnt = 0;

	this.cnt = dOCnt;
	this.idx = dOIdx;
	this.add = dOAdd;
	this.del = dODel;
	this.get = dOGet;
	this.getS = dOGetS;
	this.getById = dOGetById;
	this.empty = dOEmpty;
	this.start = dOStart;
	this.next  = dONext;
	this.replace = dOReplace;
	this.eAdd  = dOEAdd;
}

function dOCnt()
{
	return this._cnt;
}

function dOIdx(idtag)
{
	for (var i=0; i<this._cnt; i++) if (this._arr[i].idtag == idtag) return i;
	return -1;
}

function dOAdd(obj)
{
	var idx = this.idx(obj.idtag);
	if (idx!=-1) return 0;
	if (!isNaN(obj.idtag)) obj.idtag = (obj.id&&isNaN(obj.id))?'_'+obj.id:this._cnt;
	this._arr[this._cnt++] = obj;
	return 1;
}

function dODel(idx)
{
	if (isNaN(idx)) {
		idx = this.idx('_'+idx);
		if (idx==-1) return '';
	}
	if (idx<0 || idx>=this._cnt) return '';
	for (var i=idx+1; i<this._cnt; i++) this._idtags[i-1]=this._arr[i].idtag;
	for (var i=idx; i<this._cnt-1; i++) this.replace(i, this._arr[i+1]);
	this._arr[this._cnt-1] = null;
	this._cnt--;
}

function dOReplace(idx, obj)
{
	if (isNaN(idx)) return this.replace(this.idx('_'+idx));
	if (idx<0 || idx>this._cnt) return this.add(obj);
	if (obj!=null) obj.idtag = this._idtags[idx];
	this._arr[idx] = obj;
}

function dOGet(idx)
{
	if (isNaN(idx)) return this.get(this.idx('_'+idx));
	if (idx<0 || idx>=this.cnt()) return '';
	return this._arr[idx];
}
function dOGetS(idx)
{
	if (isNaN(idx)||typeof(idx)=='string') return this.get(this.idx('_'+idx));
	if (idx<0 || idx>=this.cnt()) return '';
	return this._arr[idx];
}

function dOStart()
{
	this._idx = 0;
	return this._arr[0];
}

function dONext()
{
	return this._arr[++this._idx];
}

function dOEmpty(idtag)
{
	if (idtag==null) idtag = this.cnt();
	else idtag = '_'+idtag;
	var tmp    = eval('new '+this.gid+'()');
	tmp.gid	   = this.gid;
	tmp.idtag  = idtag;
	return tmp;
}

function dOEAdd(idtag, a)
{
	var obj = this.get(idtag);
	if (obj!='') return obj;

	var s='obj.init(';for (var i=0;i<a.length-1;i++) s+='a['+i+'],';s+='a['+i+'])';
	obj=this.empty(idtag); eval(s);
	this.add(obj);
	return obj;
}

function dOGetById(idtag) {
	var gd=null;
	if (isNaN(idtag)) idtag='_'+idtag;
	var i=this.start();
	while(i!=null) {
		if (i.idtag==idtag) {gd=i;break;}
		i=this.next();
	}
	return gd;
}


function Iterator(obj) {
this.obj=obj;
this.idx=0;
this.start=itStart;
this.next=itNext;
}

function itStart() {
this._idx = 0;
return this.obj._arr[0];
}

function itNext()
{return this.obj._arr[++this._idx];}


function iField(field)
{
	var type = field.type;
	var idx	= 0;
	var value = '';
	switch (type) {
		case 'hidden':	 value = field.value; break;
		case 'text': 	 value = field.value; break;
		case 'textarea': value = field.value; break;
		case 'radio':	 if (field.checked) value = field.value; break;
		case 'checkbox': if (field.checked) value = field.value; break;
		case 'select-one': 
			idx = field.selectedIndex;
			idx=(idx>0)?idx:0;
			value = field[idx].value; 
			break;
	}

	this.value	= value;
	this.idx	= idx;
	this.type	= type;
	this.name	= field.name;
	this.display	= field.display;

	if (!def(this.display)) this.display = '';
	return this;
}

function iForm(form)
{
	this.getField = iformGFld;
	this.getValue = iformGVal;

	this.count = 0;
	this.fields = new Array();
	for (var i=0; i<form.length; i++) {
		var fld = new iField(form[i]);
		if (fld.value == '') continue;
		var exist = this.getField(fld.name);
		if (exist != '') exist.value += '&&' + fld.value;
		else this.fields[this.count++] = fld;
	}

	return this;
}

function iformGFld(name)
{
	var str = '';
	for (var i=0; i<this.count; i++) 
		if (this.fields[i].name == name) return this.fields[i];
	return '';
}

function iformGVal(name)
{
	var val = this.getField(name).value;
	return def(val);
}




function options()
{
	this.prop	= new Array();
	this.order	= _oArr;
	this.separator	= ',';
	this.init	= optInit;
	this.check	= optCheck;
	this.choice	= optChoice;
	this.price	= optPrice;
	this.weight	= optWeight;
	this.optId	= optOptId;
	this.code	= optCode;
	return this;
}

function optInit(arr, value)
{
	this.name  = arr[1];
	this.title = arr[2];
	this.type  = arr[3]==1;
	this.opttype = arr[4];
	this.combine = arr[5];
	this.value = value;
	this.prop  = split(value, str_sep1);
}

function optCheck()
{
	if (this.value == '' && this.type) {
		return this.title;
	}
	return '';
}

function optChoice()
{
	return this.prop[0];
}

function optPrice()
{
	var prc = this.prop[1];
	return (!def(prc))?0:parseFloat(prc);
}

function optWeight()
{
	var wght = this.prop[2];
	return (!def(wght))?0:parseFloat(wght);
}

function optOptId()
{
	var id = this.prop[3];
	return (!def(id))?'':id;
}

var _oArr=['prop[0]','prop[1]','prop[2]','prop[3]'];
function optCode(str)
{
	if (this.choice() == '') return '';
	return ckCodeStr(this, _oArr, ',', str);
}


function range()
{
	this.init = rgInit;
	this.getData = rgGetData;
	return this;
}

function rgInit(min,max,data)
{
	if (max == null) {
		var arr = split(min, ',');
		return this.init(arr[0], arr[1], arr[2]);
	}
	this.min = min;
	this.max = max;
	this.data = data;
}

function rgGetData(value, type)
{
	if (type==null) type=0;
	if (this.min==this.max) type=1;
	if (type==1) if (this.min <= value) return this.data;
	if (this.min <= value && value < this.max) return this.data;
	return '';
}


function keyval()
{
	this.init = srInit;
	this.val =  srVal;
}

function srInit(i,v,s)
{
	this._id = i;
	this.val(v);
	this.str = (s==null)?'':s;
}

function srVal(v)
{
	if (v!=null) this._val = v;
	return this._val;
}



function discount()
{
	this.rg = new dynObj('range');

	this.init = discInit;
	this.getData = discData;
	this.amount = discAmount;
	this.purchasePrice = discPurchasePrice;
	this.purchasePriceByPrice = discPurchasePriceByPrice;
	this.getNextRange = discGetNextRange;
	this.free = discFree;
	this.code = discCode;

	return this;
}

function discInit(type, val, tlim, del1, del2)
{
	this.type = type;
	this.value = val;
	this.tlim = tlim;
	this.del1 = (del1==null)?';':del1;
	this.del2 = (del2==null)?',':del2;

	var a1 = this.value.split(this.del1);
	for (var i=0; i<a1.length; i++) {
		var a2 = a1[i].split(this.del2);
		if (a2.length == 1) continue;
		var tmp = this.rg.empty();
		tmp.init(a2[0],a2[1],a2[2]);
		this.rg.add(tmp)
	}
}

function discData(key,type,getO)
{
	var cnt = this.rg.cnt();
	if (!cnt) return '';
	if (key<this.rg.get(0).min) return '';
	for (var i=0; i<cnt; i++) {
		var rg = this.rg.get(i);
		if (rg == '') return '';
		var data = rg.getData(key,type);
		if (data!='') return (data=='-')?'':(getO)?rg:data;
	}
	var rg = this.rg.get(cnt-1);
	return (getO)?rg:rg.data;
}


function discGetNextRange(key)
{
	var cnt = this.rg.cnt();
	if (!cnt) return '';
	if (key<this.rg.get(0).min) return this.rg.get(0);
	var flag=false;
	for (var i=0; i<cnt; i++) {
		var rg = this.rg.get(i);
		if (rg == '') return '';
		if (flag) return rg;
		var data = rg.getData(key);
		if (data!='') flag=true;
	}
	return '';
}

function discAmount(prc,qnty,oprc,lvl)
{
	var type=this.type.toString();
	if (false)
			return 0;
	var p=0,perc = 0;
	if (!currTime.isActive(this.tlim)) return p;
	var prc2=prc;
	switch(type) {
		case '0': p=prc-parseFloat(this.value==''||isNaN(this.value)?0:this.value); break;
		case '1': case '10': case '11': p=prc2*(parseFloat(this.value)/100);break;
		case '5': perc=this.getData(qnty);p=(isNaN(perc))?0:(prc2-perc);break;
		case '4': perc=this.getData(qnty);
			  p=(isNaN(perc))?0:prc2*(perc/100);break;
	}
	if (p>=(type==0?prc:prc2)||p<0){if(p==(type==0?prc:prc2)&&(type=='10'||type=='11'))return p;else return 0;}
	
	return p;
}


function discPurchasePrice(prc) {
  var perc=this.getData(prc);
  var p=(isNaN(perc))?0:(prc)*(perc/100);
  if (p>=prc) return 0;
  return p;
}

function discPurchasePriceByPrice(prc,discPrice) {
  var perc=this.getData(discPrice);
  var p=(isNaN(perc))?0:(prc)*(perc/100);
  if (p>=prc) return 0;
  return p;
}


function discFree(qnty)
{
	switch(this.type) {

		case '2': return parseInt(qnty/this.rg.get(0).max)*this.getData(qnty);break;
		case '3': var rg=this.getData(qnty,null,1);return (rg)?new Array((qnty>rg.max)?parseInt(qnty/rg.max):1,rg.data):'';


		case '103': return new Array(1,this.getData(qnty));
	}
	return '';
}

var _dArr = new Array('type','value','tlim');
function discCode(str)
{
	return ckCodeStr(this, _dArr, '|', str);
}



var rules = new Array();
var taxExemptObj=new taxExempt();

function taxExempt()
{
	this.len=new Function('x','return this.s.length==x');
	this.chr=new Function('x','y','x=this.s.charAt(x);return y?(x==y):("A"<=x&&x<="z")');
	this.num=new Function('x','y','x=this.s.substring(x,y);return parseInt(x.replace(/^0+/,\'\'))==x');
	this.chk=new Function('s','c','this.s=s.toUpperCase();return (rules[c])?eval(rules[c]):1');

	this.euroCountries=createMap(['AT','BE','CY','CZ','DE','DK','EE','EL','ES','FI','FR','GB','HU','IE','IT','LT','LU','LV','MT','NL','PL','PT','SE','SL','SK']);
}





rules['AT']="L(9)&&C(0,'U')&&N(1,8)"
rules['BE']="L(9)&&N(0,9)"
rules['DK']="L(8)&&N(0,8)";
rules['FI']="L(8)&&N(0,8)";
rules['FR']="L(11)&&N(2,11)"
rules['DE']="L(9)&&N(0,9)";
rules['GR']="L(9)&&N(0,9)";
rules['IE']="L(8)&&C(7)&&(N(0,7)||(N(0,1)&&C(1)&&N(2,7)))";
rules['IT']="L(11)&&N(0,11)";
rules['LU']="L(8)&&N(0,8)";
rules['NL']="L(12)&&N(0,8)&&C(9,'B')&&N(10,12)";
rules['PT']="L(9)&&N(0,9)";
rules['ES']="L(9)&&((C(0)&&N(1,8))||(N(0,8)&&C(8))||(C(0)&&C(8)&&N(1,8)))";
rules['SE']="L(12)&&N(0,10)&&C(10,'0')&&C(11,'1')";

function rpl(s,f,t){
	var i=s.indexOf(f);
	if (i==-1) return s;
	return rpl(s.substring(0,i)+t+s.substring(i+f.length,s.length), f, t);
}

for (i in rules) {
	rules[i] = rpl(rules[i],'L','this.len');
	rules[i] = rpl(rules[i],'C','this.chr');
	rules[i] = rpl(rules[i],'N','this.num');
}





function tax_regn()
{
	this.init = taxRInit;
	this.calcShipAmt = taxCalcShipAmt;
	return this;
}

function taxRInit(i,c,p,t,e,it)
{
	this.id	  = i;
	this.code = c;
	this.perc = parseFloat(p);
	this.taxName	= t;
	this.exempt	= e;
	this.exNo	= '';
	this.incTax	= it;
	this.cache	= 0;

}

function taxCalcShipAmt(sumRates,avgAmt) {
if (this.exempt && this.exNo) return 0
return avgAmt*this.perc/(100*sumRates);
}

function tax()
{
	this._tax = new dynObj('tax_regn');
	this._rgn = new Array();
	this.exNo = '';

	this.init	= taxInit;
	this.getDefaultReg=taxGetDefaultReg;
	this.currRegn	= taxCurrRegn;
	this.addArea	= taxAddArea;
	this.regnName	= taxRegnName;
	this.cntInc	= taxCntInc;


	this.regnRate	= taxRegnRate;
	this.forRegion	= taxForRegion;
	this.rate	= taxRate;
	this.amt	= taxAmt;
	this.allAmt	= taxAllAmt;
	this.singleAmt	= taxSingleAmt;
	this.inTax	= taxInTax;
	this.exTax	= taxExTax;
	this.calcTax	= taxCalcTax;
	this.disp	= taxDisp;
	this.list	= taxList;
	this.allCodes	= taxAllCodes;
	this.allIDs	= taxAllIDs;
	this.ship	= taxShip;
	this.isEmpty	= taxIsEmpty;
	this.anyTaxInclCountry=taxAnyTaxInclCountry;
	this.mapRegn	= [];
	this.mapTax	= [];
	return this;
}

function taxInit(d,s)
{
	this._default	= d;
	this.showBoth	= s;
}


function taxGetDefaultReg(){
if (this._default) return this._default;
var rc=window.shopRegion;
var _t = this._tax.start();
while (_t!=null) {
	if (rc.indexOf(_t.code)==0&&_t.code.length>this._default.length) this._default=_t.code;
	_t  = this._tax.next();
}
if (!this._default) this._default=rc;
return this._default;
}


function taxCurrRegn(rc)
{
	if (!rc) this._current = rc;
	else rc=this._current;
	if (!rc) rc=window.region;
	if (!rc) rc=this.getDefaultReg();
	this._current=rc;
	return rc;
}

function taxAddArea(id,c,p,t,r,inc)
{
	var tr = this._tax.get(id);
	if (tr == '') tr = this._tax.eAdd(id, new Array(id,c,p,t,r,inc));
	else tr.code += ','+c;

	if(this.mapRegn[c]) {
		if(!this.mapTax[id]) this.mapRegn[c]+=','+id;
	} else {
		this.mapRegn[c]=id;
	}
	this.mapTax[id]=tr.code;
	return 0;
}


function taxForRegion(tax,reg) {
	if(!tax||!reg||!this.mapTax[tax])return false;
	var tmp=this.mapTax[tax].split(',');
	for(var i in tmp) if(reg.indexOf(tmp[i])==0) return true;
	return false;
}


function taxRegnName(rc,rn)
{
	if (rn != null) this._rgn[rc] = rn;
	return (this._rgn[rc]==null)?'':this._rgn[rc];
}


function taxRegnRate(tid,c,ign)
{
	if (tid == '') return 0;
	var a = split(tid, ',');
	var ret=0;
	for (var j=0; j<a.length; j++) {
		if(!a[j])continue;
		var tr = this._tax.get(a[j]);
		if (tr=='') continue;
		if (tr.exempt && tr.exNo && !ign) continue
		if (c==null || c=='') c=this.currRegn();

		if (c==-1) c=(this.anyTaxInclCountry(this.currRegn()))?this.currRegn():'UK';

		var cd=tr.code.split(',');
		var tmpreg='',tmpval=0;
		for (var i=0; i<cd.length; i++) {
			if (cd[i]=='') continue;
			if (c.indexOf(cd[i])==0) {
				if (tmpreg.length<cd[i].length) {
					tmpreg=cd[i];
					tmpval=tr.perc;
				}
			}
		}
		ret+=tmpval/100;
	}
	return ret;
}


function taxAnyTaxInclCountry(regn) {
 var it = new Iterator(this._tax);
 var _t=it.start();
 while (_t!=null) {
	if(_t.incTax&&this.forRegion(_t.id,regn)) return true;
	_t = it.next();
 }
 return false;
}

function taxRate(i,c)
{
	var a = split(i, ',');
	var r = 0;
	for (var j=0; j<a.length; j++) r += this.regnRate(a[j], c);
	return r;
}

function taxAmt(inc,i,p,c)
{
	var r = this.rate(i,c);
	var amt = p * r;
	var val = (inc)?amt/(1+r):amt;
	
	return val;
}

function taxAllAmt(i,p,c)
{
	if (!c) c=this.currRegn();
	var tot=0;
	p=this.exTax(i,p);
	var a = split(i, ',');
	for (var j=0; j<a.length; j++)
		if (a[j]&&this._tax.get(a[j])) tot += this.amt(0,a[j],p);
	return tot;
}


function taxSingleAmt(i,p,c)
{
	var r = this.regnRate(i, c)
	var val = p * r;
	
	return val;
}

function taxInTax(i,p,c)
{
	p = this.exTax(i,p);
	var amt = this.amt(0,i,p,c);
	var val = p+amt;
	
	return val;
}

function taxExTax(i,p)
{
	p = parseFloat(p);
	var a = split(i, ',');
	var r=0;
	for (var j=0; j<a.length; j++)
		if (a[j]&&this._tax.get(a[j])) r += (this._tax.get(a[j]).incTax)?this.regnRate(a[j],-1,1):0;
	p-=p*r/(1+r);
	
	return p;
}

function taxCalcTax(i,p,c)
{
	if (!c) c=this.currRegn();
	if (this.exempt && this.exNo) return this.exTax(i,p);
	var a = split(i, ',');
	var d=0;
	p=this.exTax(i,p);
	for (var j=0; j<a.length; j++)
		if (a[j]&&this._tax.get(a[j])) d+=(this._tax.get(a[j]).incTax)?this.singleAmt(a[j],p,c):0;
	var val = p+d;
	
	return val;
}

function taxDisp(i,p,co,ccr)
{

	var exT = this.exTax(i,p);
	var inT = exT+this.allAmt(i,p);
	if (ccr != null && ccr!=0) {
		inT /= ccr;
		exT /= ccr;
	}

	var s='';
	if (this.isEmpty(i)||exT>=inT) { s='\n '+showPrc(inT);}
	else {
		if (this.showBoth && inT>exT) {
			s='\n - '+LD.LD_INC_TOTAL_TAX+' '+showPrc(inT)+' '+LD.LD_EX_TOTAL_TAX+' '+showPrc(exT);
		} else {
			if (p-exT>0.0001) {
				s=LD.LD_INC_TOTAL_TAX+' '+showPrc(p);
			} else {
				s=showPrc(p);
			}
		}
	}

	return s;
}

function taxList(taxes)
{
	var a=taxes.split(',');
	var ret = new Array();
	for (i=0; i<a.length; i++) {
		if (!this.regnRate(a[i])) continue;
		var t=this._tax.get(a[i]);
		if (t=='') continue;
		ret[ret.length] = t;
	}
	return ret;
}

function taxAllCodes()
{
	var s = '';
	var _t = this._tax.start();
	while (_t!=null) {
		s += _t.code + ',';
		_t  = this._tax.next();
	}
	return s;
}

function taxAllIDs()
{
	var s = new Array();
	var _t = this._tax.start();
	while (_t!=null) {
		s[s.length] = _t.id;
		_t = this._tax.next();
	}
	return s.join(',');
}

function taxShip(amt)
{
	if (amt!=null) this._stax=amt;
	return this._stax?this._stax:0;
}



function taxCntInc(items) {
	var itm=items.start();
	var a;
	while (itm!=null) {
		a=itm.taxes.split(',');
		for (var j=0; j<a.length; j++)
			if (a[j]&&this._tax.get(a[j])&&this._tax.get(a[j]).incTax&&this._tax.get(a[j]).perc>0) return true;
	itm=items.next();
	}
	return false;

}

function taxIsEmpty(i,rcode) {
var a=i.split(',');
for (var j=0; j<a.length; j++) {
	if(!a[j])continue;
	var tax=this._tax.get(a[j]);
	if (rcode) {
		if (tax&&tax.perc>0){
			var ad=false, t = tax.code.split(',');
			for(k=0;k<t.length;k++){var lRegion = rcode.substr(0,Math.min(t[k].length,rcode.length));if(t[k].indexOf(lRegion)==0){ad=true;break}}
			if(ad) return false;
		}
	} else {
		if (tax&&tax.perc>0) return false;
	}
}
return true;
}


var frPrArr=new Array();



function freeBasket(bsk)
{
	this._add	= fb_Add;
	this.bsk	= bsk;
	this.fqnty	= fbQnty;
	this.fprod	= fbProd;
	this.add	= fbAdd;
	this.clear	= fbClear;
	this.overall	= fbOverall;
	this.checkBasket=fbCheckBasket;
	this.delByPr	=fbDelByPr;
	this.getTitles	=fbGetTitles;
	this.clear();
}

function fbClear()
{
	this.items = new dynObj('item');
}

function fb_Add(id, qnty, title, weight,price, prdc,imgid)
{
	var tmp = this.items.get(id);
	prdc=prdc.replace('%%P','');
	if (tmp=='') this.items.eAdd(id, new Array(this.bsk,id,tf.content.document,parseFloat(qnty),price,title,parseFloat(weight),prdc,'','','','',imgid));
	else tmp.quantity = qnty;
}

function fbGetTitles(ids,del) {
var ret=''; if (!del) del=',';
for (var i=0; i<frPrArr.length; i++) {
if (ids.indexOf(frPrArr[i][0])==-1) continue;
ret+=del+frPrArr[i][1];
}
return ret.substr(1);
}

function fbQnty(val, itm, disp)
{
	if (disp) return ld('LD_FREE_QUANTITY', '')+ ':  ' + val + ' x ' + itm.title;
	this._add(itm.id+"|"+itm.id, parseFloat(val), itm.title, itm.weight(), itm.price, itm.prdc, itm.pimg);
}

function fbProd(val,itm,disp)
{
	if (!val) return '';
	var str = ld('LD_FREE_PRODUCT', '');
	var freeqnty=val[0]; val=val[1];
	
	var z=0;
	for (var i=0; i<frPrArr.length; i++) {
		if (val.indexOf(frPrArr[i][0])==-1) continue;
		z=1;
		if (disp) str += '<br>  '+freeqnty+' x ' + frPrArr[i][1];
		else {
			pid=(itm.id)?itm.id:'shop';
			this._add(pid+"|"+frPrArr[i][0], freeqnty, frPrArr[i][1], frPrArr[i][2],frPrArr[i][3],frPrArr[i][4],frPrArr[i][5]);
		}
	}
	return (z)?str:'';
}

function fbAdd(itm, disc, stk, disp)
{
	var qnty=(typeof(itm)=='object')?itm.quantity:0;
	if (typeof(itm)=='number') qnty=itm;
	var free = (disc)?disc.free(qnty):null;
	if (!free) return '';
	
	if (disp==null) disp=0;
	switch(disc.type) {
		case '2': return this.fqnty(free, itm, disp);
		case '3': case '103': return this.fprod(free, itm, disp);
	}
	return '';
}

function fbOverall(type)
{
	var ret = 0;
	for (var i=0; i<this.items.cnt(); i++) {
		var itm = this.items.get(i);
		switch (type) {
			case 'weight':	 ret += itm.weight() * itm.quantity; break;
			case 'quantity': ret += itm.quantity;
			default: break;
		}
	}
	return ret;
}

function fbCheckBasket(id) {
var i=this.items.start();
while (i!=null) {
	if (i.id.split('|')[0]==id) return 1
	i=this.items.next();
}
return 0;
}


function fbDelByPr(id) {
var delArr=new Array();
var it=new Iterator(this.items); var i=it.start();
while (i!=null) {
	if (i.id.split('|')[0]==id) delArr[delArr.length]=i.id;
	i=it.next();
}
for (var i=0; i<delArr.length; i++) {
	this.items.del(delArr[i]);
}
}

function basket(name)
{
	this.name  = (name!=null)?name:'';
	this.items = new dynObj('item');
	
	this.stk   = new dynObj('stock');
	this.disc  = new dynObj('discount');
	this.gdisc = new dynObj('discount');
	this.ship  = new dynObj('keyval');
	this.fbsk  = new freeBasket(this);
	this.tax   = new tax();
	this.chk_total=0;
	this.chk_total_tax=0;
	
	this.parse	= bskParse;
	this.add	= bskAdd;
	this.del	= bskDel;
	this.save	= bskSave;
	this.load	= bskLoad;
	this.encode	= bskEncode;
	this.decode	= bskDecode;
	
	this.shpP	= 0;
	this.shDisc	= bskShDisc;
	this.updQnty	= bskUpdQnty;
	this.total	= bskTotal;
	this.ckOut	= bskCkOut;
	this.hasDisc	= bskHasDisc;
	this.overall	= bskOverall;
	this.shipPrice	= bskShpPrice;
	this.noShip	= bskNoShp;
	this.pShip	= bskPShip;
	this.searchTaxes= bskSearchTaxes;
	this.getAvgTaxAmt=bskGetAvgTaxAmt;
	this.invalidate = bskInvalidate;
	this.getTaxIDs	= bskGetTaxIDs;
	this.refreshTotal=bskRefreshTotal;
	this.clearBsk	= bskClearBsk;
	
	this.merge=bskMerge;
	
}


function bskParse(id,doc,qnty,title,weight,itemNo,useDec,esd,taxes,opts,prdc,manc,dstc,prcc,ship,restoring,temp)
{
	var price=0;

	function cf(i,d,sd,s,t,st){

		currentItem	= i;
		var dcf		= doc.cf_popup;
		tf.load('conf.html','conf',true);
		tf.load('grey.html','shipping');
		
			var wnd=tf.content;
			wnd.sfAddRef={core:window,item:i,stock:st,options:opts,pdoc:doc}
			return false;
		
	}



	var stkEn=0,p=tf.wm.pProp(id);
	if(!p)return alert('Error: 0x00CEFF');

	var price=parseFloat(p[1]);
	if(!weight)weight=parseFloat(p[10]);

	var itm=this.items.empty();
	itm.init(this,id,doc,qnty,price,title,weight,itemNo,useDec,esd,taxes,prdc);



	var smin=p[2],smax=p[3],savail=p[4],st='',stk;if (savail<0) savail=Number.MAX_VALUE;

	var chk=itm.addOpt(opts,doc);
	if(chk!=''){
		tf.content.sfAddUnpop();
		if(chk!=' ')return alert(LD.LD_ORDER_ERROR_FIELDS+'\n'+chk);
		if(!confirm(LD.LD_CHOOSE_OPTIONS))return -1;
	}


	var disc = Basket.disc.eAdd(itm.id,[p[5], p[6], p[7]]);
	var ship = Basket.ship.eAdd(itm.id,[itm.id, p[8]]);


	if(this.name != ''){
		if(title!=''){if(confirm(LD.LD_FAVOURITES_CONFIRM))this.add(itm);}
		else this.add(itm);
		return null;
	}

	
	if (title!='' && !cf(itm, disc, this.shDisc(), stk, this.tax, st)) return 0;
	
	

	if (!this.add(itm)) return 0;
	return 1;
}

function bskAdd(itm)
{


	for (var i=0; i<this.items.cnt(); i++) {
		var tmp = this.items.get(i);
		if (!itm.isSame(tmp)) continue;
		
		tmp.transfer(itm)
		this.items.del(i)
		break;
	}

	this.items.add(itm)

	itm.cache=[];
	


	rl_total()

	this.save()
	return 1;
}

function bskDel(idx)
{
	var itm = this.items.get(idx)
	if (itm == '') return ''

	this.items.del(idx)

	if (this.fbsk&&this.name=='') {
		this.fbsk.delByPr(itm.id)
		this.fbsk.delByPr('shop');
		this.fbsk.add(this.total(), this.shDisc(), null, 0);
	}
	rl_total();

	this.save()
}


function bskUpdQnty(idx, qnty)
{
	var itm = this.items.get(idx);
	var tmp = itm.quantity;
	if (isNaN(qnty)||parseInt(qnty)<0) qnty=tmp;
	if (parseInt(qnty)==0) {this.del(idx); return;}
			// Subtract old quantity from stock
	itm.quantity=(itm.useDec>0)?parseFloat(qnty):parseInt(qnty);
			// Update new quantity to stock
	itm.cache=new Array();
	
	this.save()
	this.ckOut()
}

function bskTotal(type)
{
	
	var apply_dsc=true;
	if (type=='orig') {apply_dsc=false; type=''}
	if (type==null) type=''
	var tot=0,prprice=0,purtot=0;
	var i=this.items.start()
	while (i!=null) {
		tot += i.calc(type)
		purtot+=i.cache['pur'+i.quantity];
		if (type=='tax') prprice+=i.calc('ndc')
		i = this.items.next()
	}

	var shDisc=this.shDisc();
	if((type==''||type=='pur'||type=='inc')&&apply_dsc&&this._shDisc){tot-=shDisc.purchasePrice(tot);}
	if(type=='exc'&&apply_dsc&&this._shDisc)tot-=shDisc.purchasePriceByPrice(tot,purtot);



	if(type=='tax'&&apply_dsc&&this._shDisc) {
		tot-=shDisc.purchasePriceByPrice(tot,prprice);

	}
	

	return tot;
}

function bskHasDisc()
{
	return this.total('damt');
}

function bskShDisc(type, val, tLim)
{
	if (type==null||type=='') return this._shDisc;
	if (this._shDisc==null) this._shDisc=this.disc.eAdd('shop', new Array(type,val,tLim));
	return this._shDisc;
}

function bskOverall(type, ckOut)
{
	var ret = 0;
	for (var i=0; i<this.items.cnt(); i++) {
		var itm = this.items.get(i);
		switch (type) {
			case 'weight'  : ret += itm.weight() * itm.quantity; break;
			case 'quantity': ret += itm.quantity; break;
			default: break;
		}
	}
	
	if (ckOut != null) return ret;
	this.ckOut()
	ret += this.fbsk.overall(type);
	return ret;
}

function bskCkOut()
{
	this.fbsk.clear();
	for (var i=0; i<this.items.cnt(); i++) {
		var itm = this.items.get(i);
		var dsc = this.disc.get(itm.id);
		var stk;
		this.fbsk.add(itm, dsc, stk);
	}
	this.fbsk.add(this.total(), this._shDisc);
}

function bskShpPrice(shp_obj, ckOut, inc)
{
	if (shp_obj && typeof(shp_obj)=='object')this.shp_obj=shp_obj;
	if (shp_obj!=null) {
		if (shp_obj.cost==null) return 0;
		var e = 0;
		var t = this.total('tax');
		var p = this.total('exc');
		var pur = this.total();
		var w = this.overall('weight', ckOut);
		var q = this.overall('quantity', ckOut);
		var s = (inc)?shp_obj.cost(pur, w, q, region, method):shp_obj.calc(pur, p, w, q, region, method);
		this.shpP = (s==null||s<0)?0:s+this.pShip(shp_obj.cLink.mid,inc);
		this.tax.ship(shp_obj.tax(this.shpP, p));
		
		
	}
	return parseFloat(this.shpP);
}

function bskNoShp()
{
	var itm = this.items.start();
	var ps  = new Array();
	while (itm) {
		var tmp = itm.shipMth();
		for (i in tmp) if (i&&tmp[i]==0) ps[i]=1;
		itm = this.items.next();
	}
	return ps;
}

function bskPShip(mid,inc)
{
	if(!mid)return 0;

	var loc=-1;
	if (tf.core&&tf.core.region){
		var cnt=this.shp_obj.links.length,code=core.region;
		if(code.length>4)code=code.substring(0,4);
		var rgnLen=Math.min(core.shopRegion.length,code.length);
		for(var i=0;i<cnt;i++){
			var lk=this.shp_obj.links[i];
			if(lk.mid==mid&&lk.zip[code]!=null){
				loc=(core.shopRegion.indexOf(code.substr(0,rgnLen))==0?2:3);
				break;
			}
		}
	}
	if(loc==-1)return 0;

	var e	= 0;
	var itm = this.items.start();
	while (itm) {
		var n=itm.shipMth(mid, loc);
		if(typeof(inc)=='undefined'){
		var rgnCde=core.region;len=rgnCde.length-(rgnCde.length%2);
		for(var l=len;l>0;){
			if(typeof(core.STax.mapRegn[rgnCde])!='undefined'){e+=n;break;}
			l-=2;
			rgnCde=rgnCde.substring(0,l);
		}
		if(l==0)e+=core.STax.exTax(itm.taxes,n);
		}
		else{e+=(inc?n:core.STax.exTax(itm.taxes,n));}
		itm = this.items.next();
	}
	return e;
}


function bskSearchTaxes(rcode)
{

	var it = new Iterator(this.items),i=it.start();
	while (i!=null) {
		if (i.taxes!='') {
			if (!this.tax.isEmpty(i.taxes,rcode)) return true;
		}

		i = it.next();
	}
	return false;

}


function bskGetTaxIDs()
{

	var it	= new Iterator(this.items),i=it.start(),ret=new Array();
	while (i!=null) {
		var a=i.taxes.split(',');
		for (var j=0;j<a.length;j++) {
			if(ret.join(',').indexOf(a[j])==-1) ret[ret.length]=a[j];
		}
		i=it.next();
	}
	return ret.join(',');

}



function bskGetAvgTaxAmt(inc)
{

var it=new Iterator(this.items),avg=0, i=it.start(), prprice=0;
while (i!=null) {
	if (this.price<=0) continue;
	var a=i.taxes.split(','),rate=0;
	for (var j=0; j<a.length; j++) {
		if(!a[j])continue;
		if (inc&&!this.tax._tax.get(a[j]).incTax) continue;
		var crate=this.tax.regnRate(a[j],this.tax.currRegn());
		rate+=crate;
	}
	if (rate>0) avg+=rate*i.calc('exc');
	prprice+=i.calc('ndc');
	i=it.next();
}
if(this.shDisc())
	avg-=this.shDisc().purchasePriceByPrice(avg,prprice);
return avg;

}

function bskInvalidate() {
var it=new Iterator(this.items),i=it.start();
while (i!=null) {
	i.cache=new Array();
	i=it.next();
}
}

function bskRefreshTotal(){
	if(LD&&tf.content) {
		if(tf.conf&&tf.conf.greySettings)tf.conf.greySettings();else return;
		var el=tf.content.document?tf.content.document.getElementById('MiniCartTotal'):null;
		if(el&&confLoaded){
			if(this.items.cnt()==0){el.innerHTML='';return;}
			var s='',shipObj=tf.ship_obj,bsk=this;
			if(shipObj){
				var ppur=bsk.total();
				var ppur_ex=bsk.total('exc');
				var shp=bsk.shipPrice(shipObj);
				var ttax=(ppur>0.001)?bsk.total('tax'):0;
				var shp_asis=bsk.shipPrice(shipObj,null,1);
				if(shipObj._ttype==1){
					shtaxex=(ppur>0.001)?shp_asis/(1+bsk.getAvgTaxAmt(1)/ppur_ex):shp_asis;
				}else{
					shtaxex=tf.core.STax.exTax(tf.core.STax.allIDs(),shp_asis);
				}
				taxonshp=(ppur>0.001)?shipObj.tax(shp_asis,ppur_ex,null,shtaxex):0;
				var tax=ttax+taxonshp;
				var t=core.nfmt.round(ppur_ex)+tax+core.nfmt.round(shtaxex);
			}else{
				var ppur_ex=bsk.total('exc');
				var ttax=bsk.total('tax');
				var t=core.nfmt.round(ppur_ex)+ttax;
			}
			if(t>0){
				s=LD.LD_TOTAL;
				if(bsk.tax.cntInc(bsk.items)){s+=' '+LD.LD_INC;}
				s+=": <b>"+showPrc(t,0,'</b> ~ ');
			}
			el.innerHTML=s;
		}
	}
}

function bskClearBsk() {
this.stk   = new dynObj('stock');
this.items = new dynObj('item');
this.fbsk  = new freeBasket(this);

}

function load_price(args)
{
	var all = args[1];
	for (var i=0; i<all.length; i++) {
		var itm = all[i];
		args[0].parse(itm.id, itm, itm.quantity, '', '');
	}
}


function bskSave()
{
	tf.saveBskToName();
	if (getCookStr('storebasket')!='1'&&this.name!='Favorite') return;
	var ck = '';
	var ckName = this.name; if (!ckName) ckName='ADDRESS';
	if (this.items.cnt()>0) {
		ck = this.encode();
		var pck=place(ck);
		ck = pck + "TEST" + add(pck);
	}
	savCookStr(ckName, ck, '7');
	if (this.name!='')savCookStr(ckName, ck, -1);
	this.shpP = 0;
}

function bskLoad()
{
	tf.loadBskFromName();
	if (getCookStr('storebasket')!='1'&&this.name!='Favorite') return;
	var ckName = this.name; if (!ckName) ckName='ADDRESS';
	var arr = split(getCookStr(ckName), "TEST");
	if (arr.length == 2 && add(arr[0]) == arr[1]) {
		if (tf.nametag.get('loadBskFromCookie') || this.name!='' || confirm(shopName+':\n\n'+LD.LD_LOAD_BASKET+'  '+this.name)){
			tf.nametag.del('loadBskFromCookie');
			if(tf==tf.content){
				tf.nametag.add('sfqs','lang='+tf.document.documentElement.lang);
				tf.nametag.add('loadBskFromCookie',true);
				tf.location.replace('../index1.html');
			}
			else{
				this.decode(show(arr[0]));
			}
		}
		else savCookStr(ckName, "", '7');
	}
	rl_total();
}

function bskEncode()
{
	var is=''; var ss=''; var ds=''; var sep='';
	for (var i=0; i<this.items.cnt(); i++) {
		var itm = this.items.get(i);
		if(itm.temporary)continue;
		is += sep + itm.code();
		sep = '~';
	}
	return '['+is+']';
}

function bskDecode(str)
{
	
	function _L(url){
		var jfile=tf.wm.jfile(url);
		if(jfile.substr(0,1).toLowerCase()=='p')jfile=getParentPage(jfile.substr(0,jfile.indexOf('.')).toUpperCase());
		jfile=jfile.split('?')[0];
		jfile=jfile.replace(/(_\d\d)?\.html/,'_$1');
		return tf.lang+'/'+jfile;
	}
	

	var s  = str.substring(1,str.length-1);
	var sa = split(s, '][');
	var is = split(sa[0], '~');

	

	

	
	var fstr='core.load_price';
	var pg = new Array();
	
	for (var i=0; i<is.length; i++) {
		var itm = this.items.empty();
		itm.code(this,is[i])

		if (tf.wm.pProp(itm.id))		// Price already exists
			this.parse(itm.id, itm, itm.quantity,'','');
		else {
			var p = _L(itm.purl)
			if (!pg[p]) pg[p] = new Array();
			pg[p][pg[p].length] = itm;
		}


	}
	for (var i in pg) load_page(i, fstr, new Array(this, pg[i]));
	
}


function bskMerge(o,lvl,o2,oTop){
	if(isNaN(lvl)){lvl=0;oTop=this;}else if(lvl>10)return;
	lvl++;
	var oThis=(o2?o2:this);
	for (var i in o){
		if(i=='implementsFunc')continue;
		if(i=='parent'||i=='bsk'){oThis[i]=oTop;continue;}
		if(typeof(o[i])=='object'&&o[i])
			if(o[i]&&!isNaN(o[i].length)){oThis[i]=[];bskMerge(o[i],lvl,oThis[i],oTop);}
			else if(oThis[i]&&(oThis[i].gid||o[i].gid)){
				for(var oi in o[i]._arr){
					if(oi=='implementsFunc')continue;
					if(!oThis[i].getById(o[i]._arr[oi].id)){
						var oNew=oThis[i].empty();
						bskMerge(o[i]._arr[oi],lvl,oNew,oTop);
						oThis[i].add(oNew);
					}
					if(oThis[i]._arr[oi].gid=='item')oThis[i]._arr[oi].parent=oTop;
				}
			}
			else if(i=='fbsk'||i=='tax'){
				for(var oo in o[i]){
					if(oo=='implementsFunc')continue;
					bskMerge(o[i],lvl,oThis[i],oTop);
				}
			}
			else{oThis[i]=new bskMerge(o[i],lvl,null,oTop);}
		else
			oThis[i]=o[i];
	}
}




function item()
{
	this.options	= new dynObj('options');
	this.init	= itemInit;
	this.isSame	= itemIsSame;
	this.transfer	= itemTx;
	this.sig	= itemSig;
	this.code	= itemCode;

	this.getItemNo = itemGetItemNo;
	this.xcode	= itemXCode;
	this.updQnty	= itemUQnty;
	this.addOpt	= itemAddOpt;
	this.weight	= itemWeight;
	this.shipMth	= itemShipMth;
	this.calc	= itemCalc;

	return this;
}

function itemInit(prt,id,doc,qnty,price,title,weight,itemNo,useDec,esd,taxes,prdc,imgsrc,temp)
{
	var loc='',img='';
	if(doc){
		if (doc.gid=='item'){
			var o=doc;
			title=o.title;if(!weight)weight=o.weight;itemNo=o.itemNo;
			useDec=o.useDec;esd=o.esd;taxes=o.taxes;loc=o.purl;img=o.pimg;
		}else{
			loc=tf.wm.url(escape(doc.location.toString()));
			if(!imgsrc){i=doc.getElementById('I'+id);img=i?tf.wm.url(i.src):'';}
			else img=imgsrc;
		}
	}

	this.parent	= prt;
	this.id		= id;
	this.useDec	= useDec;
	this.title	= title;
	this.itemNo	= itemNo;
	this.esd	= esd;
	this.purl	= loc;
	this.pimg	= img;
	this.prdc	= prdc;
	this.quantity=0;
	this._wght=0;

	this.cache	= [];
	this.price	= parseFloat(price);
	this.taxes	= taxes;
	this.updQnty(qnty);
	this.weight(weight);
	this.handlingcosts=[];
	

}

function itemGetItemNo(){
	var s=this.itemNo;

	return s;
}

function itemTx(obj,dcp)
{
	if (!dcp) {obj.quantity += this.quantity;if(typeof(nfmt)=='object'){obj.quantity=nfmt.round(obj.quantity);}return obj.quantity;}
	obj.code(this.code());
}

function itemIsSame(obj)
{
	if (obj.id != this.id) return 0;
	var myOpt = this.options;
	var yrOpt = obj.options;
	if (myOpt.cnt() != yrOpt.cnt()) return 0;
	for (var i=0; i<myOpt.cnt(); i++) {
		var opt = yrOpt.get(i);
		if (opt == '' || myOpt.get(i).choice() != opt.choice()) return 0;
	}
	return 1;
}

var _iArr=['id','quantity','title','price','_wght','itemNo','taxes','esd','useDec','purl','pimg'];

function itemCode(prt,str)
{
	if (prt) this.parent=prt;
	return ckCodeStr(this, _iArr, '|', str);
}

function itemSig()
{
	var p=tf.wm.pProp(this.id);
	if (!p) return '';
	p[9]=p[9].replace('%%P','');
	var op = new Array();
	for (var i in p['opt']) op[op.length]=p['opt'][i].join('~');
	var ret=p.join('~') + ((op.length)?'/'+op.join('/'):'') + '/' + p['sig'];
	if (!isNaN(p[9])) p[9]+='%%P';
	return ret;
}


function itemXCode(str)
{
	var s = '';
	if (str==null||str=='') {
		for (var i=0; i<this.options.cnt(); i++) {
			s += (i==0)?'':';';
			s += this.options.get(i).code();
		}
	} else {
		var arr = split(str, ';');
		for (var i=0; i<arr.length; i++) {
			var opt = this.options.empty();
			opt.code(arr[i]);
			this.options.add(opt);
		}
	}
	return s;
}

function itemUQnty(qnty)
{
	this.quantity = (this.useDec>0)?parseFloat(qnty):parseInt(qnty);
}

function itemAddOpt(allOpts, doc)
{
	var opts = this.options;

	var _f=doc.productForm;
	if (!_f) {
		_f=doc.options;
		for (var i=0; i<_f.cnt(); i++) {
			var o = opts.empty();
			o.code(_f.get(i).code());
			opts.add(o);
		}
		return '';
	}

	var len=(allOpts)?allOpts.length:0;
	var form=new iForm(_f);
	for (var i=0; i<len; i++) {
		var arr = allOpts[i];
		if (arr[0].substr(0,this.id.length)!=this.id||arr[0].substr(this.id.length,1)!='O') continue;
		var o = opts.empty();
		o.init(arr, form.getValue(arr[1]));
		opts.add(o);
	}
	var str  = '';
	var warn = 0;
	for (var i=0; i<opts.cnt();i++) {
		var s = opts.get(i).check();
		if (!s) continue;
		if (s==' ') warn=1; else str+=s+'\n';
	}

	if (str != '') return str;
	if (warn) return ' ';
	return '';
}

function itemWeight(w)
{
	if (w!=null) this._wght = parseFloat(w);
	else w=this._wght;
	if (isNaN(w)) w=0;

	for (var i=0,o=this.options; i<o.cnt(); i++) w += o.get(i).weight();
	return w;
}


function itemCalc(type,shMeth,islocal,nocache)
{
	if (!type) type='pur';
	var qty=this.quantity;
	if (!nocache&&this.cache[type+qty.toString()]) return this.cache[type+qty.toString()];
	var prt= this.parent;
	var sd = prt.shDisc();
	
	var dsc= prt.disc.get(this.id);
	var gdsc=(getCookStr('ResellerID')!='')?prt.gdisc.get(this.prdc):null;
	if (!gdsc&&(getCookStr('ResellerID')!='')) gdsc=prt.gdisc.get('ALL_OTHERS');
	var tax= prt.tax;
	var prc= 0;

	switch (type) {
	case 'pdamt':
		prc=0;
		if(true)prc=dsc.amount(this.price,qty,this.calc('opt',shMeth,islocal,nocache));
		if(gdsc)prc=prc+gdsc.amount(this.price-prc,qty,this.calc('opt',shMeth,islocal,nocache));
		break;
	case 'damt':
		var all = this.parent.items;
		for (var i=0; i<all.cnt(); i++) {
			var itm = all.get(i);
			if (itm==this) continue;
			prc += (itm.calc('snd',shMeth,islocal,nocache)-itm.calc('pdamt',shMeth,islocal,nocache))*itm.quantity;
		}
		var iprc = this.calc('snd',shMeth,islocal,nocache) - this.calc('pdamt',shMeth,islocal,nocache);
		prc += qty?iprc*qty:iprc;
		prc  = sd.amount(iprc,prc,0) + this.calc('pdamt',shMeth,islocal,nocache);
		break;
	case 'opt': for(var i=0,o=this.options;i<o.cnt();i++)prc+=o.get(i).price();break;
	case 'snd': prc=this.price+this.calc('opt',shMeth,islocal,nocache);break;
	case 'sdc': prc=this.calc('snd',shMeth,islocal,nocache)-this.calc('damt',shMeth,islocal,nocache);break;
	case 'ndc': prc=(this.price+this.calc('opt',shMeth,islocal,nocache))*qty;break;
	case 'dsc': prc=this.calc('sdc',shMeth,islocal,nocache)*qty;break;
	case 'tax': prc=tax.allAmt(this.taxes,this.calc('dsc'));break;
	case 'pur': prc=tax.calcTax(this.taxes,this.calc('dsc',shMeth,islocal,nocache));break;
	case 'exc': prc=tax.exTax(this.taxes,this.calc('dsc',shMeth,islocal,nocache)); break;
	case 'inc': prc=tax.calcTax(this.taxes,this.calc('dsc',shMeth,islocal,nocache)); break;
	case 'hcp': prc=(isLocal)?this.handlingcosts[shMeth][3]:handlingcosts[shMeth][4]; break;
	}
	
	if (!nocache) this.cache[type+qty.toString()]=prc;
/*	switch (type) {
		case 'pdamt':
		case 'damt': return parseFloat(prc);
		default: return nfmt.round(prc, null, '');
	}*/
	return parseFloat(prc)
}

function itemShipMth(mid, cde)
{
	var ps  = new Array();
	var sh  = this.parent.ship.get(this.id);
	var val = sh?sh.val():'';
	if (!val) return mid?0:ps;

	val = val.split(';');
	for (v in val) {
		var e = val[v].split(',');
		if (!mid) ps[e[0]] = e[1];
		else if (mid==e[0]) return e[cde]?parseFloat(e[cde])*this.quantity:0;
	}
	return mid?0:ps;
}

var Basket=new basket();
Basket.shDisc('1','0.000','');
var theBsk=Basket;



if(this.create_iframe)create_iframe();
var nfmt=new numeric('.','');
var Basket=new basket();
var theBsk=Basket;
var Favorite=new basket('Favorite');


tf.coreLoaded=true;
try{tf.content.core=this.window;}catch(e){}
tf.core=core=this.window;


function regPrc(arr)
{
	function h2a(s) {
		var ret = ''
		var len = s.length;
		for (var i=0; i<len-32; i+=2) ret += unescape('%'+s.charAt(i)+s.charAt(i+1));
		ret += s.substring(len-32,len);
		var arr = ret.split('/')
		for (var i=0; i<arr.length; i++){arr[i]=arr[i].replace('&#47;','/');}
		return arr;
	}

	var ret = 1;
	for (var i=0; i<arr.length; i++) {
		var sr = h2a(arr[i]);
		var prop=sr[0].split('~');
		
		
		
		if (tf.wm.pProp(prop[0])) {
			ret = 0;
			continue;
		}
		var op=new Array();
		for (var j=1; j<sr.length-1; j++) {
			var tmp = sr[j].split('~');
			
			op[op.length] = tmp;
		}
		prop['sig'] = sr[sr.length-1];
		prop['opt'] = op;
		if (!isNaN(prop[9])) prop[9]+='%%P';

		tf.wm.pProp(prop[0], prop);
	}
	return ret;
}

var sh_dobj;
if (this.discount) {
	sh_dobj = new discount();
	gd_obj = new discount();
	sh_dobj.init('1','0.000','');
}

function getDscAmt(id, prc)
{
var p=tf.wm.pProp(id);
var amt=0;
var dsc_obj = new discount();
if (!p || !dsc_obj) return '';
if (true) {
dsc_obj.init(p[5], p[6], p[7]);
amt += dsc_obj.amount(prc, 1, 0);
if(sh_dobj.type!=6)amt += sh_dobj.amount(p[1]-amt, p[1]-amt, 0, 1);
}
if ((getCookStr('ResellerID')!='')) {
var Basket=core.Basket;
var gdsc=Basket.gdisc.get(p[9]);
if (!gdsc) gdsc=Basket.gdisc.get('ALL_OTHERS');
if (gdsc) amt+=gdsc.amount(parseFloat(prc)-amt, 1, 0);
}
return amt;
}

function getPrc(id, sid, dsc)
{
	var p=tf.wm.pProp(id);
	if (p==null) return '';
	var prc = p[1];
	if (sid) { for (var i in p['opt']) { if (p['opt'][i][0] == sid) { prc = p['opt'][i]; break; } } }
	if (!dsc||sid) return prc;

	return prc-getDscAmt(id, prc);
}

function getOPrc(id, sid, od)
{
	
	if (id.indexOf('O')>-1) id=id.substr(0,id.indexOf('O'));
	var op=getPrc(id,sid);
	return (op==null)?0:op[od*2+2];
}

function dPrc(prc, ifscurr,dispZero)
{
	var scurr='';
	if (!ifscurr&&tf.secondCurrency) scurr=' ('+getSCurr(prc)+')';
	return (prc==''&&!dispZero)?'':nfmt.display(prc*tf.currentCurrency.multiplier/tf.shopCurrency.multiplier, tf.currentCurrency.decimal_places,tf.currentCurrency.abbrev)+scurr;
}

function getSCurr(prc){
var scCurr=tf.secondCurrency;
return (scCurr)?nfmt.display(prc*scCurr.multiplier/tf.shopCurrency.multiplier,scCurr.decimal_places,scCurr.abbrev):'';
}


function CSS(doc)
{
	this.get  = cssGet;
	this.init = cssInit;
	this.init(doc);
}

function cssInit(doc)
{

	function docSS(arr,doc) {
		var ds=doc.styleSheets;
		if (ds&&ds.length>0&&ds[0].imports&&ds[0].imports.length>0){
			ds=ds[0].imports[0];
			for(var j=0,rl=ds.rules;rl&&j<rl.length;j++){
				var tag=rl[j].selectorText.toLowerCase();
				arr[tag]=rl[j].style.cssText;
			}
		}
		else ds=null;
		return ds;
	}
	function defSS(arr,doc) {}

	if (!doc) doc=document;
	this._css = new Array();
	if (!docSS(this._css, doc)) defSS(this._css,doc);

}

function cssGet(name,type)
{
	switch(type){
		case 1: name='.'+name;break;
	}
	return this._css[name];
}






var tsI=new Array();

function pprice(args) {
	var ret=''; var Id=args[0],Price=args[1],pt=args[2],b1=args[3],b2=args[4],b3=args[5];
	
	

	var _prc=getPrc(Id,null);
	
	var _dp=getPrc(Id,null,1);
	if (_prc-_dp>0.001) {
		ret+='<span sf:object="ProductPriceOriginal" class="ProductPriceOriginal" id="ProductPrice-'+Id+'">'+dPrc(_prc,1)+'</span> ';
		ret+='<span sf:object="ProductPriceCalculated" class="GC21 ProductPriceCalculated" id="ProductDiscount-'+Id+'">'+dPrc(_dp,1,true)+'</span>';
	} else ret+=dPrc(_prc,1);
	
	if(!region){setTimeout('tf.utils.populatePrice()',1000);return ret;}
	var a=pt.split(','); pt='';
	if(tf.conf)tf.conf.populateTSI();
	for (var i=0; i<a.length; i++)if (tsI[a[i]]) pt+=','+tsI[a[i]];
	if (pt!='') ret+=' <span class="ProductIncTaxes" sf:object="ProductIncTaxes">('+pt.substr(1)+')</span>';
	return ret;
}

function bprice(args) {
	
	var b1=args[1],b2=args[2],b3=args[3];
	if(b1&&isNaN(b1)||parseFloat(b1)<0.001) return '';
	return ld('LD_BASEPRICE','Base Price')+': <nobr>'+ld('LD_BASEPRICE_RESULT','%% %% = %%',new Array(nfmt.toLoc(b2),b3,dPrc(b1,1)))+'</nobr>';
}

function crFFld(args){
	var t=args[0],n=args[1],id=args[2],r=args[3],c=args[4],oA=args[5],dv=args[6],on=args[7],pid=args[8],maxlen=args[9],right=args[10],combine=args[11],choicesonly=args[12];
	
	tfc=tf.content;
	var first=true,ponB='<div class="GC10 ProductOptionName">',ponE='</div>',pcnB='<div class="GC10 ProductChoiceName">',pcnE='</div>';
	if(choicesonly)pcnB='<div sf:object="ProductChoiceName" id="ProductChoiceName-%%" class="GC10 ProductChoiceName">';
	function _v(v,a,o){return (v?' value="'+[a[1].replace(/\"/g,'&quot;'),getOPrc(a[0],id,o),a[4],a[5],a[6],a[7],a[8]].join(str_sep1)+'"':'');}
	function _p(v,a,o){var op=getOPrc(v,a,o);if(op>0.001)var pf='+';else if(op<-0.001)var pf='-';else return'';return' ('+pf+core.showPrc(Math.abs(op),1)+')';}
	function _ip(n,t,cl,v,a,on,dv) {
		var s='';
		var len=(a)?a.length:0;
		for (var i=0;i<len;i++) {
			var val=(t=='text')?' value="'+a[i][1].replace(/"/g,'&quot;')+'"':_v(v,a[i],i);
			var ch=(dv=='1')?' checked':'';ch=(((dv)?dv:'0')=='1'&&first)?' checked':'';
			if (ch&&t=='radio') first=false;
			var onclick='';
			var btn='<input onclick="cancelBuble();'+onclick+'" type='+t+val+' name="'+n.replace(/"/g,'&quot;')+'" size="'+c+'" maxlength="'+maxlen+'" '+(t=='text'?'':'class=GC8')+' '+cl+ch+'>\n';
			s+=pcnB.replace(/\%\%/,a[i][2]);
			if(!right&&t!='text'){s+=btn;}
			var dp=(t=='radio'||(t=='checkbox'))?_p(a[i][0],id,i):'';
			if (t=='radio') s+='<span>'+a[i][1]+dp+'</span>';else if(t!='text')s+='<span>'+on+dp+'</span>';
			if (t=='text') s+=pcnE;
			if(right||t=='text'){s+=btn;}
			if (t!='text') s+=pcnE;
		}
		return s;
	}
	function _sl(n,r,a,dv,on){
		var s='';
		s+='<select onclick="cancelBuble()" name="'+n.replace(/"/g,'&quot;')+'"';
		s+=' onChange="dBasePrice2(\''+pid+'\',this.value);'+'"';
		s+=' size='+r+'>\n';
		s+='<option value="">'+on+'</option>';
		for (var i=0; i<a.length; i++) {
			var checked='';
			if (i==0&&dv!='0') {
				checked=' selected';
				if(core)setTimeout("tfc.dBasePrice2('"+pid+"','"+(['','','','',a[i][6],a[i][7],a[i][8]].join(str_sep1))+"',tfc)",500);
			}
			s+='<option '+_v(1,a[i],i)+checked+'>'+a[i][1]+_p(a[i][0],id,i)+'</option>\n';
		}
		return s+'</select><br>';
	}

	var rc=(c=='')?'':' cols="'+c+'"';
	rc+=(r=='')?'':' rows="'+r+'"';
	var s='',ponBE=(choicesonly?'':ponB+on+ponE);
	switch(t) {
	case 1:s=ponBE+_ip(n,'text','TextInput',0,oA,on);break;
	case 5:s=ponBE+_ip(n,'radio','RadioButtonIcon',1,oA,on,dv);break;
	case 6:s=_ip(n,'checkbox','CheckBoxIcon',1,oA,on,dv);break;
	case 3:rc='';
	case 4:s=_sl(n,r,oA,dv,on);break;
	case 2:s=ponBE+'<textarea onclick="cancelBuble()" onChange="this.value=this.value.substring(0,'+maxlen+');if(this.value.length>='+maxlen+'){alert(ld(\'LD_MAXLENGTH\',\'\',['+maxlen+']));}" onKeyUp="if(this.value.length>='+maxlen+'){this.blur();}" name="'+n.replace(/"/g,'&quot;')+'" '+rc+'>'+oA[0][1]+'</textarea>';break;
	}
	return s;
}



function load_add(d,type,id,title,weight,orderNo,useDec,esd,taxes,prd_cd,man_cd,dst_cd,prc_cd,opt,issf,s,minorder,temp) {
	var ret=false;
	if (!isNaN(prd_cd)) prd_cd+='%%P';
	var qnty;
	qnty=tf.content.document.getElementById(id+'_Quantity');
	if (!minorder) minorder=(useDec>0)?'1.00':'1';
	if (useDec<1) minorder=parseInt(minorder);
	var qv='';
	if(qnty){
		qv=nfmt.fromLoc(qnty.value);
		if(isNaN(qv))qnty.value=(useDec?nfmt.toLoc("1.00"):"1");
		else{
			if((useDec>0&&parseFloat(qv)<0.0001)||(useDec<1&&parseInt(qv)<1))qnty.value=nfmt.toLoc(minorder);
			else qnty.value=nfmt.toLoc(qv);
		}
	}
	qnty=qnty?parseFloat(nfmt.fromLoc(qnty.value)):0;
	if (isNaN(qnty) || !qnty) qnty=1;
	if (tf.coreLoaded&&!issf) {
		var bt;bt=core.Basket;
		if (type==1){bt=core.Favorite;bt.save();}
		ret=bt.parse(id,d,qnty,title,weight,orderNo,useDec,esd,taxes,opt,prd_cd,man_cd,dst_cd,prc_cd,null,false,temp);
	} else if (confirm(ld('LD_ENTER_SHOP','To buy this product, your must enter the shop first. Do you want to enter the shop now?'))) {
		location = s+'#'+id.toLowerCase();
	}
	return ret;
}

var nfmt=new numeric('.',''),css=new CSS();

tf.core=this.window;

/*$Revision: 397 $
$HeadURL: svn://3d3-p432/ShopFactory/trunk/bin/Common%20Files/parseLang/sf.js $*/
