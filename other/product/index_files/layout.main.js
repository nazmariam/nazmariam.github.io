var layoutMain = function(options){
    var self = this;

    commonModel.prototype.shopId = options.common.shopId;
    commonModel.prototype.goodShopId = options.common.goodId;

    self = new commonLayout();

    self.totalCountReview = ko.observable(options.reviews.preload.totalCount || 0);

    self.stateList = {
        'default': {'reviews': true, 'qa' : false},
        'qa': {'reviews': false, 'qa' : true}
    };

    self.setIframeHeight = function (height) {
        window.parent.postMessage('sprosikupi-resize-widget ' + height, "*");
    };

    frameOuter.onresize = function () {
        var height = $(frameOuter.frameElement).height();
        if (self.lastHeight != height) {
            amplify.publish("setHeight", height);
            self.lastHeight = height;
        }
    };

    self.switchQa = function(){
        self.setState('qa');
    };

    self.switchReview = function(){
        self.setState('default');
    };

    self.isDefault = function(){
        return self.getState() == 'default';
    };

    self.isQa = function(){
        return self.getState() == 'qa';
    };

    amplify.subscribe('setHeight', self.setIframeHeight);

    if(options.common.state == 'addReview'){
        options.reviews.state = options.common.state;
    }

    self.blocks = {
        'reviews': new layoutReview( options )
    };

    self.setState('default');

    if (options.qa) {
        self.totalCountQA = ko.observable(options.qa.summary.count_question || 0);
        self.blocks.qa = new layoutQa( options );
    }

    window.parent.postMessage('sprosikupi-show-widget', "*");
    if(window.navigator.userAgent.indexOf('Trident') !== -1
        || ( window.navigator.userAgent.indexOf('Safari') !== -1
        && window.navigator.userAgent.indexOf('Chrome') === -1 )) {
        setTimeout(function(){
            frameOuter.onresize();
            if(options.common.state == 'addReview'){
                amplify.publish('scrollToAddReview', 180);
            }
        }, 500);
    } else if(options.common.state == 'addReview') {
        amplify.publish('scrollToAddReview', 180);
    }

    return self;
};
