
function container () {
	var element = document.createElement('div');
	element.classList.add('container');
	document.body.appendChild(element);
}

function row () {
	var element = document.createElement('div');
	element.classList.add('row');
	var container = document.querySelector('.container');
	container.appendChild(element);
}

function column () {
	var element = document.createElement('div');
	element.classList.add('col-md-10');
	var row = document.querySelector('.row');
	row.appendChild(element);
}

function h3 (text) {
	var element = document.createElement('h3');
	element.classList.add('text-center');
	var column = document.querySelector('.col-md-10');
	element.innerHTML = text;
	column.appendChild(element);
}

function form () {
	var element = document.createElement('form');
	var column = document.querySelector('.col-md-10');
	column.appendChild(element);
}

function ol () {
	var element = document.createElement('ol');
	var form = document.getElementsByTagName('form');
	form[0].appendChild(element);
}
function li (a) {
	var element = document.createElement('li');
	var ol = document.getElementsByTagName('ol');
	ol[0].appendChild(element);
	element.innerHTML = 'Вопрос №'+a;
}

function ul () {
	var element = document.createElement('ul');
	element.classList.add('ulQuestion');
	var li = document.getElementsByTagName('li');
	li[0].appendChild(element);	
}


function variant (i) {
	var element = document.createElement('li');
	element.classList.add('checkbox');
	// element.innerHTML = 'Вариант ответа №'+i;
	var ul = document.querySelector('.ulQuestion');
	ul.appendChild(element);
}

function label (i) {
	var elementLabel = document.createElement('label');
	var li = document.querySelectorAll('.checkbox');
		// console.log(li);
		// console.log(i);
	li[i-1].appendChild(elementLabel);
	input(i);
}

function input (i) {
	var element = document.createElement('input');
	element.setAttribute('type', 'checkbox');	
	var label = document.getElementsByTagName('label');
	label[i-1].appendChild(element);
	var text = document.createTextNode('Вариант ответа №'+i);
	label[i-1].appendChild(text);
}
container();
row();
column();
h3('Тест по программированию');
form();
ol();
li('1');
ul();
for (var i = 1; i <= 3; i++) {
	variant(i);
	label(i);
	// input(i);
}
li('2');
ul();
