
  $(function() {

  	var html = $('#CV').html();
  	var data = {
      name: 'Федірко Марія Олексіївна',
  		img: '"img/me.jpg"',
  		speciality: 'Ведущий инженер по сопровождению производственно-технических программ',
  		firstLine: 'не хватает в жизни творчества и креатива',
  		secondLine: 'инженером-электриком быть грустно, если ты блондинка',
  		thirdLine: 'муж - бэкэндщик',
      phoneNumber: '+380660034001',
  		vk: '"http://vk.com/nazmariam"',
  		feedback: 'Я б в фронтендщики пошла - пусть меня научат',
  	};
   	var content = tmpl(html, data);
   
  	$('body').append(content);
  	
    $('.carousel-hider').carousel();
  });