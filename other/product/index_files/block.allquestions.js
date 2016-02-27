var allQuestions = function (options) {

    options = options || {};
    var self = new commonBlock('sprosikupi-questions');

    self.useCommentOnly = options.useCommentOnly;

    self.questions = ko.observable([]);

    self.currentQuestions = ko.observable([]);
    self.paginatorBegin = ko.observable(0);
    self.paginatorEnd = ko.observable(0);
    self.paginatorAll = ko.observable(0);
    self.paginatorDisabledNext = ko.observable(false);
    self.paginatorDisabledPrevious = ko.observable(false);

    self.ajaxWaiter = ko.observable(false);

    self.questionsForPage = 10;
    self.page = 1;

    self.formOptions = { csrf_token: options.csrf_token, csrf_helper: options.csrf_helper };

    self.updatePaginator = function(){
        self.paginatorAll(self.questions().length);
        self._setQuestionsOnPage();
    };

    self.previousQuestions = function() {
        if(self.paginatorDisabledPrevious()) {
            return;
        }
        self.page--;
        self._setQuestionsOnPage();
        amplify.publish('scrollToAllQuestions');

    };

    self.nextQuestions = function() {
        if(self.paginatorDisabledNext()) {
            return;
        }
        self.page++;
        self._setQuestionsOnPage();
        amplify.publish('scrollToAllQuestions');
    };

    self._setQuestionsOnPage = function() {
        if(self.paginatorAll() == 0) {
            self.paginatorBegin(0);
            self.paginatorEnd(0);
            self.currentQuestions([]);
            return;
        }
        var page = self.page - 1;
        var questionsForPage = self.questionsForPage;
        var begin = page * questionsForPage;

        if(begin + 1 > self.paginatorAll()) {
            self.page--;
            self._setQuestionsOnPage();
            return;
        }
        if(begin < 0) {
            self.page++;
            self._setQuestionsOnPage();
            return;
        }

        self.currentQuestions(self.questions().slice(begin, begin + questionsForPage));
        var end = begin + self.currentQuestions().length;

        self.paginatorBegin(begin + 1);
        self.paginatorEnd(end);
    };

    self.checkPaginatorDisabledPrevious = function() {
        self.paginatorDisabledPrevious(self.paginatorBegin() == 1);
    };
    self.checkPaginatorDisabledNext = function() {
        self.paginatorDisabledNext(self.paginatorEnd() == self.paginatorAll());
    };

    self.questions.subscribe(self.updatePaginator);
    self.paginatorBegin.subscribe(self.checkPaginatorDisabledPrevious);
    self.paginatorEnd.subscribe(self.checkPaginatorDisabledNext);

    self.loadQuestions = function() {
        var cached = self.loadFromCache('questions');
        self.page = 1;
        if (cached) {
            self.questions(self.buildQuestionArray(cached, self.formOptions));
            return;
        }

        self.ajaxWaiter(true);
        self.getQuery('/question', {}, self.handler);
    };

    self.buildQuestionArray = function(questionArray, formOptions){
        var questions = [];
        for(var i in questionArray){
            questions.push(new Question(questionArray[i], formOptions));
        }
        return questions;
    };

    self.handler = function (data) {
        self.ajaxWaiter(false);
        var temp = [];
        if (data.questions !== undefined && data.question !== null) {
            temp = data.questions;
        }
        self.saveToCache('questions', temp, 300000);
        self.questions(self.buildQuestionArray(temp, self.formOptions));
    };

    self.loadQuestions();

    ko.applyBindings(self, document.getElementById(self.blockId));

    return self;
}
