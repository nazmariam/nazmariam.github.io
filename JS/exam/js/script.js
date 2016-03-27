$( function() {

 $('.jcarousel')
  .jcarousel({
    animation: 'slow',
    wrap: 'circular'
  })

  .jcarouselAutoscroll({
    interval: 6000,
    target: '+=1',
    autostart: true
  })
  ;
	$('.jcarousel__arrow-left')
		.on('jcarouselcontrol:active', function() {
			$(this).removeClass('inactive');
		})
		.on('jcarouselcontrol:inactive', function() {
			$(this).addClass('inactive');
		})
		.jcarouselControl({
			target: '-=1'
		});

	$('.jcarousel__arrow-right')
		.on('jcarouselcontrol:active', function() {
			$(this).removeClass('inactive');
		})
		.on('jcarouselcontrol:inactive', function() {
			$(this).addClass('inactive');
		})
		.jcarouselControl({
			target: '+=1'
		});

});