$(function(){

  $('.jcarousel').jcarousel({
    wrap: 'circular',
    transitions: true,
      animation: {
          fadeIn:400,
          fadeOut:400,
          // duration: 1200
          easing:   'linear',
          // complete: function() {
          // }
      }
    })

    .jcarouselAutoscroll({
      interval: 6000,
      target: '+=1',
      autostart: true
    });


  $('.jcarousel_pagination')
    .jcarouselPagination({
        item: function(page) {
            return '<a class = "jcarousel_page" href="#' + page + '"></a>';
        }
    })

    .on('jcarouselpagination:active', 'a', function() {
        $(this).addClass('active');
    })

    .on('jcarouselpagination:inactive', 'a', function() {
        $(this).removeClass('active');
    })
  ;

});