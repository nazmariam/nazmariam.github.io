var array=[]
for (i=0; i<5; i++) {
	array[i]=(prompt ('Введите имя для внесения в массив'));
}
var name, flag=false;
name = prompt('Введите свое имя');
console.log(array);
for (i=0; i<5; i++) {
	if (array[i]==name) {
		flag=true;
	}
}
	if (flag) {
		alert(name+', вы успешно вошли.');
	} else {
		alert("Произошла ошибка входа");	
	}
		