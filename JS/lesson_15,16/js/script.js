// Google search

var myKey = 'ABQIAAAACKQaiZJrS0bhr9YARgDqUxQBCBLUIYB7IF2WaNrkYqF0tBovNBQFDtM_KNtb3xQxWff2mI5hipc3lg';

$.getJSON('http://ajax.googleapis.com/ajax/services/search/web?v=1.0?key='+myKey+'&q='+ encodeURIComponent(jQuery('#q').val()) +'&callback=GoogleCallback&context=?',
function(data){
    var ul = document.createElement("ul");
    $.each(data.results, function(i, val){
            var li = document.createElement("li");
            li.innerHTML = '<a href="'+val.url+'" title="'+val.url+'" target="_blank">'+val.title+"</a> - "+val.content;                            
            ul.appendChild(li);
    });
    $('body').html(ul);
});
function GoogleCallback (func, data) {
    window[func](data);
}


// Prototyping

var Human = {
    name: 'Вася',
    age: 41,
    sex: 'мужской',
    height: 180,
    weight: 83
};

var Worker = {
    job: 'Киевенерго',
    salary: 3000,
    toWork: function() {
        alert('Де викрутка?');
    }
};

var Student = {
    university: 'КПИ',
    grants: 500,
    watchFilms: function() {
        alert('Еще одну и спать');
    }
};

    Worker.__proto__ = Human;
    Student.__proto__ = Human;

var Sergey = Object.create(Worker, {
    name: {value: 'Сергей'},
    salary: {value: 15000},
    age: {value: 30},
});

function studying() {
    this.__proto__ = Student;
};

var Valera = new studying();
    Valera.name = 'Валера';
    Valera.age = 18;
    Valera.weight = 70;

console.log('Человек ', Human);
console.log('Работник ', Worker);
console.log('Студент ', Student);
console.log('Новый работник', Sergey.name + ' в возрасте ' + Sergey.age + ' лет работает в ' + Sergey.job + ' и получает ' + Sergey.salary +' грн. в месяц.');
console.log('А вот студент ', Valera.name + ' -- полнейший лоботряс. Ему '+Valera.age+'. И, хотя он учится в '+Valera.university+', умудряется все время смотреть сериалы. Не будь Валерой.');
