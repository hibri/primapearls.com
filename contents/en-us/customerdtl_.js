
var tf=parent.tf,core;
//<!--BEGIN_C78E91C8-61BA-447e-B459-F6FE529C7724-->
var LMD='39404.861111';
//<!--END_C78E91C8-61BA-447e-B459-F6FE529C7724-->
function chk(p){
	core=tf.core
	if(core&&tf.utils){
		if(p.length==0) return;
		if(core.regPrc)core.regPrc(p);
		if(parent.endload){parent.endload('en-us/customerdtl.html'.replace(/(_\d\d)?\.html/,'_$1'));}
		
	}
	else{setTimeout('chk(_prc)',100);}
}
if(this.name==''||this.name=='price'||this.name=='dynLoad'||tf.content.isInSF()){
	
	var _prc=''.split(',');
	chk(_prc);
}
if(this.name=='price'){checkpagedate();}
function checkpagedate(){
var p=tf.content;
if(p&&typeof(p.LMD)=='string'&&p.LMD!=''&&'customerdtl_.js'.replace(/(_|\.js)/g,'')==tf.wm.jfile(p.location.href).replace(/(_|\.html)/g,'')){
	if(LMD!=p.LMD)p.location.replace(tf.wm.url('customerdtl.html',LMD,1));
}else setTimeout("checkpagedate()",200);
}
var loaded=true;

