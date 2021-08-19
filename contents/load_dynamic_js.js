
// <script>

var _fUrl = 'dynamic.html';
var _pgLd = new Array()
var _fnArr= new Array()
var _arArr= new Array()
function create_iframe(doc)
{
	_fUrl = tf.wm.url(_fUrl);
	var str = '<div style="visibility:hidden">' +
		  '<iframe name=dynLoad frameborder=0 marginheight=0 marginwidth=0 id=dynLoad width=1 height=0 src="'+_fUrl+'"></iframe>' +
		  '</div>';
	if (!doc) doc = document;
	doc.write(str);
}

// Function to create script string
function create_script(doc, durl)
{
	if (!doc) doc = document;
	for (var i in _pgLd) {
		if (_pgLd[i]>1) continue;
		doc.write('<s'+'cript src="'+i+'.js"></s'+'cript>');
		_pgLd[i] = 1;
	}
	if (durl) _fUrl = durl;
}

function set_load(url, fn, args, frl)
{
	if (_pgLd[url] && !frl) return;
	_pgLd[url]  = 0;
	_fnArr[url] = fn
	_arArr[url] = args
}

function load_page(url, fn, arg, frl)
{

	var ts = (typeof(url)=='string');
	if (ts) set_load(url, fn, arg, frl)
	else for (var i in url) set_load(url[i], fn, arg, frl);

	document.getElementById('dynLoad').src = _fUrl+'?rnd='+Math.random();
}

function endload(url)
{
	if (!_pgLd[url]) return;
	_pgLd[url] = 2;
	var fn = _fnArr[url];
	if (fn) {
		if (typeof(fn)=='string') fn = eval(fn);
		fn(_arArr[url]);
	}
}



// </script>


/*$Revision: 157 $
$Archive: /ShopFactory_V6/Common Files/parseLang/load_dynamic_js.js $ */
