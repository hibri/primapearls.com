function embIE(d){
if(!document.all||window.opera)return;
function emb(s){var a=d.getElementsByTagName(s);for(var i=0;i<a.length;i++){a[i].outerHTML=a[i].outerHTML;}}
var d=d?d:parent.tf.content.document,a=d.getElementsByTagName('OBJECT');
for(var i=a.length-1;i>=0;i--){var fv=a[i].innerHTML,s='flashvars="',n=fv.indexOf(s);
if(n!=-1){fv=fv.substr(n+s.length);fv=fv.substr(0,fv.indexOf('"'));}
a[i].outerHTML=a[i].outerHTML.replace(/(<PARAM NAME="FlashVars" VALUE=")(">)/,'$1'+fv+'$2');
}
emb('EMBED');emb('APPLET');
}