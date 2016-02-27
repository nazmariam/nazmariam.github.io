var addReview = function (options) {

    options = options || {};
    var self = new commonBlock('sprosikupi-add-review');

    self.mark = ko.observable(null).extend({
        required: {message: _('Выберите оценку товара')},
        number: true,
        min: 1,
        max: 5 });
    self.pros = ko.observable('');
    self.cons = ko.observable('');
    if(!options.useCommentOnly){
        self.pros = self.pros.extend({ required: true });
        self.cons = self.cons.extend({ required: true });
    }
    self.comment = ko.observable('').extend({ required: true });
    self.name = ko.observable(options.name ? options.name : '').extend({ required: true });
    self.city = ko.observable(options.city ? options.city : '').extend({ required: true });
    self.email = ko.observable(options.email ? options.email : '').extend({ required: true, email: true });
    self.hoverMark = ko.observable(0);

    self.token = options.csrf_token;
    self.tokenHelper = options.new_helper;
    self.fromFollowUp = options.fromFollowUp;

    self.errorMessage = ko.observable('');
    self.errorMessageVisible = ko.observable(false);

    self.processing = ko.observable(false);

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
        self.mark('');
        self.mark.isModified(false);
        self.pros('');
        self.pros.isModified(false);
        self.cons('');
        self.cons.isModified(false);
        self.comment('');
        self.comment.isModified(false);
        self.name('');
        self.name.isModified(false);
        self.city('');
        self.city.isModified(false);
        self.email('');
        self.email.isModified(false);
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
                    if(data.validation_errors.hasOwnProperty(el)){
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
                amplify.publish('show-message-area-review', data.message);
            }
        }
    };

    self.errorHandler = function () {
        self.processing(false);
        self.showErrorMessage(_('Приносим свои извинения. Повторите попытку позже.'));
    };

    self.markToText = function(mark) {
        switch (parseInt(mark)) {
            case 5:
                return _('Отлично');
            case 4:
                return _('Хорошо');
            case 3:
                return _('Нормально');
            case 2:
                return _('Плохо');
            case 1:
                return _('Ужасно');
        }
        return 'Как-то';
    };

    self.markOver = function(block, event) {
        var mark = $(event.currentTarget).attr('data-mark');
        self.hoverMark(mark);
    };
    self.markOut = function(block, event) {
        var mark = $(event.currentTarget).attr('data-mark');
        if (self.hoverMark() == mark) {
            self.hoverMark(0);
        }
    };

    self.submitAddReviewForm = function (form) {
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
            'mark': self.mark(),
            'pros': self.pros(),
            'cons': self.cons(),
            'comment': self.comment(),
            'name': self.name(),
            'city': self.city(),
            'email': self.email(),
            'csrf_token': self.token,
            'csrf_helper': self.tokenHelper,
            'fromFollowUp': self.fromFollowUp
        }, self.handler, self.errorHandler);

        return false;
    };

    self.setMark = function (obj, event) {

        var mark = $(event.currentTarget).attr('data-mark');
        if (mark < 1 || mark > 5) {
            return;
        }
        self.mark(mark);
    };

    self.marked = function (elem) {
        return (self.mark() != null) && ($(elem).attr('data-mark') <= self.mark());
    };

    self.cancel = function () {
        amplify.publish('cancel-create-review');
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
