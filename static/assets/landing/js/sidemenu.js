(function() {
    'use strict'
    
    $('.landing-app-sidebar').on('scroll', function() {
        let s = $(".landing-app-sidebar .ps__rail-y");
        if (s[0].style.top.split('px')[0] <= 60 ) {
            $('.landing-app-sidebar').removeClass('sidemenu-scroll')
        } else {
            $('.landing-app-sidebar').addClass('sidemenu-scroll')
        }

    })

})();