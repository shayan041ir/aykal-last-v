(function ($) {
    "use strict";

    // ______________ Page Loading
    $("#global-loader").fadeOut("slow");

    // CARD
    const DIV_CARD = 'div.card';

    // FUNCTIONS FOR COLLAPSED CARD
    $(document).on('click', '[data-bs-toggle="card-collapse"]', function (e) {
        let $card = $(this).closest(DIV_CARD);
        $card.toggleClass('card-collapsed');
        e.preventDefault();
        return false;
    });

    // BACK TO TOP BUTTON
    $(window).on("scroll", function (e) {
        if ($(this).scrollTop() > 0) {
            $('#back-to-top').fadeIn('slow');
        } else {
            $('#back-to-top').fadeOut('slow');
        }
    });
    $(document).on("click", "#back-to-top", function (e) {
        $("html, body").animate({
            scrollTop: 0
        }, 0);
        return false;
    });

    $(".testimonial-carousel").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: true,
        dots: false,
        pauseOnHover: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 520,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    
      $(".feature-logos").slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 520,
            settings: {
              slidesToShow: 2,
            },
          },
        ],
      });
      
      // RTL STYLE START
      $("#myonoffswitch55").on("click", function () {
        if (this.checked) {
          $("body").addClass("rtl");
          $(".slick-slider").slick("slickSetOption", "rtl", true);
          $("html[lang=en]").attr("dir", "rtl");
          $("body").removeClass("ltr");
          $("head link#style").attr("href", $(this));
          document
            .getElementById("style")
            .setAttribute(
              "href",
              "assets/plugins/bootstrap/css/bootstrap.rtl.min.css"
            );
          var carousel = $(".owl-carousel");
          $.each(carousel, function (index, element) {
            // element == this
            var carouselData = $(element).data("owl.carousel");
            carouselData.settings.rtl = true; //don't know if both are necessary
            carouselData.options.rtl = true;
            $(element).trigger("refresh.owl.carousel");
          });
          localStorage.setItem("adminorrtl", true);
          localStorage.removeItem("adminorltr");
        }
      });
    
      // RTL STYLE END
    
      // LTR STYLE START
      $("#myonoffswitch54").on("click", function () {
        if (this.checked) {
          $("body").addClass("ltr");
          $(".slick-slider").slick("slickSetOption", "rtl", false);
          $("html[lang=en]").attr("dir", "ltr");
          $("body").removeClass("rtl");
          $("head link#style").attr("href", $(this));
          document
            .getElementById("style")
            .setAttribute(
              "href",
              "assets/plugins/bootstrap/css/bootstrap.min.css"
            );
          var carousel = $(".owl-carousel");
          $.each(carousel, function (index, element) {
            // element == this
            var carouselData = $(element).data("owl.carousel");
            carouselData.settings.rtl = false; //don't know if both are necessary
            carouselData.options.rtl = false;
            $(element).trigger("refresh.owl.carousel");
          });
          localStorage.setItem("adminorltr", true);
          localStorage.removeItem("adminorrtl");
        }
      });
      // LTR STYLE END
    
      // LIGHT THEME START
      $(document).on("click", "#myonoffswitch1", function () {
        if (this.checked) {
          $("body").removeClass("dark-theme");
          $("body").addClass("light-theme");
          $("#myonoffswitch3").prop("checked", true);
          $("#myonoffswitch6").prop("checked", true);
          localStorage.removeItem("adminordarkMode");
        }
      });
      // LIGHT THEME END
    
      // DARK THEME START
      $(document).on("click", "#myonoffswitch2", function () {
        if (this.checked) {
          $("body").addClass("dark-theme");
          $("body").removeClass("light-theme");
    
          $("#myonoffswitch5").prop("checked", true);
          $("#myonoffswitch8").prop("checked", true);
          localStorage.setItem("adminordarkMode", true);
        }
      });
      // DARK THEME END
      
	//LTR & RTL
	if (!localStorage.getItem('Adminorrtl') && !localStorage.getItem('Adminorltr')) {

		/***************** RTL *********************/
		// $('body').addClass('rtl');
		/***************** RTL *********************/
		/***************** LTR *********************/
		// $('body').addClass('ltr');
		/***************** LTR *********************/

	}
	//Light-mode & Dark-mode
	if (!localStorage.getItem('Adminorlight') && !localStorage.getItem('Adminordark')) {
		/***************** Light THEME *********************/
		// $('body').addClass('light-theme');
		/***************** Light THEME *********************/

		/***************** DARK THEME *********************/
		// $('body').addClass('dark-theme');
		/***************** Dark THEME *********************/
	}
  
    
    
      function landingPageLocalstorage() {
        if (localStorage.getItem("adminorrtl")) {
          $("body").addClass("rtl");
        }
        if (localStorage.getItem("adminordarkMode")) {
          $("body").addClass("dark-theme");
        }
      }
      landingPageLocalstorage();
    
      if ($("body").hasClass("rtl")) {
        $(".slick-slider").slick("slickSetOption", "rtl", true);
        $("#slide-left").removeClass("d-none");
        $("#slide-right").removeClass("d-none");
        $("html[lang=en]").attr("dir", "rtl");
        $("body").removeClass("ltr");
        $("head link#style").attr("href", $(this));
        document
          .getElementById("style")
          .setAttribute(
            "href",
            "assets/plugins/bootstrap/css/bootstrap.rtl.min.css"
          );
        var carousel = $(".owl-carousel");
        $.each(carousel, function (index, element) {
          // element == this
          var carouselData = $(element).data("owl.carousel");
          carouselData.settings.rtl = true; //don't know if both are necessary
          carouselData.options.rtl = true;
          $(element).trigger("refresh.owl.carousel");
        });
    
        $("#myonoffswitch55").prop("checked", true);
      }
      if ($("body").hasClass("dark-theme")) {
        $("body").removeClass("light-theme");
    
        $("#myonoffswitch2").prop("checked", true);
      }
    
      $(document).on("click", '[data-bs-toggle="sidebar"]', function (event) {
        event.preventDefault();
        $(".app").toggleClass("sidenav-toggled");
      });
      
      if (window.innerWidth <= 992) {
        $("body").removeClass("sidenav-toggled");
      }
    let bodyhorizontal = $('body').hasClass('horizontalmenu');
    if (bodyhorizontal) {
        if (window.innerWidth >= 992) {
            let subNavSub = document.querySelectorAll('.sub-nav-sub');
            subNavSub.forEach((e) => {
                e.style.display = '';
            })
            let subNav = document.querySelectorAll('.nav-sub')
            subNav.forEach((e) => {
                e.style.display = '';
            })
        }
        $('body').addClass('horizontalmenu');
        $('body').removeClass('leftmenu');
        $('body').removeClass('main-body');
        $('.main-content').addClass('hor-content');
        $('.main-header').addClass(' hor-header');
        $('.main-header').removeClass('sticky');
        $('.main-content').removeClass('side-content');
        $('.main-container').addClass('container');
        $('.main-container-1').addClass('container');
        $('.main-container').removeClass('container-fluid');
        $('.main-menu').addClass('main-navbar hor-menu');
        $('.main-menu').removeClass('main-sidebar main-sidebar-sticky side-menu');
        $('.main-container-1').removeClass('main-sidebar-header');
        $('.main-body-1').removeClass('main-sidebar-body');
        $('.menu-icon').removeClass('sidemenu-icon');
        $('.menu-icon').addClass('hor-icon');
        $('body').removeClass('default-menu');
        $('body').removeClass('closed-leftmenu');
        $('body').removeClass('icontext-menu');
        $('body').removeClass('main-sidebar-hide');
        $('body').removeClass('main-sidebar-open');
        $('body').removeClass('icon-overlay');
        $('body').removeClass('hover-submenu');
        $('body').removeClass('hover-submenu1');
        $('body').removeClass('double-menu');
        $('body').removeClass('double-menu-tabs');
        $('body').removeClass('color-header ');
        $('body').removeClass('dark-header');
        $('body').removeClass('light-header');
        $('body').removeClass('light-menu');
        $('body').removeClass('color-menu');
        $('body').removeClass('dark-menu');
        if (document.querySelector('body').classList.contains('horizontalmenu')) {
        }
    }

    //sticky-header
    $(window).on("scroll", function (e) {
        if ($(window).scrollTop() >= 70) {
            $('.app-header').addClass('fixed-header');
            $('.app-header').addClass('visible-title');
        } else {
            $('.app-header').removeClass('fixed-header');
            $('.app-header').removeClass('visible-title');
        }
    });

    $(window).on("scroll", function (e) {
        if ($(window).scrollTop() >= 70) {
            $('.horizontalmenu-main').addClass('fixed-header');
            $('.horizontalmenu-main').addClass('visible-title');
        } else {
            $('.horizontalmenu-main').removeClass('fixed-header');
            $('.horizontalmenu-main').removeClass('visible-title');
        }
    });
    $(document).on('click', '#mainSidebarToggle', function (event) {
        event.preventDefault();
        $('.app').toggleClass('sidenav-toggled');
    });

    if (window.innerWidth <= 992) {
        $('body').removeClass('sidenav-toggled');
    }

})(jQuery);

// FOOTER
document.getElementById("year").innerHTML = new Date().getFullYear();

window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {

        var windowHeight = window.innerHeight;
        var cardTop = reveals[i].getBoundingClientRect().top;
        var cardRevealPoint = 150;

        //   console.log('condition', windowHeight - cardRevealPoint)

        if (cardTop < windowHeight - cardRevealPoint) {
            reveals[i].classList.add('active');
        }
        else {
            reveals[i].classList.remove('active');
        }
    }
}

reveal();

// ==== for menu scroll
const pageLink = document.querySelectorAll(".side-menu__item");

pageLink.forEach((elem) => {
    elem.addEventListener("click", (e) => {
        const href = elem.getAttribute("href");
        if(href.startsWith("#")){
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    offsetTop: 1 - 60,
                });
            }
        }
    });
});

// section menu active
function onScroll(event) {
    const sections = document.querySelectorAll(".side-menu__item");
    const scrollPos =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

    sections.forEach((elem) => {
        const val = elem.getAttribute("href");
        const refElement = document.querySelector(val);
        const scrollTopMinus = scrollPos + 73;
        if (
            refElement.offsetTop <= scrollTopMinus &&
            refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
        ) {
            elem.classList.add("active");
        } else {
            elem.classList.remove("active");
        }
    })
}
window.document.addEventListener("scroll", onScroll);


// RESET SWITCHER TO DEFAULT
function resetData() {
  $('#myonoffswitch23').prop('checked', true);
  $('#myonoffswitch1').prop('checked', true);
  $('body').addClass('ltr');
  $('.slick-slider').slick('slickSetOption', 'rtl', false);
  $("html[lang=en]").attr("dir", "ltr");
  $('body').removeClass('rtl');
  $("head link#style").attr("href", $(this));
  (document.getElementById("style").setAttribute("href", "assets/plugins/bootstrap/css/bootstrap.min.css"));
  var carousel = $('.owl-carousel');
  $.each(carousel, function (index, element) {
      // element == this
      var carouselData = $(element).data('owl.carousel');
      carouselData.settings.rtl = false; //don't know if both are necessary
      carouselData.options.rtl = false;
      $(element).trigger('refresh.owl.carousel');
  });   
  $('body').removeClass('dark-theme');
  $('body').removeClass('rtl');
  $('body').addClass('light-theme');
  $('#myonoffswitch1').prop('checked', true);
  $('#myonoffswitch54').prop('checked', true);
  localStorage.clear()
}
  
document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 1,  
    spaceBetween: 30,  
    autoplay: {
      delay: 3000,  
    },
    breakpoints: {
      0: { 
        slidesPerView: 1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1440: {
        slidesPerView: 5,
        spaceBetween: 40,
      },
    }
    
  });
});
// Max length for paragraph of blog in swiper
document.querySelectorAll('.text-ellipsis').forEach( p => {
  const maxLength = 200;
  let paragraph = p.textContent.trim();
  if(paragraph.length > maxLength) {
    p.textContent = paragraph.substring(0, maxLength) + '...';
  }
});