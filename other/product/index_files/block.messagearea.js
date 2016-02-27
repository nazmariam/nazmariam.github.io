var messageArea = function (blockId) {
    var self = new commonBlock(blockId);

    self.visible = ko.observable(false);
    self.message = ko.observable('');

    self.showMessage = function(text){
        self.message(text);
        if(text.length){
            self.visible(true);
        }
    }

    self.hideMessage = function(){
        self.visible(false);
        self.message('');
    }

    ko.applyBindings(self, document.getElementById(self.blockId));

    amplify.subscribe('show-' + self.blockId, self.showMessage);
    amplify.subscribe('hide-' + self.blockId, self.hideMessage);

    return self;
};
