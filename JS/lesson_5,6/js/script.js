var interval;
var msec = 0;
var sec = 1;
var min = 1;
var hrs = 0;
var divMsec;
var divSec;
var divMin;
var divHrs;
var time;
var sp;
function Counter() {
  divMsec = document.getElementById('msecond');
  divSec = document.getElementById('second');
  divMin = document.getElementById('minutes');
  divHrs = document.getElementById('hours');
  // console.log(sec);
   
  divMsec.innerHTML = msec++;
  if (msec==100) {
    msec = 0;
    divMsec.innerHTML ='0'+msec++;
    if (divSec.innerHTML <9) {
    	divSec.innerHTML = '0'+sec++;
    } else divSec.innerHTML = sec++;
  }
   if (sec==61) {
    sec = 0;
    divSec.innerHTML = '0'+sec++;
    if (divMin.innerHTML <9) {
    	divMin.innerHTML = '0'+ min++;
    } else divMin.innerHTML = min++;
  }
   if (min==61) {
    min = 0;
    if (divHrs.innerHTML <9) {
    	divHrs.innerHTML = '0'+hrs++;
    } else divHrs.innerHTML = hrs++;
  }
  time = divHrs.innerHTML +':'+ divMin.innerHTML+':' + divSec.innerHTML+'.' + divMsec.innerHTML;
}
var started = true;
start.onclick = function() {
  //console.log(started);
  createElement('div','splits','.wrapper','');
  var start = document.getElementById('start');
  start.innerHTML = 'Stop';
  if(started)
  {
    started = false;
    interval = setInterval(Counter, 10);
  }
  else
  {
  	start.innerHTML = 'Start';
    started = true;
    clearInterval(interval);
	createElement('div','split','.splits',time);
  }  
};
reset.addEventListener ("click", reseted);
reset.addEventListener ("click", removeSplit);
    function reseted(){
	started = true;
    clearInterval(interval);
    msec = 0;
    sec = 0;
    min = 0;
    hrs = 0;
    divMsec.innerHTML = 0;
    divSec.innerHTML = '00';
    divMin.innerHTML = '00';
    divHrs.innerHTML = '00';  
}
    function removeSplit() {
    	sp = document.querySelector('.splits');
    	sp.parentNode.removeChild(sp);
    }
function createElement (tag, elClass, parent, text) {
	var element = document.createElement(tag);
	element.classList.add(elClass);
	element.innerHTML = text;
	var parent = document.querySelector(parent);
	parent.appendChild(element);
}

split.onclick = function(){
	createElement('div','split','.splits',time);
}