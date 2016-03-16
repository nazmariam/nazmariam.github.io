$(function() {

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
  $('.jcarousel').jcarousel({
        // Core configuration goes here
    });

    $('.jcarousel-prev').jcarouselControl({
        target: '-=1'
    });

    $('.jcarousel-next').jcarouselControl({
        target: '+=1'
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
  });
});