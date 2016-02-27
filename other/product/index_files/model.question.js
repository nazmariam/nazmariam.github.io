var Question = function(data, formOptions){
    var self = new commonModel();

    self.id = null;
    self.name = null;
    self.email = null;
    self.text = null;
    self.created = null;
    self.answerCount = null;
    self.answers = ko.observable([]);

    self.formOptions = formOptions;

    self.newAnswerText = ko.observable('').extend({ required: true });
    self.newAnswerAuthor = ko.observable('').extend({ required: true });

    self.answerFormIsOpen = ko.observable(false);

    self.textMessage = ko.observable('');
    self.messageIsShown = ko.observable(false);

    self.errorMessage = ko.observable('');
    self.errorMessageIsShown = ko.observable(false);

    self.processing = ko.observable(false);

    self.prefix = 'spk-widget-question-';

    self.answersMode = ko.observable(false); //false = 2 last answers

    //список ответов, в соответствии с режимом вывода
    self.shownAnswers = ko.computed(function(){
        return (self.answerCount > 2 && self.answersMode() == false) ? self.answers().slice(-2) : self.answers();
    });

    self.toggleAnswersMode = function(){
        self.answersMode(!self.answersMode());
    };

    self.showMessage = function(message){
        self.textMessage(message);
        self.messageIsShown(true);
    };

    self.hideMessage = function(){
        self.messageIsShown(false);
        self.textMessage('');
    };

    self.openAnswerForm = function(){
        self.answerFormIsOpen(true);
        $('form#' + self.prefix + self.id + ' textarea').focus();
        self.hideMessage();
    };

    self.showErrorMessage = function(message){
        self.errorMessage(message);
        self.errorMessageIsShown(true);
    };

    self.hideErrorMessage = function(){
        self.errorMessageIsShown(false);
        self.errorMessage('');
    };

    self.openAnswerFormWithScroll = function(){
        self.openAnswerForm();
        amplify.publish('create-answer', self.prefix + self.id);
    };

    self.answerFormRow = ko.computed(function(){
        return self.answerFormIsOpen() ? 3 : 1;
    });

    self.closeForm = function(){
        self.answerFormIsOpen(false);
        self.newAnswerText('');
        self.newAnswerText.isModified(false);
        self.newAnswerAuthor('');
        self.newAnswerAuthor.isModified(false);
    };

    self.handler = function(data){
        if (data.new_token !== undefined && data.new_token !== null) {
            self.formOptions.csrf_token = data.new_token;
        }
        if (data.new_helper !== undefined && data.new_helper !== null) {
            self.formOptions.csrf_helper = data.new_helper;
        }
        self.processing(false);

        if(data.error && data.message){
            self.showErrorMessage(data.message);
        }

        if (!data.error && data.message !== undefined && data.message !== null) {
            self.showMessage(data.message);
        }

        if (data.error) {
            if (data.validation_errors) {
                //Вывести ошибки по полям
                for (var el in data.validation_errors) {
                    var val = data.validation_errors[el];
                    var message = val[Object.keys(val)[0]];
                    if(el == 'csrf_token') {
                        self.showErrorMessage(message);
                    } else {
                        //да, вот так вот
                        var field = 'newAnswer' + self.ucwords(el);
                        if(self[field]) {
                            self[field].isModified(true);
                            self[field].setError(message);
                        }
                    }
                }
            }
        } else {
            self.closeForm();
        }
    };

    self.ucwords = function(string) {
        return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
    };

    self.submitAddAnswerForm = function(form){
        if (!self.isValid()) {
            self.errors.showAllMessages();
            return;
        }
        if(self.processing()){
            return;
        }

        self.hideMessage();
        self.hideErrorMessage();

        data = {
            text: self.newAnswerText(),
            author: self.newAnswerAuthor(),
            questionId: self.id,
            csrf_token: self.formOptions.csrf_token,
            csrf_helper: self.formOptions.csrf_helper
        };

        self.postQuery(form.action, data, self.handler);
    };

    self.initAnswers = function(){
        var cached = self.loadFromCache('answers_' + self.id);
        if(cached){
            self.answers(cached);
        }
        //todo при необходимости - реализовать тут ajax вызов подгрузки ответов к вопросу
        //todo сейчас используется только preload-данные
    };

    for(var i in data){
        if(self.hasOwnProperty(i)){
            self[i] = data[i];
        }
    }

    self.initAnswers();

    self.errors = ko.validation.group(self);

    return self;
};
