var d;

function ms_on(id,or,w,h,oldw,oldh,el){
function getbtn(id,dir,oldn,n){var imgprefix=(tf==tf.content?'contents':'..');return '<span id="ms_'+dir+'" onMouseDown="tf.utils.ms_set('+oldn+','+n+',6,20);" onMouseUp="tf.utils.ms_set('+oldn+','+n+',3,20);" onMouseover="tf.utils.ms_set('+oldn+','+n+');tf.utils.ms_'+dir+'(\''+id+'\')" onMouseout="tf.utils.ms_stop(\''+dir+'\')"><img src="'+imgprefix+'/media/mscr_'+dir+'.png" width="16" height="16" style="margin-'+(dir=='lt'||dir=='rt'?'left:2px':'top:2px')+';line-height:16px;"></span>';}
if(or=='h'){
	var btnPrev=getbtn(id,'lt',oldw,w),btnNext=getbtn(id,'rt',oldw,w);
	el.innerHTML='<table border=0 cellpadding=0 cellspacing=0 width='+w+'"><tr><td valign=middle><div style="position:relative;width:'+(w-36)+'px;line-height:'+h+';overflow:hidden"><div id="ms_'+id+'" style="position:relative;left:0;width:'+(oldw+128)+'px;">'
	+el.innerHTML+'</div></div></td><td valign=middle>'+btnPrev+btnNext+'</td></tr></table>';
}
else{
	var btnPrev=getbtn(id,'up',oldh,h),btnNext=getbtn(id,'dn',oldh,h);
	el.innerHTML='<div style="height:'+h+';"><div style="position:relative;height:'+(h-18)+'px;overflow:hidden"><div id="ms_'+id+'" style="position:relative;top:0;height:'+(oldh+oldh-h)+'px;">'
	+el.innerHTML+'</div></div><div style="text-align:center;white-space:nowrap;">'+btnPrev+'&nbsp;'+btnNext+'</div></div>';
}}

function ms(id,w,h,dd) {
	var tfc=tf.content,d=tfc.document,or='h',oldw,oldh,el=null,ret=false;
	if(typeof(id)!='undefined')el=d.getElementById(id);
	if(el&&tf.utils.pngIE){
		if(!isNaN(w)&&w>0)or='h';if(!isNaN(h)&&h>0)or='v';
		var el2=el.childNodes;
		if(dd){for(var n=0;n<el2.length;n++){if(el2[n].nodeName!='SCRIPT'&&el2[n].nodeType==1){el2=el2[n];break;}}}else{el2=el;}
		oldw=el2.scrollWidth;oldh=el2.scrollHeight;
		el.style.visibility='visible';
		if((oldw>w&&w>0)||(oldh>h&&h>0)){ms_done=1;ms_on(id,or,w,h,oldw,oldh,el);tf.utils.pngIE();}
		if(typeof(ms_done)=='undefined')ms_done=1;else ms_done++;
		ret=true;
	}
	else{setTimeout('ms("'+id+'",'+w+','+h+','+dd+')',100);}
	return ret;
}
