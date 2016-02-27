var vs = function(options) {

    options = options || {};
    var self = new commonBlock('review-vs');

    self.useCommentOnly = options.useCommentOnly;

    self.positive = ko.observable([]);
    self.negative = ko.observable([]);
    self.positiveAllRating = ko.computed(function(){
        var count = Number(self.positive().rating_positive) + Number(self.positive().rating_negative);
        return count.toString();
    });
    self.negativeAllRating = ko.computed(function(){
        var count = Number(self.negative().rating_positive) + Number(self.negative().rating_negative);
        return count.toString();
    });
    self.haveBoth = ko.observable(false);

    self.mode = ko.observable('vs');
    self.details = ko.observable();

    self.loadReviews = function(){
        var vs = self.loadFromCache('vs');
        if(vs) {
            self.positive(vs['positive']);
            self.negative(vs['negative']);
            self.haveBoth(true);
        }
    };

    self.showBestPositiveReview = function() {
        self.details(self.positive());
        self.mode('positive');
        return false;
    };

    self.showBestNegativeReview = function(){
        self.details(self.negative());
        self.mode('negative');
        return false;
    };

    self.back = function() {
        self.mode('vs');
    };

    ko.applyBindings(self, document.getElementById(self.blockId));

    self.loadReviews();

    return self;
};
