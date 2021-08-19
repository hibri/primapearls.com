var d=document;

///////
var b64RevChrs={'A':0,'B':1,'C':2,'D':3,'E':4,'F':5,'G':6,'H':7,'I':8,'J':9,'K':10,'L':11,'M':12,'N':13,'O':14,'P':15,'Q':16,'R':17,'S':18,'T':19,'U':20,'V':21,'W':22,'X':23,'Y':24,'Z':25,'a':26,'b':27,'c':28,'d':29,'e':30,'f':31,'g':32,'h':33,'i':34,'j':35,'k':36,'l':37,'m':38,'n':39,'o':40,'p':41,'q':42,'r':43,'s':44,'t':45,'u':46,'v':47,'w':48,'x':49,'y':50,'z':51,'0':52,'1':53,'2':54,'3':55,'4':56,'5':57,'6':58,'7':59,'8':60,'9':61,'+':62,'/':63};
var b64Str,b64StrLen,b64Cnt;
function readB64Rev(){
	while(true){
		if(b64Cnt>=b64StrLen)return -1;
		var nxtChr=b64Str.charAt(b64Cnt++);
		if(b64RevChrs[nxtChr]){return b64RevChrs[nxtChr];}
		if(nxtChr=='A')return 0;
	}
}
function decodeBase64(str){
	if(!str)return false;
	b64Str=str,b64StrLen=str.length,b64Cnt=0;
	var res='',inBuf=new Array(4),done=false;
	while(!done&&(inBuf[0]=readB64Rev())!=-1&&(inBuf[1]=readB64Rev())!=-1){
		inBuf[2]=readB64Rev(),inBuf[3]=readB64Rev();
		res+=String.fromCharCode(((inBuf[0]<<2)&0xff)|inBuf[1]>>4);
		if(inBuf[2]!=-1){
			res+=String.fromCharCode(((inBuf[1]<<4)&0xff)|inBuf[2]>>2);
			if(inBuf[3]!=-1){res+=String.fromCharCode(((inBuf[2]<<6)&0xff)|inBuf[3]);}
			else{done=true;}
		}else{done=true;}
	}
	return res;
}
///////
function arc4Next(){
	this.ei=(this.ei+1)%0x100;
	this.ej=(this.ej+this.s[this.ei])%0x100;
	var a=this.s[this.ei];this.s[this.ei]=this.s[this.ej];this.s[this.ej]=a;
	return this.s[(this.s[this.ei]+this.s[this.ej])%0x100];
}
function arc4Engine(key){
	this.k=new Array(256);
	this.s=new Array(256);
	this.ei=0;
	this.ej=0;
	this.next=arc4Next;

	var kl=key.length;
	for(var i=0,j=0;i<256;i++){
		this.s[i]=i;
		this.k[i]=key.charCodeAt(j);
		if(++j==kl)j=0;
	}
	for(var i=0,j=0,a=0;i<256;i++){
		j=(j+this.s[i]+this.k[i])%0x100;
		a=this.s[i];this.s[i]=this.s[j];this.s[j]=a;
	}
}
function arc4(ins,key){
	var e=new arc4Engine(key);
	var s='',sl=ins.length,ues='';
	for(var i=0;i<sl;i++){
		ues+=String.fromCharCode(ins.charCodeAt(i)^e.next());
		if(ues.indexOf('\\')!=0){s+=ues;ues='';continue;}
		if(ues.substr(ues.length-1)=='\\'){s+=ues.substr(0,ues.length-1);ues='\\';continue;}
		if(ues.length<6)continue;
		if(ues.match(/\\u([0-9a-f][0-9a-f][0-9a-f][0-9a-f])/i))ues=String.fromCharCode(parseInt(ues.substr(2),16));
		s+=ues;
		ues='';
	}
	return s;
}
///////
function decrypt(s,key){
	var bs=decodeBase64(s),slt=bs.substr(0,2);
	var ds=arc4(bs.substr(2),key.substr(0,54)+slt);
	return (ds.substr(0,7)=='<sfcrc>'?ds.substr(7):"BADKEY");
}

var tfc=null;
var oSec = {
	_NOTLOADED: -1,
	_BADKEY: -2,
	_IGNORED: -3,
	key: '',

	out: function(arr,key){
		var arrLen=arr.length,i=0,s='';
		for(i=0;i<arrLen;i++){
			self.status="Decrypting...";
			s+=decrypt(arr[i],key);
		}
		self.status="Done";
		return s;
	}
}

function sec(a){
	if(a[0]=='sf:sign="Protect"')return '';
	if(!secLoaded)return oSec._NOTLOADED;
	if(!oSec.key)return oSec._BADKEY;
	return oSec.out(a,oSec.key);
}

secLoaded=true;