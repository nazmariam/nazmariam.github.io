// бегущие цифры по скролу -------
var scroller = true;
$(window).scroll(function () {
    if (scroller===true) {
        if( $(window).scrollTop() > 300 ) {
            $({ n: 1 }).animate({ n: 25 }, {
                duration: 3000,
                step: function (a) {
                    $(".ben_years").html(a | 0)
                }
            });
            $({ n: 1 }).animate({ n: 20 }, {
                duration: 3000,
                step: function (a) {
                    $(".ben_time").html(a | 0)
                }
            });
            $({ n: 1 }).animate({ n: 17 }, {
                duration: 3000,
                step: function (a) {
                    $(".ben_parts").html(a | 0)
                }
            });
            $({ n: 1 }).animate({ n: 5587 }, {
                duration: 3000,
                step: function (a) {
                    $(".ben_tickets").html(a | 0)
                }
            });
            scroller = false;
        }
    }
});
// бегущие цифры по скролу end ------------
//  dot nav

