
function container () {
	var element = document.createElement('div');
	element.classList.add('container');
	document.body.appendChild(element);
}

function createElement (tag, elClass, parent, text) {
	var element = document.createElement(tag);
	element.classList.add(elClass);
	element.innerHTML = text;
	var parent = document.querySelector(parent);
	// console.log(parent);
	parent.appendChild(element);
}

function createElementWithAttr (tag, parent) {
	var element = document.createElement(tag);
	element.setAttribute('type', 'checkbox');
	var parent = document.querySelector(parent);
	parent.appendChild(element);
	// var text = document.createTextNode(text2);
	// element.appendChild(text);
	// е.classList.add(elClass);
}
function createTextNode (parent, text) {

	// element.innerHTML = text;
	var parent = document.querySelector(parent);
	var text = document.createTextNode(text);
	parent.appendChild(text);
}

container ();
createElement ('div', 'row', '.container', '');
createElement ('div', 'col-md-10', '.row', '');
createElement ('h3', 'text-center', '.col-md-10','Тест по программированию');
createElement ('form', 'form', '.col-md-10','');
createElement ('ol', 'ol', '.form','');
createElement ('li', 'li', '.ol','Вопрос №1');
createElement ('ul', 'ulQuestion', '.li','');
createElement ('li', 'checkbox', '.ulQuestion', '');
createElement ('label', 'label', '.checkbox', '');
createElementWithAttr ('input','.label','Вариант ответа №1');
// createElement ('span', 'span', '.label', 'Вариант ответа №1');
createTextNode ('.label','trtdfvh');

var obj = {a: 1};         

var increment = function(obj ) { obj = {a: 2} }         

increment(obj);         

console.log(obj.a);