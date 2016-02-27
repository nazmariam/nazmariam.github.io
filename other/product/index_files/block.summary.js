var summary = function() {

    var self = new commonBlock('review-summary');

    self.markDistribution = ko.observable();
    self.createEnabled = ko.observable(true);

    self.totalCount = ko.computed(function() {
        var count = 0;
        for (var mark in self.markDistribution()) {
            count += Number(self.markDistribution()[mark]['count']);
        }
        return count.toString();
    });

    self.average = ko.computed(function() {
        if (self.totalCount() < 1) {
            return 0;
        }
        var sum = 0;
        for (var el in self.markDistribution()) {
            var mark = self.markDistribution()[el]['mark'];
            var count = self.markDistribution()[el]['count'];
            sum += mark * count;
        }
        return sum / self.totalCount();
    });

    self.createReview = function() {
        if (self.createEnabled()) {
            amplify.publish('create-review');
        }
    };

    self.markDistribution(self.loadFromCache('summary'));

    self.disableCreate = function() {
        self.createEnabled(false);
    };

    self.enableCreate = function() {
        self.createEnabled(true);
    };

    amplify.subscribe('create-review', self.disableCreate);
    amplify.subscribe('cancel-create-review', self.enableCreate);

    ko.applyBindings(self, document.getElementById(self.blockId));

    return self;
};