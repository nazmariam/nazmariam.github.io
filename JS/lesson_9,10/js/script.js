// $(function () {
// 	var $links = $('.menu a');
// 	$links.on('click', function(e) {
// 		var $submenu = $(this).siblings('.submenu');
// 		e.preventDefault();
// 		$submenu.slideToggle();
// 	});
// });

$(function(){

  var showDropdown = function () {
    $(this).children('.submenu')
      .show(300);
  };

  var hideDropdown = function () {
    $(this).children('.submenu')
      .hide(300);
  };

  $('li.sub').hover( showDropdown, hideDropdown );

  });