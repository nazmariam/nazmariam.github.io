var body = document.querySelector('body');

var programmingTest = {
    createContainer () {
        var container = document.createElement('div');
        container.classList.add('container');
        container.style.margin = '0 auto';
        container.style.width = '800px';
        document.body.appendChild(container);
    },

    createHeading () {
        container = body.querySelector('.container');
        var h3 = document.createElement('h3');
        h3.innerHTML = 'Тест по программированию';
        h3.classList.add('text-center');
        container.appendChild(h3);
    },

    createForm () {
        var form = document.createElement('form');
        container.appendChild(form);
    },

    createFormContent () {
        var form = container.querySelector('form');

        for (var i = 0; i < 3; i++) {
            var ul = document.createElement('ul');

            ul.style.marginLeft = '20px';
            var ol = document.createElement('ol');
            form.appendChild(ol);
            ol = form.querySelectorAll('ol');
            ol[i].appendChild(document.createTextNode((i+1) + '. ' + 'Вопрос №' + (i+1)));

            for (var j = 0; j < 3; j++) {
                var li = document.createElement('li');
                ul.appendChild(li);
                li.classList.add('checkbox');

                var input = document.createElement('input');
                input.type = 'checkbox';
                var label = document.createElement('label');
                label.appendChild(input);
                label.appendChild(document.createTextNode('Вариант ответа №' + (j+1)));

                li = ul.querySelectorAll('li');

                li[j].appendChild(label);
            }

            form.appendChild(ul);
        }
    },

    createButton () {
        var form = container.querySelector('form');
        var button = document.createElement('button');
        button.classList.add('btn', 'btn-success', 'center-block');
        button.style.margin = '0 auto';
        button.style.display = 'block';
        button.appendChild(document.createTextNode('Проверить мои результаты'));
        form.appendChild(button);
    }
};

programmingTest.createContainer();
programmingTest.createHeading();
programmingTest.createForm();
programmingTest.createFormContent();
programmingTest.createButton();