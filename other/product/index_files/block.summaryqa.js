var summaryQa = function(options) {

    var self = new commonBlock('summary-qa');

    self.countQuestion = ko.observable(options.count_question || 0);
    self.countAnswer = ko.observable(options.count_answer || 0);

    self.createEnabled = ko.observable(true);

    self.createQuestion = function(){
        if (self.createEnabled()) {
            amplify.publish('create-question');
        }
    };

    self.disableCreate = function() {
        self.createEnabled(false);
    };

    self.enableCreate = function() {
        self.createEnabled(true);
    };

    amplify.subscribe('create-question', self.disableCreate);
    amplify.subscribe('cancel-create-question', self.enableCreate);

    ko.applyBindings(self, document.getElementById(self.blockId));

    return self;
};