var layoutReview = function (options) {

    var self = new commonLayout();

    self.blockId = 'layout-reviews';

    self.stateList = {
        'default': {summary: true, messageArea: false, vs: true, addReview: false, allReviews: true},
        'addReview': {summary: true, messageArea: false, vs: false, addReview: true, allReviews: false}
    };

    self.preloadData(options.reviews.preload);

    var params = {
        name : options.common.name,
        email : options.common.email,
        useCommentOnly : options.reviews.useCommentOnly
    };

    var addReviewparams = {
        name : options.common.name,
        email : options.common.email,
        city : options.common.city,
        useCommentOnly : options.reviews.useCommentOnly,
        new_helper: options.common.session_id,
        csrf_token: options.reviews.review_csrf_token,
        fromFollowUp: options.reviews.fromFollowUp
    };

    self.blocks = {
        'summary': new summary(),
        'messageArea': new messageArea('message-area-review'),
        'addReview': new addReview(addReviewparams),
        'allReviews': new allReviews(params),
        'vs': new vs(params)
    };

    self.showReviewForm = function () {
        amplify.publish('hide-message-area-review');
        self.setState('addReview');
    };

    self.hideReviewForm = function () {
        self.setState('default');
        self.scrollToSummary();
    };

    self.scrollToAddReview  = function (delay) {
        self.scrollToBlock('addReview', delay);
    };

    self.scrollToSummary  = function (delay) {
        self.scrollToBlock('summary', delay);
    };

    self.scrollToAllReviews  = function (delay) {
        self.scrollToBlock('allReviews', delay);
    };

    amplify.subscribe('create-review', self.showReviewForm);
    amplify.subscribe('cancel-create-review', self.hideReviewForm);
    amplify.subscribe('scrollToAllReviews', self.scrollToAllReviews);
    amplify.subscribe('scrollToAddReview', self.scrollToAddReview);

    window.dbg_review = self;

    ko.applyBindings(self, document.getElementById(self.blockId));

    var _state = options.reviews.state || 'default';
    if(_state == 'addReview'){
        //hack для полной отработки всех сценариев действия открытия формы
        amplify.publish('create-review');
    } else {
        self.setState(_state);
    }

    return self;
};
