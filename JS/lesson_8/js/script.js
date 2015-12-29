$('body').append('<div class="wrapper">');
$('.wrapper').append('<form>');
$('form').append('<div class="firstname">');
$('.firstname').append('<div class="descript">Firstname:');
$('.firstname').append('<input type="text">');
$('.firstname').append('<em style="display: none; left: -75px;">Please provide your firstname.</em>');
$('form').append('<div class="lastname">');
$('.lastname').append('<div class="descript">Lastname:');
$('.lastname').append('<input type="text">');
$('.lastname').append('<em style="display: none; left: -75px;">Please provide also your lastname.</em>');
$('form').append('<div class="adress">');
$('.adress').append('<div class="descript">Adress:');
$('.adress').append('<input type="text">');
$('.adress').append('<em style="display: none; left: -75px;">Your home or work address.</em>');
$('body').append('<input class="help" type="button" value="Show help">');



$(function() {
	$('form input').hover(function(){
		$(this).next('em').animate({opacity:"show", left:"-65px"}, "slow");
	}, function(){
		$(this).next('em').animate({opacity:"hide", left:"-75px"}, "fast");
	});
	var $em = $('em');
	$('.help').on('click', function() {
		$em.animate({opacity:"show", left:"-65px"}, "slow");
	});
});
