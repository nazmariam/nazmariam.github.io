define (
    'View',
    [],
    function(){
        return function (model) {
            var self = this;

            self.elements = {
                input: $('.list__input'),
                addBtn: $('.list__add-button'),
                rmvItem: '.list__remove-item',
                editItem: '.list__edit-item',
                listContainer: $('#list'),   
            };

            self.renderList = function (data) {
                var list = tmpl( $("#list-template").html(), {data: data} );
                self.elements.listContainer.html(list);
            };

            self.renderList(model.data);
        };
    }
);