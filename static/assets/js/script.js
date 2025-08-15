$(function () {

    /* sparkline_bar */
    $(".sparkline_bar").sparkline([2, 4, 3, 4, 5, 4, 5, 3, 4], {
        type: 'bar',
        height: 30,
        width: 50,
        barWidth: 4,

        barSpacing: 2,
        colorMap: {
            '9': '#a1a1a1'
        },
        barColor: '#0bd02b'
    });
    /* sparkline_bar31 end */

    /* sparkline_bar31 */
    $(".sparkline_bar31").sparkline([2, 4, 3, 4, 5, 4, 5, 3, 4], {
        type: 'bar',
        height: 30,
        width: 50,
        barWidth: 4,
        barSpacing: 2,
        colorMap: {
            '9': '#a1a1a1'
        },
        barColor: '#fb5da9',
    });
    /* sparkline_bar31 end */




});
$(document).ready(function () {
    $('body').addClass('rtl');
    $('body').removeClass('ltr');
    $("html[lang=en]").attr("dir", "rtl");
    $(".select2-container").attr("dir", "rtl");
    localStorage.setItem("Adminorrtl", true);
    localStorage.removeItem("Adminorltr");
    $("head link#style").attr("href", $(this));
    (document.getElementById("style")?.setAttribute("href", "assets/plugins/bootstrap/css/bootstrap.rtl.min.css"));

    var carousel = $('.owl-carousel');
    $.each(carousel, function (index, element) {
        // element == this
        var carouselData = $(element).data('owl.carousel');
        carouselData.settings.rtl = true; //don't know if both are necessary
        carouselData.options.rtl = true;
        $(element).trigger('refresh.owl.carousel');
    });
    if (document.querySelector('body').classList.contains('horizontal') && !document.querySelector('body').classList.contains('login-img')) {
        checkHoriMenu();
    }
});
