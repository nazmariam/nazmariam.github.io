var commonBlock = function (blockId) {
    var self = new commonModel();

    self.blockId = blockId;
    self.$block = $('#' + self.blockId);
    self.visible  = ko.observable(false);

    return self;
};
