define(
    'Controller',
    [],
    function(){
        return function (model, view) {
            var self = this;

            view.elements.addBtn.on('click', addItem);
            view.elements.listContainer.on('click', view.elements.rmvItem, removeItem);
            view.elements.listContainer.on('click', view.elements.editItem, editItem);

            function addItem() {
                var newItem = view.elements.input.val();
                model.addItem(newItem);
                model.saveData(model.data);
                view.renderList(model.data);
                view.elements.input.val('');
            }

            function removeItem(e) {
                var delItem = $(e.target).parent('.list__buttons').siblings('.list__text').text();
                model.removeItem(delItem);
                model.saveData(model.data);
                view.renderList(model.data);
            }

            function editItem(e) {
                var item = $(e.target).parent('.list__buttons').siblings('.list__text').text();
                view.elements.input.val(item);
                view.elements.addBtn.text('Done');
                view.elements.addBtn.on('click', edit);
                view.elements.addBtn.off('click', addItem);

                    function edit(e) {
                        var changedItem = view.elements.input.val();
                        model.changeItem(item, changedItem);
                        model.saveData(model.data);
                        view.renderList(model.data);
                        view.elements.input.val('');
                        view.elements.addBtn.text('Add');
                        view.elements.addBtn.off('click', edit);
                        view.elements.addBtn.on('click', addItem);
                    }
            }
        };
    }
);
