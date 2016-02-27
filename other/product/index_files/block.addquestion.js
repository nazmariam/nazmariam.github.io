var addQuestion = function (options) {

    var self = new commonBlock('add-question');

    self.text = ko.observable('').extend({ required: true });
    self.name = ko.observable(options.name ? options.name : '').extend({ required: true });
    self.email = ko.observable(options.email ? options.email : '').extend({ required: true, email: true });
    self.subscribe = ko.observable(true);
    self.token = options.csrf_token;
    self.tokenHelper = options.csrf_helper;

    self.errorMessage = ko.observable('');
    self.errorMessageVisible = ko.observable(false);

    self.processing = ko.observable(false);

    //todo refactoring - вынести определение биндинга
    //custom binding to just handle initializing a value
    ko.bindingHandlers.initializeValue = {
        init: function (element, valueAccessor) {
            var value = valueAccessor();
            if (ko.isObservable(value)) {
                value(element.value);
            }
        }
    };

    self.showErrorMessage = function(text){
        self.errorMessage(text);
        self.errorMessageVisible(true);
    };

    self.hideErrorMessage = function(){
        self.errorMessageVisible(false);
        self.errorMessage('');
    };

    self.clearFields = function () {
        self.text('');
        self.text.isModified(false);
        self.name('');
        self.name.isModified(false);
        self.email('');
        self.email.isModified(false);
        self.subscribe(true);
        self.suppressMessage(true);
    };

    self.handler = function (data) {
        self.processing(false);
        if (data.error) {
            if (data.message) {
                self.showErrorMessage(data.message);
            }

            if (data.validation_errors) {
                //Вывести ошибки по полям
                for (var el in data.validation_errors) {
                    var val = data.validation_errors[el];
                    var message = val[Object.keys(val)[0]];
                    if(el == 'csrf_token'){
                        self.showErrorMessage(message);
                    } else if (self.hasOwnProperty(el)) {
                        self[el].isModified(true);
                        self[el].setError(message);
                    }
                }
            }
        }

        if (data.new_token) {
            self.token = data.new_token;
        }

        if (data.new_helper) {
            self.tokenHelper = data.new_helper;
        }

        if (!data.error) {
            self.cancel();
            if (data.message) {
                amplify.publish('show-message-area-qa', data.message);
            }
        }
    };

    self.errorHandler = function () {
        self.processing(false);
        self.showErrorMessage(_('Приносим свои извинения. Повторите попытку позже.'));
    };

    self.submitAddQuestionForm = function(form){
        self.suppressMessage(false);
        if (!self.isValid()) {
            self.errors.showAllMessages();
            return;
        }
        if (self.processing()) {
            return;
        }
        self.processing(true);
        self.postQuery(form.action, {
            'text': self.text(),
            'name': self.name(),
            'email': self.email(),
            'receiveAnswerByEmail' : (self.subscribe() ? 1 : 0),
            'csrf_token': self.token,
            'csrf_helper': self.tokenHelper
        }, self.handler, self.errorHandler);
    };

    self.cancel = function () {
        amplify.publish('cancel-create-question');
        self.clearFields();
        self.hideErrorMessage();
        self.processing(false);
    };

    self.suppressMessage = ko.observable(true);
    self.toogleSuppress = function(){
        if(self.suppressMessage() && self.email()){
            self.suppressMessage(false);
        }
    };

    ko.applyBindings(self, document.getElementById(self.blockId));

    self.errors = ko.validation.group(self);

    return self;
};
