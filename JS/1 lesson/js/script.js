
function pow(num, rate){
	if (rate<0) {
		rate = (-1)*rate;
		res=1;
		i=0;
		while (i<rate) {
			res=res*num;
			i++;
		} 
			res=1/res;
	} else {
		res=1;
		i=0;
		while (i<rate) {
			res=res*num;
			i++;
		}
	}
	return res;
}

var a, b;
a = prompt ("Введите число");
b = prompt ("Введите степень");
console.log("Result:",pow(a,b));