var clickfrogru_ref_host='';
	
function c8_remarketing_init(a,h,r,s,b,p,ca,co)
{
	iD=document;iS='http://c8.net.ua/ref.php?'+a+'&'+h+'&'+r+'&'+s+'&'+b+'&'+p+'&'+ca+'&'+co+'&&&&';
	iT=iD.referrer.slice(7);iH=window.location.href.slice(7);
	((iI=iT.indexOf('/'))!=-1)?(iT=iT.substring(0,iI)):(iI=iT.length);
	iS+='&';
	if(iT!=iH.substring(0,iI))iS+=escape(iD.referrer.slice(7));
	iS+='&'+escape(iH);
	iS+='&rnd'+Math.random();
	//iD.write('<img src="'+iS+'" border="0" width="0" height="0" />');

	var i=new Image();
	i.src=iS;

var iR = new Image();
iR.src=('https:' == document.location.protocol ? 'https://' : 'http://') +"googleads.g.doubleclick.net/pagead/viewthroughconversion/978744996/?value=0&guid=ON&script=0";

}

function c8_remarketing_init_code(a,h,r,s,b,p,ca,co)
{
        var i=new Image();
        i.src=('https:' == document.location.protocol ? 'https://' : 'http://') +"e.c8.net.ua/ref.php?rem_code="+escape(co);

        var iR = new Image();
        iR.src=('https:' == document.location.protocol ? 'https://' : 'http://') +"googleads.g.doubleclick.net/pagead/viewthroughconversion/978744996/?value=0&guid=ON&script=0";

}

function c8_remarketing_send()
{
	if(c8_track_object.action=="view" && c8_remarketing_token=="ua-23-fg5s93h00d" && typeof(owaParams)!="undefined"){
                c8_track_object.order_articles=owaParams.order_articles;

        }
        if(c8_track_object.action=="product" && c8_remarketing_token=="ua-23-fg5s93h00d" && typeof(product.identifier)!="undefined"){
                c8_track_object.identifier_orig=product.identifier;
        }


	var obj = c8_track_object;
	obj.c8_remarketing_token = c8_remarketing_token;
	obj.referrer=document.referrer;
	//jQuery.post("http://r.c8.net.ua/ref.php?"+Math.random(), { post: encodeURIComponent(JSON.stringify(obj))});
	//
	
	c8_stringify = function (obj) {
		var t = typeof (obj);
		if (t != "object" || obj === null) {
			// simple data type
			if (t == "string") obj = '"'+obj+'"';
			return String(obj);
		}
		else {
			// recurse array or object
			var n, v, json = [], arr = (obj && obj.constructor == Array);
			for (n in obj) {
				v = obj[n]; t = typeof(v);
                                if (n == 'description') {
                                    v = v.replace('"', '\'');
                                    //console.log(v);
                                }
                                
				if (t == "function") continue;
				if (t == "string") v = '"'+v+'"';
				else if (t == "object" && v !== null) v = c8_stringify(v);
				json.push((arr ? "" : '"' + n + '":') + String(v));
			}
			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		}
	};
	
	/*
	var xmlHttpReq = false;

	// Mozilla/Safari
	if (window.XMLHttpRequest) {
	    xmlHttpReq = new XMLHttpRequest();
	}
	// IE
	else if (window.ActiveXObject) {
	    xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	}

	QueryString="post="+encodeURIComponent(c8_stringify(obj));
	
	if (xmlHttpReq)
	{
		xmlHttpReq.open("POST", 'http://r3.c8.net.ua/ref.php?r='+Math.random(), true);
		xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		xmlHttpReq.setRequestHeader("Content-length", QueryString.length);
		xmlHttpReq.send(QueryString);
	};*/
	var i = new Image();
	i.src=('https:' == document.location.protocol ? 'https://' : 'http://') +"r5.c8.net.ua/ref.php?post="+encodeURIComponent(c8_stringify(obj))+"&r="+Math.random();
	
	var iR = new Image();
	var google_conversion_label = "";
	
	if ("ua-25-ghfg50yf9s"==c8_remarketing_token)
	{
		var google_conversion_label = "Lr_qCPSI3wcQpO3Z0gM";
	}
	else if ("ua-12-256d83ae90"==c8_remarketing_token)
	{
		var google_conversion_label = "8BwECOSK3wcQpO3Z0gM";
	}
	else if ("ua-5-e4da3b7fbb"==c8_remarketing_token)
	{
		var google_conversion_label = "YyWwCPyH3wcQpO3Z0gM";
	}
	else if ("ua-8-c9f0f895fb"==c8_remarketing_token)
	{
		var google_conversion_label = "gkUCCISH3wcQpO3Z0gM";
	}
	else if ("ua-19-175255197a"==c8_remarketing_token)
	{
		var google_conversion_label = "9ZGKCOyJ3wcQpO3Z0gM";
	};
	
	iR.src=('https:' == document.location.protocol ? 'https://' : 'http://') +"googleads.g.doubleclick.net/pagead/viewthroughconversion/978744996/?value=0&amp;label="+google_conversion_label+"&amp;guid=ON&amp;script=0";

	//-------
	//Addon for google conversion on successfull purchase. Added by Belotelov
	//-------
	if (obj.action=='release') {
	var iR2 = new Image();
	var google_conversion_label_2 = "";
	    if ("ua-27-hjuerf5d6k"==c8_remarketing_token) {
		google_conversion_label_2 = "vFpbCJyb-wkQpO3Z0gM";
	    } else 
	    if ("ua-8-c9f0f895fb"==c8_remarketing_token) {
		google_conversion_label_2 = "26goCJSc-wkQpO3Z0gM";
	    }
	iR2.src=('https:' == document.location.protocol ? 'https://' : 'http://') +"www.googleadservices.com/pagead/conversion/978744996/?label="+google_conversion_label_2+"&amp;guid=ON&amp;script=0";
	}
	
	if ("ua-23-fg5s93h00d"==c8_remarketing_token)
	{
		var iR3 = new Image();
		
		if ('release'==obj.action) {
			iR3.src='https://ad.doubleclick.net/ddm/activity/src=5170604;type=sales;cat=n55ygsen;qty=[Quantity];cost=[Revenue];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=[OrderID]?';
		};
		
		if ('product'==obj.action) {
			iR3.src='https://ad.doubleclick.net/ddm/activity/src=5170604;type=sales;cat=lxdfrvrh;qty=[Quantity];cost=[Revenue];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=[OrderID]?';
		};
		
		if ('view'==obj.action) {
			iR3.src='https://ad.doubleclick.net/ddm/activity/src=5170604;type=sales;cat=auazl938;qty=[Quantity];cost=[Revenue];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=[OrderID]?';
		};
		
		if ('basket'==obj.action) {
			iR3.src='https://ad.doubleclick.net/ddm/activity/src=5170604;type=sales;cat=u2iodibx;qty=[Quantity];cost=[Revenue];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=[OrderID]?';
		};
	};
	//----end of Addon
	
	//
	
	/*var google_conversion_id = 978744996;
	var google_custom_params = window.google_tag_params;
	var google_remarketing_only = true;
	
	var p=document.getElementsByTagName('head')[0];
	var s=document.createElement("script");
	s.type="text/javascript";
	s.src="//www.googleadservices.com/pagead/conversion.js";
	s.async = false;
	p.appendChild(s);*/

	if (""!=document.referrer)
	{
		clickfrogru_ref_host=document.referrer.split('/')[2];
	};
	
	var click_frog_code_js="";
	if ("ua-8-c9f0f895fb"==c8_remarketing_token)
	{
		click_frog_code_js="var div = document.createElement('div'); div.id='clickfrog_counter_container'; div.setAttribute('id', 'clickfrog_counter_container');div.setAttribute('style', 'width:0px;height:0px;overflow:hidden;');document.body.appendChild(div); (function(d, w) {var clickfrog = function() {if(!d.getElementById('clickfrog_js_container')) {var sc = document.createElement('script');sc.type = 'text/javascript';sc.async = true;sc.src = \'//stat.clickfrog.ru/c_c8.js?r=\'+Math.random();sc.id = 'clickfrog_js_container';var c = document.getElementById('clickfrog_counter_container');c.parentNode.insertBefore(sc, c);}};if(w.opera == \'[object Opera]\'){d.addEventListener(\'DOMContentLoaded\',clickfrog,false);}else {clickfrog();}})(document, window);var clickfrogru_uidh='07f015672d10758ac882609c7b350bc9';"
	};
	
	//var isInIFrame = (window.location != window.parent.location);
	if (click_frog_code_js)
	{
		(function() {eval(click_frog_code_js);})();
	};
}

function c8_remarketing_track(obj)
{
	var url='';
	
	if ("undefined"==typeof c8_remarketing_token)
	{
		return;
	};
	if (""==c8_remarketing_token)
	{
		return;
	};

	c8_remarketing_send();
	//setTimeout(c8_remarketing_send, 3000);
	return;
}

if ("function"==typeof c8_remarketing_callback)
{
	c8_remarketing_callback();
};

function c8_ref_user_match()
{
	if (1==c8_match_user_already)
		return;
	
	c8_match_user_already=1;
	
	try {
		var src = ('https:' == document.location.protocol ? 'https://' : 'http://') +'r3.c8.net.ua/matchframe.php';
		var txt="void(0);";
		var head = document.getElementsByTagName('head')[0],
		s = document.createElement('script');
	    //s.async = "async";
	    s.setAttribute('type', 'text/javascript');
	    s.setAttribute('src', src);
	    //s.onreadystatechange = function(){if(/loaded|complete/.test(this.readyState)) {eval(txt);head.removeChild(s);}};
	     //s.onload = function(){eval(txt);head.removeChild(s);};
	    head.insertBefore(s, head.firstChild);
	   
    }
	catch(e)
	{
		
	}
	
	
}
function c8_ref_readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
if ("undefined"==typeof(c8_match_user_already))
{
    var c8_match_user_already = c8_ref_readCookie("c8_match");
//    console.log(c8_match_user_already);
};

c8_ref_user_match();
