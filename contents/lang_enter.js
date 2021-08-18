
if(lang=='en-us'){
LD_PRODUCT_CLICKHERE="More details...";
LD_PICK_CURRENCY="Select your currency";
}

var currencies=[];
function currency(i,a,m,d,s){
	this.iso=i;
	
	this.abbrev=a;
	this.multiplier=m;
	this.decimal_places=d;
	this.sign=s;
	this.getSignedID=function(){return this.iso+'/'+this.sign;}
}
var shopCurrency=currentCurrency=new currency("GBP","£",1.0,2,'ADE82089D0F8767025C534B636AFA75E');



var secondCurrency=null;



document.title='';

var langEnterLoaded=true;

// $Revision: 4 $
// $Archive: /ShopFactory_V6/Common Files/parseLang/lang_enter.js $ 