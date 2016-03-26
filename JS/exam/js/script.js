$( function() {

	$('.grid').isotope({
		itemSelector: '.grid__item',
		layoutMode: 'fitRows',
	});



	$('.jcarousel').jcarousel({
		animation: 'slow',
		wrap: 'circular'
	})

	.jcarouselAutoscroll({
		interval: 1000,
		target: '+=1',
		autostart: false
	});

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



	$.ajax({
		url: 'https://pixabay.com/api/?key=2265192-51dd2c2f31ead2f01bfba0ce5&image_type=photo',
		dataType: 'json',
		success: loadImages
	});

	$('.partners-search__submit').on('click', function(e) {
		e.preventDefault();
		getNewImages();
	});


	function getNewImages() {
		var queryPhrase = encodeURIComponent( $('.partners-search__input').val() );
		var queryLength = $('.grid__item').length;
		$.ajax({
			url: 'https://pixabay.com/api/?key=2265192-51dd2c2f31ead2f01bfba0ce5&q=' + queryPhrase + '&image_type=photo',
			dataType: 'json',
			success: loadImages
		});
	};

	function loadImages(data) {
		var i = 0;
		$('.grid__image').each(function () {
			var src = data.hits[i].webformatURL;
			$(this).attr('src', src);
			i++;
		});
		i = 0;
	};

});