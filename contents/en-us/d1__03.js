
var tf=parent.tf,core;
//<!--BEGIN_C78E91C8-61BA-447e-B459-F6FE529C7724-->
var LMD='39404.687500';
//<!--END_C78E91C8-61BA-447e-B459-F6FE529C7724-->
function chk(p){
	core=tf.core
	if(core&&tf.utils){
		if(p.length==0) return;
		if(core.regPrc)core.regPrc(p);
		if(parent.endload){parent.endload('en-us/d1_03.html'.replace(/(_\d\d)?\.html/,'_$1'));}
		tf.utils.populatedata();
	}
	else{setTimeout('chk(_prc)',100);}
}
if(this.name==''||this.name=='price'||this.name=='dynLoad'||tf.content.isInSF()){
	
	var _prc=',5033337e312e3030303030307e302e3030307e302e3030307e302e3030307e307e302e3030307e7e534d312c312c302e30302c302e30303b534d322c312c302e30302c302e30303b534d332c312c302e30302c302e30303b7e7e302e3030302f7DDEBF5E678DC8B87F75FDC608D95205,5036317e302e3030303030307e302e3030307e302e3030307e302e3030307e307e302e3030307e7e7e7e302e3030302f6F1F3692660DA561009B63E043AED2E9'.split(',');
	chk(_prc);
}
if(this.name=='price'){checkpagedate();}
function checkpagedate(){
var p=tf.content;
if(p&&typeof(p.LMD)=='string'&&p.LMD!=''&&'d1__03.js'.replace(/(_|\.js)/g,'')==tf.wm.jfile(p.location.href).replace(/(_|\.html)/g,'')){
	if(LMD!=p.LMD)p.location.replace(tf.wm.url('d1_03.html',LMD,1));
}else setTimeout("checkpagedate()",200);
}
var loaded=true;

