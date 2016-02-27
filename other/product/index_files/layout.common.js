var commonLayout = function () {
    var self = this;

    self.blockId = '';

    self.state = ko.observable('default');
    self.stateList = {};
    self.blocks = {};

    self.visible = ko.observable(false);

    self.setState = function(state){
        if (!self.stateList.hasOwnProperty(state)) {
            return;
        }
        self.state(state);

        for(var block in self.stateList[state]) {

            if (self['blocks'][block] === undefined || !self['blocks'][block].hasOwnProperty("visible")) {
                continue;
            }

            self['blocks'][block].visible(self.stateList[state][block]);
        }
    };

    self.scrollTo = function (selector, delay, top) {
        top = top !== false ? true : false;
        delay = delay || 40;
        setTimeout(function(){
            document.getElementById(selector).scrollIntoView(top);
        }, delay);
    };

    self.scrollToBlock = function (toBlock, delay) {
        self.scrollTo(self.blocks[toBlock].blockId, delay);
    };

    self.preloadData = function(preload){
        var model = new commonModel();
        for (var el in preload) {
            var data, ttl;
            if (preload[el].hasOwnProperty('data')) {
                data = preload[el]['data'];
                ttl = preload[el]['ttl'];
            } else {
                data = preload[el];
                ttl = 120000;
            }
            model.saveToCache(el, data, ttl);
        }
    };

    self.getState = function(){
        return self.state();
    };

    amplify.subscribe('scrollToBlock', self.scrollToBlock);

    return self;
};
