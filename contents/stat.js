var browserlang=(navigator.language)?navigator.language:navigator.userLanguage;

function stat_slashit(s) {
var re=/\\/g;
var relmd=/lmd=\d+\.\d+/;
return s.replace(re,'/').replace(relmd,'').replace(/\?$/,'');
}


var del1=',',del2='|',del3='\n - ',del4='#';
function stat_vis(){
this.enter=new stat_entering(this);
this.exit=new stat_leaving(this);
this.send=stat_vis_send;
this.out=stat_vis_out;
this.regFile=stat_vis_regFile;
this.actions=new stat_action(this);
this.timediff=0;
this.basedate=stat_getEpoch(new Date());
this.files=new Array();
this.filecount=0;
this.pagecount=0;
}

function stat_vis_regFile(file) {
if(!this.files[file]){this.files[file]=++this.filecount;return this.filecount; } else return this.files[file];
}


function stat_ordering() {
this.log=stat_order_log;
this.out=stat_order_out;
}

function stat_order_log() {
var core=extra.core,bsk=core.Basket;
this.sum=bsk.chk_total;
}

function stat_order_out(){
return Math.round(this.sum*100)/100;
}

function stat_vis_out() {
//alert(this.actions.out());
var msg = "";
msg += "<?xml version=\"1.0\" ?>\n";
msg += "<vis>\n";
msg += "<log>"+this.actions.out()+"</log>\n";
msg+="<files>\n";
for (var i in this.files) {
msg+=i+del1+this.files[i]+del3;
}
msg+="</files>\n";
msg += "</vis>\n";
this.send(msg);
}

function stat_vis_send(msg) {
if(extra.stat&&extra.stat.stat){extra.stat.stat.raw.value=msg;
extra.stat.stat.submit();}
}

function stat_entering(p){
this.objtype=1;
this.parent=p;
this.log=stat_enter_log;
this.out=stat_enter_out;
this.updategmt=stat_vis_updategmt;
}

function stat_vis_updategmt(){
if(gmtTime==0){setTimeout('vis.enter.updategmt()',200); return;}
this.gtmtime=gmtTime;
savCookStr('lastseen',gmtTime,-1);
this.parent.timediff=gmtTime-stat_getEpoch(new Date());
}

function stat_getEpoch(date) {
return Math.round(date.getTime()/1000);
}

function stat_enter_log() {
this.referrer=document.referrer;
this.browserlang=browserlang;
this.url=stat_slashit(location.protocol+'//'+location.hostname+wm.baseurl);
this.res=screen.width+'x'+screen.height;
this.aid=aid;
//this.id=;
this.lastseen=getCookStr('lastseen');
var tmp=getCookStr('wasseen');
this.wasseen=(!tmp||isNaN(tmp))?0:parseInt(tmp);
savCookStr('wasseen',this.wasseen+1,-1);
this.depth=screen.colorDepth;
this.sessid=wm._rnd;
this.updategmt();
}

function stat_enter_out() {
var ret='';
ret+=this.gtmtime+del1;
ret+=this.browserlang+del1;
ret+=this.res+del1;
ret+=this.depth+del1;
ret+=this.referrer+del1;
ret+=this.url+del1;
ret+=this.lastseen+del1;
ret+=this.wasseen+del1;
ret+=this.sessid+del1;
ret+=this.aid;
return ret;
}

function stat_leaving(){
this.objtype=2;
this.log=stat_exit_log;
this.out=stat_exit_out;
}

function stat_exit_log(){
var min=Number.MAX_VALUE,max=0,avg=0,sumqty=0;
var core=extra.core,bsk=core.Basket,ship=wm.get('shipping');
this.basketcount=bsk.items.cnt();
this.products='';

if (this.basketcount>0){
	var it=new core.Iterator(bsk.items),itm=it.start();
	while (itm!=null){
		this.products+=itm.title+del4+itm.quantity+del4;
		sumqty+=itm.quantity;
		if(itm.quantity>max)max=itm.quantity;
		if(itm.quantity<min)min=itm.quantity;
		itm=it.next();
	}
	avg=parseInt(sumqty/this.basketcount);
} else min=0;

this.qtymax=max;
this.qtymin=min;
this.qtyavg=avg;
this.region=core.region;
this.method=(core.method)?ship.ship.method.get(core.method).val():'';
this.currency=currentCurrency.iso;
this.lang=lang;
this.reseller=getCookStr('ResellerID');
this.ismember=ismember;
}

function stat_exit_out(){
var ret='';
ret+=this.products+del1;
ret+=this.basketcount+del1;
ret+=this.qtymax+del1;
ret+=this.qtymin+del1;
ret+=this.qtyavg+del1;
ret+=this.region+del1;
ret+=this.method+del1;
ret+=this.currency+del1;
ret+=this.lang+del1;
ret+=this.reseller+del1;
ret+=this.ismember;
return ret;
}

function stat_searching() {
this.objtype=3;
this.out=stat_search_out;
this.log=stat_search_log;
}

function stat_search_out() {
return this.phrase+del1+this.results;
}

function stat_search_log(phrase,results) {
this.phrase=phrase;
this.results=parseInt(results);
}



function stat_formatDate(date) {
//return date.getFullYear()+'-'+(parseInt(date.getMonth())+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
return stat_getEpoch(date);
}

function stat_action(p) {
this.parent=p;
this.log=stat_act_log;
this.out=stat_act_out;
this.actions=new Array();
}

function stat_act_log(type,name,obj){
if (name.indexOf('button.html')!=-1||name.indexOf('toc.html')!=-1) return;
if (type==1) this.parent.pagecount++;
if(!obj)obj=null;
name=stat_slashit(name);
name=name.replace(this.parent.enter.url,'');
var pageid=this.parent.regFile(name);
var time=stat_getEpoch(new Date())-this.parent.basedate;
this.actions[this.actions.length]=new Array(type+del1+pageid+del1+time,obj);
}

function stat_act_out() {
var ret='';
for(var i=0;i<this.actions.length;i++){
ret+=this.actions[i][0];
if(this.actions[i][1])ret+=del2+this.actions[i][1].out()+del2;
if(i!=this.actions.length)ret+=del3;
}
return ret;
}

var vis=new stat_vis();
vis.enter.log();
vis.actions.log(0,'../'+wm.jfile(location.href),vis.enter);
//alert(vis.actions.out());


// $Revision: 9 $
// $Archive: /ShopFactory_V6/Common Files/parseLang/stat.js $ 