var allReviews = function (options) {

    options = options || {};
    var self = new commonBlock('sprosikupi-reviews');

    self.useCommentOnly = options.useCommentOnly;

    self.reviews = ko.observable([]);
    self.currentReviews = ko.observable([]);
    self.paginatorBegin = ko.observable(0);
    self.paginatorEnd = ko.observable(0);
    self.paginatorAll = ko.observable(0);
    self.paginatorDisabledNext = ko.observable(false);
    self.paginatorDisabledPrevious = ko.observable(false);

    self.ajaxWaiter = ko.observable(false);
    self.mode = ko.observable('date_new');
    self.totalCount = ko.observable(self.loadFromCache('totalCount'));
    self.votes = ko.observableArray([]);

    self.reviewsForPage = 10;
    self.page = 1;

    self.updatePaginator = function(){
        self.paginatorAll(self.reviews().length);
        //self.page = 1; //Иначе будет сбивать паджинатор при обновлении самих объектов ревью в общем списке
        self._setReviewsOnPage();
    };

    self.previousReviews = function() {
        if(self.paginatorDisabledPrevious()) {
            return;
        }
        amplify.publish('scrollToAllReviews');
        self.page--;
        self._setReviewsOnPage();
    };

    self.nextReviews = function() {
        if(self.paginatorDisabledNext()) {
            return;
        }
        self.page++;
        self._setReviewsOnPage();
        amplify.publish('scrollToAllReviews');
    };

    self._setReviewsOnPage = function() {
        if(self.paginatorAll() == 0) {
            self.paginatorBegin(0);
            self.paginatorEnd(0);
            self.currentReviews([]);
            return;
        }
        var page = self.page - 1;
        var reviewsForPage = self.reviewsForPage;
        var begin = page * reviewsForPage;

        if(begin + 1 > self.paginatorAll()) {
            self.page--;
            self._setReviewsOnPage();
            return;
        }
        if(begin < 0) {
            self.page++;
            self._setReviewsOnPage();
            return;
        }

        self.currentReviews(self.reviews().slice(begin, begin + reviewsForPage));
        var end = begin + self.currentReviews().length;

        self.paginatorBegin(begin + 1);
        self.paginatorEnd(end);
    };

    self.checkPaginatorDisabledPrevious = function() {
        self.paginatorDisabledPrevious(self.paginatorBegin() == 1);
    };
    self.checkPaginatorDisabledNext = function() {
        self.paginatorDisabledNext(self.paginatorEnd() == self.paginatorAll());
    };

    self.reviews.subscribe(self.updatePaginator);
    self.paginatorBegin.subscribe(self.checkPaginatorDisabledPrevious);
    self.paginatorEnd.subscribe(self.checkPaginatorDisabledNext);

    self.loadReviews = function() {
        var mode = self.mode();
        var cached = self.loadFromCache('reviews_'+mode);
        self.page = 1; //Пойдет перезагрузка всех ревью, сброс на первую страницу
        if (cached) {
            self.reviews(cached);
            return;
        }

        self.ajaxWaiter(true);
        self.getQuery('/review', {'mode': mode}, self.handler);
    };

    self.mode.subscribe(self.loadReviews);

    self.handler = function (data) {
        self.ajaxWaiter(false);
        if (data.reviews !== undefined && data.review !== null) {
            self.reviews(data.reviews);
        }
        self.saveToCache('reviews_'+self.mode(), self.reviews(), 300000);
    };

    self.voteResult = function(data) {
        if (!data.error) {
            var reviews = self.reviews();
            for(var key in reviews) {
                if (self.reviews()[key].id == data.review) {
                    reviews[key].rating_positive = data.positive;
                    reviews[key].rating_negative = data.negative;
                    break;
                }
            }
            self.reviews(reviews);
            self.saveToCache('reviews_'+self.mode(), self.reviews(), 300000);

            self.votes.push(data.review);
            self.saveToCache('votes', self.votes(), 0);

            var modes = ['date_new', 'date_old', 'helpful', 'mark_high', 'mark_low'];
            for(var m in modes) {
                var mode = modes[m];
                if (mode == self.mode()) {
                    continue;
                }
                self.clearCache('reviews_'+mode);
            }
        }
    };

    self.vote = function(reviewId, side) {
        self.postQuery('/review/vote', {'review': reviewId, 'vote': side}, self.voteResult);
    };

    var votes = self.loadFromCache('votes');
    if (votes == null) {
        votes = [];
    }
    self.votes(votes);

    ko.applyBindings(self, document.getElementById(self.blockId));

    self.loadReviews();

    return self;
}
