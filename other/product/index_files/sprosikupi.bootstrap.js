(function (w) {
    var spk = {};
    spk.reviewsOnPage = false;
    spk.baseHost = 'sprosikupi.ru';
    spk.proto = (document.location.protocol == 'https:') ? 'https' : 'http';

    spk.markup = {
        reviews : 'spk-widget-reviews',
        ratings : 'spk-good-rating'
    };

    spk.getParameters = null;

    //Инициализация виджета отзывов стартовала
    spk.reviewWidgetInitStarted = false;
    //Загружены стили
    spk.stylesLoaded = false;

    spk._goodIds = [];
    spk._hashRatingData = {};
    spk._color = '#6883a3';

    //Определение хоста
    spk.determineHost = function() {
        var scripts = document.getElementsByTagName('script');
        for(var a = 0; a < scripts.length; a++){
            if(scripts[a].src.indexOf('sprosikupi.bootstrap.js') > 0 ) {
                var link = document.createElement('a');
                link.href = scripts[a].src;
                spk.baseHost = link.host.substr(link.host.indexOf('.')+1);
                //IE хранит с портом
                var pos = spk.baseHost.indexOf(':');
                if(pos !== -1){
                    spk.baseHost = spk.baseHost.substr(0, pos);
                }
                break;
            }
        }
    };

    spk._getParameters = function(){
        if(spk.getParameters !== null) {
            return spk.getParameters;
        }
        var searchStr = decodeURIComponent(window.location.search);
        if(searchStr == ''){
            spk.getParameters = {};
            return {};
        }
        searchStr = searchStr.slice(1);
        var gets = {};
        var parametrs = searchStr.split('&');
        for(var i = 0, length = parametrs.length; i < length; i++) {
            var data = parametrs[i].split('=');
            if(data.length > 1){
                var value = [];
                for(var j = 1; j < data.length; j++){
                    value.push(data[j]);
                }
                gets[data[0]] = value.join('=');
            }
        }
        spk.getParameters = gets;
        return gets;
    };

    spk.initStarWidget = function() {
        var stars = document.getElementsByClassName(spk.markup.ratings);
        if (stars.length === 0) {
            return;
        }
        var shopId = 0;
        var goodIds = [];
        for (var i=0; i<stars.length; i++) {
            var star = stars[i];
            var goodId = spk._readGoodId(star);
            if(spk._goodIds.indexOf(goodId) == -1){
                goodIds.push(goodId);
            }

            if (shopId == 0) {
                shopId = spk._readShopId(star);
            }
        }

        if (shopId === 0) {
            return ;
        }

        //Звезды будут, нужно подключить стили
        spk.initStyles();

        //Повторно запросили те же данные, например, при пейджинации
        if (goodIds.length === 0) {
            spk._simpleShowStars(stars);
        } else {
            //Есть, что загружать
            spk.query(spk._getWidgetHostUrl()+'/good/rating', 'get', {'shopId': shopId, 'ids': goodIds}, spk._showStars.bind(self, stars));
            //Записываем, для каких товаров уже загружены данные
            for (var i=0; i<goodIds.length; i++) {
                spk._goodIds.push(goodIds[i]);
            }
        }
    };

    spk.initReviewWidget = function(){
        if(spk.reviewWidgetInitStarted || !w.addEventListener){
            return;
        }
        var reviews = document.getElementById(spk.markup.reviews);
        if(!reviews){
            return;
        }
        spk.reviewWidgetInitStarted = true;
        var shopId = spk._readShopId(reviews);
        var goodId = spk._readGoodId(reviews);
        if(!shopId || ! goodId){
            return;
        }
        var goodTitle = spk._readAttr(reviews,'good-title', '');
        var goodUrl = spk._readAttr(reviews,'good-url', '');

        var iframe = document.createElement('iframe');
        iframe.id = 'iframe-' + spk.markup.reviews;
        iframe.scrolling = 'no';
        iframe.setAttribute('frameborder', '0');
        iframe.src = spk._getWidgetHostUrl()
            + '?shopId=' + encodeURIComponent(shopId)
            + '&goodShopId=' + encodeURIComponent(goodId)
            + '&goodTitle=' + encodeURIComponent(goodTitle)
            + '&goodUrl=' + encodeURIComponent(goodUrl)
            + (spk.getParameters.spkPreState ? '&preState=' + encodeURIComponent(spk.getParameters.spkPreState) : '')
            + (spk.getParameters.spkBuyerName ? '&name=' + encodeURIComponent(spk.getParameters.spkBuyerName) : '')
            + (spk.getParameters.spkBuyerEmail ? '&email=' + encodeURIComponent(spk.getParameters.spkBuyerEmail) : '')
            + (spk.getParameters.spkBuyerCity ? '&city=' + encodeURIComponent(spk.getParameters.spkBuyerCity) : '')
            + (spk.getParameters.spkFromFollowUpHash ? '&fromFollowUpHash=' + encodeURIComponent(spk.getParameters.spkFromFollowUpHash) : '');
        iframe.style.width = '100%';
        iframe.style.height = '0px';
        iframe.setAttribute('allowtransparency', 'true');
        reviews.innerHTML = '';
        reviews.appendChild(iframe);
        w.addEventListener("message", spk.receiveReviewsWidgetMessage, false);
    };

    spk._appendStarData = function(stars, color){
        for (var i=0; i<stars.length; i++) {
            var star = stars[i];
            var index = star.getAttribute('good-id');
            if(!spk._hashRatingData[index]) continue;
            var mark = parseFloat(spk._hashRatingData[index].rating);
            if (isNaN(mark)) continue;
            var count = parseInt(spk._hashRatingData[index].count);
            var rounded = Math.round(mark);
            var html;
            if (star.hasAttribute('good-url')) {
                var goodUrl = star.getAttribute('good-url');
                html = '<a href="' + goodUrl + '" class="spk-rating-stars spk-good-rating-' + rounded + '"></a> ';
                html+= '<span class="spk-rating-count">('+count+')</span>';
            } else {
                html = '<span class="spk-rating-stars spk-good-rating-'+rounded+'"></span> ' +
                    '<span class="spk-good-rating-number" style="background-color: '+color+'">'+mark.toPrecision(2)+'</span> ';
                //будет виджет с отзывами
                if(document.getElementById(spk.markup.reviews)){
                    html += ' <a href="#' + spk.markup.reviews + '" style="margin-left:10px">'+count+'&nbsp;'+spk._pluralForm(count)+'</a>';
                } else {
                    html += '<span style="margin-left:10px">'+count+'&nbsp;'+spk._pluralForm(count)+'</span>';
                }
            }
            star.innerHTML = html;
        }
    };

    spk._simpleShowStars = function(stars){
        spk._appendStarData(stars, spk._color);
    };

    spk._showStars = function(stars, data) {
        spk._color = data.color;
        var values = data.ratings;
        //Дописываем данные в кэш
        for(var i in values){
            spk._hashRatingData[i] = values[i];
        }
        spk._plural = data.plural;
        spk._starStrings = data.strings;
        spk._appendStarData(stars, data.color);
    };

    spk._pluralForm = function (n) {

        eval(spk._plural);
        return spk._starStrings[plural];
        /*
        count = Math.abs(count) % 100;
        var n1 = count % 10;
        if (count > 10 && count < 20) return form5;
        if (n1 > 1 && n1 < 5) return form2;
        if (n1 == 1) return form1;
        return form5;*/
    };

    spk.query = function(url, method,  data, onLoad) {
        var params = [];
        if(method == 'get'){
            for(var key in data) {
                if (!data.hasOwnProperty(key)) continue;
                params.push(encodeURIComponent(key)+'='+encodeURIComponent(data[key]));
            }
        }
        var xhr = new XMLHttpRequest;
        if("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url + (method == 'get' ?  '?'+params.join('&') : '' ), true);
        }else if(typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.open(method, url+(method == 'get' ?  '?'+params.join('&') : '' ), true);
        }else{
            // CORS not supported.
            xhr = null;
        }

        if(!xhr){
            return;
        }
        // Response handlers.
        // Successfully loaded
        xhr.onload = function() {
            onLoad && onLoad(JSON.parse(xhr.responseText));
        };
        //these blank handlers need to be set to fix ie9 http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/
        xhr.onprogress = function () { };
        xhr.ontimeout = function () { };
        xhr.onerror = function() { };

        //do it, wrapped in timeout to fix ie9
        setTimeout(function () {
            if(method == 'post'){
                if(xhr.setRequestHeader){ //XDomainRequest не умеет
                    xhr.setRequestHeader('Content-Type', 'application/json');
                }
                xhr.send( JSON.stringify(data));
                return;
            }
            xhr.send();
        }, 0);
    };

    spk._readShopId = function(elem){
        return spk._readAttr(elem, 'shop-id', 0);
    };

    spk._readGoodId = function(elem){
        return spk._readAttr(elem, 'good-id', 0);
    };

    spk._readAttr = function(elem, attr, dflt){
        if(elem.hasAttribute(attr)){
            return elem.getAttribute(attr);
        }
        return dflt;
    };

    spk._getWidgetHostUrl = function(){
        return spk.proto + '://widget.' + spk.baseHost;
    };

    spk._unhideRefs = function(){
        var stars = document.getElementsByClassName(spk.markup.ratings);
        if (stars.length === 0) {
            return;
        }
        for (var i=0; i<stars.length; i++) {
            stars[i].className += " spk-ref-to-reviews"
        }
    };

    spk.receiveReviewsWidgetMessage = function(event) {
        if (event.origin !== spk._getWidgetHostUrl()) {
            return;
        }
        var iframe = document.getElementById('iframe-' + spk.markup.reviews);
        if(!iframe){
            return;
        }
        var data = event.data.split(' ', 2);
        switch (data[0]){
            case 'sprosikupi-show-widget':
                iframe.parentNode.style.display = 'block';
                spk._unhideRefs();
                break;
            case 'sprosikupi-resize-widget':
                iframe.height = data[1]+'px';
                iframe.style.height = data[1]+'px';
        }
    };

    spk.initStyles = function(){
        if(!spk.stylesLoaded){
            var css = 'div.spk-good-rating{display:inline-block;}div.spk-good-rating .spk-rating-stars{display:inline-block !important;width:86px;height:14px;background: url("//static.'+ spk.baseHost +'/img/star-sprite.png");}' +
                'div.spk-good-rating a{display:inline;}div.spk-good-rating.spk-ref-to-reviews a{display:inline;}div.spk-good-rating .spk-good-rating-4{background-position:-18px 0;}' +
                'div.spk-good-rating .spk-good-rating-3{background-position:-36px 0;}div.spk-good-rating .spk-good-rating-2{background-position:-54px 0;}' +
                'div.spk-good-rating .spk-good-rating-1{background-position:-72px 0;}div.spk-good-rating .spk-good-rating-0{background-position:-90px 0;}' +
                'div.spk-good-rating .spk-good-rating-number{display: inline-block;min-width:10px;padding:3px 7px;font-size:12px;font-weight:700;color:#fff;line-height:1;vertical-align:baseline;white-space:nowrap;text-align:center;background-color:#999;border-radius: 10px;}'+
                'div.spk-good-rating span.spk-rating-count{position:relative; top:-1px;}';
            var head  = document.getElementsByTagName('head')[0];
            var style = document.createElement('style');
            style.type = 'text/css';
            if(style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                var rules = document.createTextNode(css);
                style.appendChild(rules);
            }
            head.appendChild(style);
        }
        spk.stylesLoaded = true;
    };

    spk.pushOrder = function(order, callback) {
        spk.query(spk._getWidgetHostUrl()+'/order', 'post', order, function(result){
            if(callback){
                callback(result);
            }
        });
    };

    spk.ready = function() {
        spk.initReviewWidget();
        spk.initStarWidget();
    };

    spk.init = function(){
        //для всего кроме ie < 9 это как document.ready
        try {
            spk.determineHost();
            spk._getParameters();

            //предварительная попытка загрузить виджет, если DOM достаточен для этого
            spk.initReviewWidget();
            if (document.readyState == "interactive" || document.readyState == "complete") {
                spk.ready();
            } else {
                document.addEventListener( "DOMContentLoaded", spk.ready, false );
            }
        } catch (e) { //ie < 9 Что тут поделаешь
            console.log(e);
        }
    };

    if(!w.sprosikupiLoaded){
        w.sprosikupiLoaded = true;
        spk.init();
    }

    //экспортируем метод пропихивания заказа
    w.spkPushOrder = spk.pushOrder;
    //экспортируем метод загрузки рейтингов
    w.spkLoadRatings = spk.initStarWidget;
})(window);