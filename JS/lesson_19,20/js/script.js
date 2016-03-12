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

$('.content__services').mouseover(function(){
  $(this).addClass('hover');
});
$('.content__services').mouseout(function(){
  $(this).removeClass('hover');
});




  var allAccordions = $('.accordion div.data');
  var allAccordionItems = $('.accordion .accordion-item');
  $('.accordion > .accordion-item').click(function() {
    if($(this).hasClass('open'))
    {
      $(this).removeClass('open');
      $(this).next().slideUp("slow");
    }
    else
    {
    allAccordions.slideUp("slow");
    allAccordionItems.removeClass('open');
    $(this).addClass('open');
    $(this).next().slideDown("slow");
    return false;
    }
  });
});