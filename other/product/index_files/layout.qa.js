var layoutQa = function(options){

    var self = new commonLayout();

    self.blockId = 'layout-qa';

    self.stateList = {
        'default': {summary: true, messageArea: false, addQuestion: false, allQuestions: true},
        'addQuestion': {summary: true, messageArea: false, addQuestion: true, allQuestions: false}
    };

    self.showQuestionForm = function () {
        amplify.publish('hide-message-area-qa');
        self.setState('addQuestion');
    };

    self.scrollToAllQuestions  = function (delay) {
        self.scrollToBlock('allQuestions', delay);
    };

    self.hideQuestionForm = function () {
        self.setState('default');
    };

    self.scrollToAnswerForm = function(selector){
        self.scrollTo(selector);
    };

    self.preloadData(options.qa.preload);

    var addQuestionsParams = {
        name : options.common.name,
        email : options.common.email,
        csrf_helper: options.common.session_id,
        csrf_token: options.qa.question_csrf_token
    };

    var allQuestionsParam = {
        name : options.common.name,
        email : options.common.email,
        csrf_helper: options.common.session_id,
        csrf_token: options.qa.answer_csrf_token
    };

    self.blocks = {
        'summary': new summaryQa(options.qa.summary),
        'messageArea': new messageArea('message-area-qa'),
        'addQuestion': new addQuestion(addQuestionsParams),
        'allQuestions': new allQuestions(allQuestionsParam)
    };

    self.setState('default');
    ko.applyBindings(self, document.getElementById(self.blockId));

    amplify.subscribe('create-question', self.showQuestionForm);
    amplify.subscribe('cancel-create-question', self.hideQuestionForm);
    amplify.subscribe('create-answer', self.scrollToAnswerForm);
    amplify.subscribe('scrollToAllQuestions', self.scrollToAllQuestions);

    return self;
}