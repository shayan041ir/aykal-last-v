

	/*****************Light Layout Start*****************/
	$(document).on("click", '#myonoffswitch1', function () {
		if (this.checked) {
			$('body').addClass('light-theme');
			$('body').removeClass('dark-theme');
			$('body').removeClass('color-header');
			$('body').removeClass('dark-header');
			$('body').removeClass('dark-menu');
			$('body').removeClass('color-menu');
			localStorage.setItem("AdminorlightMode" , true);
			localStorage.removeItem("AdminordarkMode");

			$('#myonoffswitch3').prop('checked', true);
			$('#myonoffswitch5').prop('checked', false);
			$('#myonoffswitch8').prop('checked', false);

			checkOptions();
			// const root = document.querySelector(':root');
			// root.style = "";
			// names()Adminor
		} else {
			$('body').removeClass('light-theme');
			localStorage.removeItem("AdminorlightMode");
		}
		localStorageBackup();
	});
	/*****************Light Layout End*****************/

	/*****************Dark Layout Start*****************/
	$(document).on("click", '#myonoffswitch2', function () {
		if (this.checked) {
			$('body').addClass('dark-theme');
			$('#myonoffswitch5').prop('checked', true);
			$('#myonoffswitch8').prop('checked', true);
			$('body').removeClass('light-theme');
			$('body').removeClass('light-menu');
			$('body').removeClass('color-menu');
			$('body').removeClass('dark-menu');
			$('body').removeClass('dark-header');
			$('body').removeClass('color-header');
			$('body').removeClass('light-header');
			localStorage.setItem("AdminordarkMode" , true);
			localStorage.removeItem("AdminorlightMode");


			$('#myonoffswitch3').prop('checked', false);
			$('#myonoffswitch6').prop('checked', false);
			$('#myonoffswitchTransparent').prop('checked', false);
			//
			checkOptions();

			const root = document.querySelector(':root');
			root.style = "";
			names()
		} else {
			$('body').removeClass('dark-theme');
			localStorage.removeItem("AdminordarkMode");
		}
		localStorageBackup()
	});
    /*****************Dark Layout End*****************/

	/*****************Light Menu Start*****************/
	$(document).on("click", '#myonoffswitch3', function () {
		if (this.checked) {
			$('body').addClass('light-menu');
			$('body').removeClass('color-menu');
			$('body').removeClass('dark-menu');
			localStorage.setItem("Adminorlightmenu", true);
			localStorage.removeItem("Adminorcolormenu");
			localStorage.removeItem("Adminordarkmenu");
		}
	});
	/*****************Light Menu End*****************/

	/*****************Color Menu Start*****************/
	$(document).on("click", '#myonoffswitch4', function () {
		if (this.checked) {
			$('body').addClass('color-menu');
			$('body').removeClass('light-menu');
			$('body').removeClass('dark-menu');
			localStorage.setItem("Adminorcolormenu", true);
			localStorage.removeItem("Adminorlightmenu");
			localStorage.removeItem("Adminordarkmenu");
		}
	});
	/*****************Color Menu End*****************/

	/*****************Dark Menu Start*****************/
	$(document).on("click", '#myonoffswitch5', function () {
		if (this.checked) {
			$('body').addClass('dark-menu');
			$('body').removeClass('color-menu');
			$('body').removeClass('light-menu');
			localStorage.setItem("Adminordarkmenu", true);
			localStorage.removeItem("Adminorlightmenu");
			localStorage.removeItem("Adminorcolormenu");
		}
	});
	/*****************Dark Menu End*****************/

	/*****************Light Header Start*****************/
	$(document).on("click", '#myonoffswitch6', function () {
		if (this.checked) {
			$('body').addClass('light-header');
			$('body').removeClass('color-header');
			$('body').removeClass('dark-header');
			localStorage.setItem("Adminorlightheader", true);
			localStorage.removeItem("Adminorcolorheader");
			localStorage.removeItem("Adminordarkheader");
		}
	});
	/*****************Light Header End*****************/

	/*****************Color Header Start*****************/
	$(document).on("click", '#myonoffswitch7', function () {
		if (this.checked) {
			$('body').addClass('color-header');
			$('body').removeClass('light-header');
			$('body').removeClass('dark-header');
			localStorage.setItem("Adminorcolorheader", true);
			localStorage.removeItem("Adminorlightheader");
			localStorage.removeItem("Adminordarkheader");
		}
	});
	/*****************Color Header End*****************/

	/*****************Dark Header Start*****************/
	$(document).on("click", '#myonoffswitch8', function () {
		if (this.checked) {
			$('body').addClass('dark-header');
			$('body').removeClass('color-header');
			$('body').removeClass('light-header');
			localStorage.setItem("Adminordarkheader", true);
			localStorage.removeItem("Adminorlightheader");
			localStorage.removeItem("Adminorcolorheader");
			
		}
	});
	/*****************Dark Header End*****************/


	/*****************Full Width Layout Start*****************/
	$(document).on("click", '#myonoffswitch9', function () {
		if (this.checked) {
			$('body').addClass('layout-fullwidth');
			if (document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
				checkHoriMenu();
			}
			$('body').removeClass('layout-boxed');
		}
	});
	/*****************Full Width Layout End*****************/

	/*****************Boxed Layout Start*****************/
	$(document).on("click", '#myonoffswitch10', function () {
		if (this.checked) {
			$('body').addClass('layout-boxed');
			if (document.querySelector('body').classList.contains('horizontal')) {
				checkHoriMenu();
			}
			$('body').removeClass('layout-fullwidth');
		}
	});
	/*****************Boxed Layout End*****************/

	/*****************Header-Position Styles Start*****************/
	$(document).on("click", '#myonoffswitch11', function () {
		if (this.checked) {
			$('body').addClass('fixed-layout');
			$('body').removeClass('scrollable-layout');
		}
	});
	$(document).on("click", '#myonoffswitch12', function () {
		if (this.checked) {
			$('body').addClass('scrollable-layout');
			$('body').removeClass('fixed-layout');
		}
	});
	/*****************Header-Position Styles End*****************/


	/*****************Default Sidemenu Start*****************/
	$(document).on("click", '#myonoffswitch13', function () {
		if (this.checked) {
			$('body').addClass('default-menu');
			$('body').removeClass('closed-menu');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('sideicon-menu');
			$('body').removeClass('sidenav-toggled');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('hover-submenu1');
			$('body').removeClass('double-menu');
			$('body').removeClass('double-menu-tabs');
			localStorage.setItem(" Adminordefaultmenu", true);
			localStorage.removeItem("Adminorclosedmenu");
			localStorage.removeItem("Adminoricontextmenu");
			localStorage.removeItem("Adminorsideiconmenu");
			localStorage.removeItem("Adminorhoversubmenu");
			localStorage.removeItem("Adminorhoversubmenu1");
			localStorage.removeItem("Adminordoublemenutabs");
			localStorage.removeItem("Adminordoublemenu");
		}
	});
	/*****************Default Sidemenu End*****************/


	/*****************Closed Sidemenu Start*****************/
	$(document).on("click", '#myonoffswitch30', function () {
		if (this.checked) {
			$('body').addClass('closed-menu');
			hovermenu();
			$('body').addClass('sidenav-toggled');
			$('body').removeClass('default-menu');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('sideicon-menu');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('hover-submenu1');
			$('body').removeClass('double-menu');
			$('body').removeClass('double-menu-tabs');
			localStorage.setItem("Adminorclosedmenu", true);
			localStorage.removeItem("Adminordefaultmenu");
			localStorage.removeItem("Adminoricontextmenu");
			localStorage.removeItem("Adminorsideiconmenu");
			localStorage.removeItem("Adminorhoversubmenu");
			localStorage.removeItem("Adminorhoversubmenu1");
			localStorage.removeItem("Adminordoublemenutabs");
			localStorage.removeItem("Adminordoublemenu");
		}
	});
	/*****************Closed Sidemenu End*****************/


	/*****************Hover Submenu Start*****************/
	$(document).on("click", '#myonoffswitch32', function () {
		if (this.checked) {
			$('body').addClass('hover-submenu');
			hovermenu();
			$('body').addClass('sidenav-toggled');
			$('body').removeClass('default-menu');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('sideicon-menu');
			$('body').removeClass('closed-menu');
			$('body').removeClass('hover-submenu1');
			$('body').removeClass('double-menu');
			$('body').removeClass('double-menu-tabs');
			localStorage.setItem("Adminorhoversubmenu", true);
			localStorage.removeItem("Adminordefaultmenu");
			localStorage.removeItem("Adminorclosedmenu");
			localStorage.removeItem("Adminoricontextmenu");
			localStorage.removeItem("Adminorsideiconmenu");
			localStorage.removeItem("Adminorhoversubmenu1");
			localStorage.removeItem("Adminordoublemenutabs");
			localStorage.removeItem("Adminordoublemenu");
			if (document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
			}
		}
	});
	/*****************Hover Submenu End*****************/

	/*****************Hover Submenu 1 Start*****************/
	$(document).on("click", '#myonoffswitch33', function () {
		if (this.checked) {
			$('body').addClass('hover-submenu1');
			hovermenu();
			$('body').addClass('sidenav-toggled');
			$('body').removeClass('default-menu');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('sideicon-menu');
			$('body').removeClass('closed-menu');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('double-menu');
			$('body').removeClass('double-menu-tabs');
			localStorage.setItem("Adminorhoversubmenu1", true);
			localStorage.removeItem("Adminordefaultmenu");
			localStorage.removeItem("Adminorclosedmenu");
			localStorage.removeItem("Adminoricontextmenu");
			localStorage.removeItem("Adminorsideiconmenu");
			localStorage.removeItem("Adminorhoversubmenu");
			localStorage.removeItem("Adminordoublemenutabs");
			localStorage.removeItem("Adminordoublemenu");
			if (document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
			}
		}
	});
	/*****************Hover Submenu 1 End*****************/


	/*****************Icon Text Sidemenu Start*****************/
	$(document).on("click", '#myonoffswitch14', function () {
		if (this.checked) {
			$('body').addClass('icontext-menu');
			icontext();
			$('body').addClass('sidenav-toggled');
			$('body').removeClass('default-menu');
			$('body').removeClass('sideicon-menu');
			$('body').removeClass('closed-menu');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('hover-submenu1');
			$('body').removeClass('double-menu');
			$('body').removeClass('double-menu-tabs');
			localStorage.setItem("Adminoricontextmenu", true);
			localStorage.setItem("Adminoricontextmenu", true);
			localStorage.removeItem("Adminordefaultmenu");
			localStorage.removeItem("Adminorclosedmenu");
			localStorage.removeItem("Adminorsideiconmenu");
			localStorage.removeItem("Adminorhoversubmenu");
			localStorage.removeItem("Adminorhoversubmenu1");
			localStorage.removeItem("Adminordoublemenutabs");
			localStorage.removeItem("Adminordoublemenu");
			if (document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
			}

		}
	});
	/*****************Icon Text Sidemenu End*****************/

	/*****************Icon Overlay Sidemenu Start*****************/
	$(document).on("click", '#myonoffswitch15', function () {
		if (this.checked) {
			$('body').addClass('sideicon-menu');
			hovermenu();
			$('body').addClass('sidenav-toggled');
			$('body').removeClass('default-menu');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('closed-menu');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('hover-submenu1');
			$('body').removeClass('double-menu');
			$('body').removeClass('double-menu-tabs');
			localStorage.setItem("Adminorsideiconmenu", true);
			localStorage.removeItem("Adminordefaultmenu");
			localStorage.removeItem("Adminorclosedmenu");
			localStorage.removeItem("Adminoricontextmenu");
			localStorage.removeItem("Adminorhoversubmenu");
			localStorage.removeItem("Adminorhoversubmenu1");
			localStorage.removeItem("Adminordoublemenutabs");
			localStorage.removeItem("Adminordoublemenu");
		}
	});
	/*****************Icon Overlay Sidemenu End*****************/

	

	/***************** DOUBLE-MENU Start*********************/
	$(document).on("click", '#switchbtn-doublemenu', function () {
		if (this.checked) {
			$('body').addClass('double-menu');
			doubleLayoutFn();
			$('body').removeClass('default-menu');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('sideicon-menu');
			$('body').removeClass('closed-menu');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('hover-submenu1');
			$('body').removeClass('double-menu-tabs');
			$('body').removeClass('default-horizontal');
			$('body').removeClass('centerlogo-horizontal');
			$('body').removeClass('sidenav-toggled');
			$('body').removeClass('sidenav-toggled-open');
			localStorage.setItem("Adminordoublemenu", true);
			localStorage.removeItem("Adminordefaultmenu");
			localStorage.removeItem("Adminorclosedmenu");
			localStorage.removeItem("Adminoricontextmenu");
			localStorage.removeItem("Adminoriconoverlay");
			localStorage.removeItem("Adminorhoversubmenu");
			localStorage.removeItem("Adminorhoversubmenu1");
			localStorage.removeItem("Adminordoublemenutabs");
			localStorage.removeItem("Adminordefaultlogo");
			if (document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
			}
		}
	});
	/***************** DOUBLE-MENU End*********************/

	/***************** DOUBLE-MENU-TABS Start*********************/
	$(document).on("click", '#switchbtn-doublemenutabs', function () {
		if (this.checked) {
			$('body').addClass('double-menu-tabs');
			doubleLayoutFn();
			$('body').removeClass('default-menu');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('sideicon-menu');
			$('body').removeClass('closed-menu');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('hover-submenu1');
			$('body').removeClass('double-menu');
			$('body').removeClass('default-horizontal');
			$('body').removeClass('sidenav-toggled');
			$('body').removeClass('sidenav-toggled-open');
			localStorage.setItem("Adminordoublemenutabs", true);
			localStorage.removeItem("Adminordefaultmenu");
			localStorage.removeItem("Adminorclosedmenu");
			localStorage.removeItem("Adminoricontextmenu");
			localStorage.removeItem("Adminorsideiconmenu");
			localStorage.removeItem("Adminorhoversubmenu");
			localStorage.removeItem("Adminorhoversubmenu1");
			localStorage.removeItem("Adminordoublemenu");
			localStorage.removeItem("Adminordefaultlogo");
			if (document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
			}
		}
	});
	/***************** DOUBLE-MENU-TABS End*********************/

	/***************** Sidemenu start*****************/
	$(document).on("click", '#myonoffswitch34', function () {
		if (this.checked) {
			ActiveSubmenu();
			$('body').removeClass('horizontal');
			$('body').removeClass('horizontal-hover');
			$(".main-content").removeClass("horizontal-content");
			$(".main-content").addClass("app-content");
			$(".main-container").removeClass("container");
			$(".main-container").addClass("container-fluid");
			$(".main-header").removeClass("hor-header");
			$(".main-header").addClass("side-header");
			$(".app-sidebar").removeClass("horizontal-main")
			$(".main-sidemenu").removeClass("container")
			$('#slide-left').removeClass('d-none');
			$('#slide-right').removeClass('d-none');
			$('body').addClass('sidebar-mini');			
			$('#myonoffswitch13').prop('checked', true);
			localStorage.setItem("Adminorvertical", true);
			localStorage.removeItem("Adminorhorizontal");
			localStorage.removeItem("AdminorhorizontalHover");
			menuClick();
			if (document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
				checkHoriMenu();
			}
			responsive();
		} else {
			$('body').removeClass('sidebar-mini');
			localStorage.setItem("Adminorsidebar-mini", "False");
		}
	});

	/***************** Sidemenu end*****************/


	/***************** horizontal click start*****************/
	$(document).on("click", '#myonoffswitch35', function () {
		if (this.checked) {
			if (window.innerWidth >= 992) {
				let li = document.querySelectorAll('.side-menu li')
				li.forEach((e, i) => {
					e.classList.remove('is-expanded')
				})
				var animationSpeed = 300;
				// first level
				var parent = $("[data-bs-toggle='sub-slide']").parents('ul');
				var ul = parent.find('ul[class^="slide-menu"]:visible').slideUp(animationSpeed);
				ul.removeClass('open');
				var parent1 = $("[data-bs-toggle='sub-slide2']").parents('ul');
				var ul1 = parent1.find('ul[class^="sub-slide-menu"]:visible').slideUp(animationSpeed);
				ul1.removeClass('open');
			}
			$('body').addClass('horizontal');
			$(".main-content").addClass("horizontal-content");
			$(".main-content").removeClass("app-content");
			$(".main-container").addClass("container");
			$(".main-container").removeClass("container-fluid");
			$(".main-header").addClass("hor-header");
			$(".main-header").removeClass("side-header");
			$(".app-sidebar").addClass("horizontal-main")
			$(".main-sidemenu").addClass("container")
			$('body').removeClass('sidebar-mini');
			$('body').removeClass('sidenav-toggled');
			$('body').removeClass('horizontal-hover');
			$('body').removeClass('closed-menu');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('hover-submenu1');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('sideicon-menu');
			$('body')?.removeClass('double-menu-tabs');
			$('body')?.removeClass('double-menu');
			$(".tab-content-show").addClass("active");
			$(".tab-content-double").removeClass("active")
			$('.slide-menu')?.removeClass('double-menu-active');
			localStorage.setItem("Adminorhorizontal", true);
			localStorage.removeItem("AdminorhorizontalHover");
			localStorage.removeItem("Adminordoublemenutabs");
			localStorage.removeItem("Adminorvertical");
			// $('#slide-left').removeClass('d-none');
			// $('#slide-right').removeClass('d-none');
			if (document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
				document.querySelector('.horizontal .side-menu').style.flexWrap = 'noWrap';
				checkHoriMenu();
				ActiveSubmenu();
				responsive();
				menuClick();
			}
		}
	});
	/***************** horizontal click end*****************/

	/***************** horizontal hover start*****************/
	$(document).on("click", '#myonoffswitch111', function () {
		if (this.checked) {
			let li = document.querySelectorAll('.side-menu li')
			li.forEach((e, i) => {
				e.classList.remove('is-expanded')
			})
			var animationSpeed = 300;
			// first level
			var parent = $("[data-bs-toggle='sub-slide']").parents('ul');
			var ul = parent.find('ul[class^="slide-menu"]:visible').slideUp(animationSpeed);
			ul.removeClass('open');
			var parent1 = $("[data-bs-toggle='sub-slide2']").parents('ul');
			var ul1 = parent1.find('ul[class^="sub-slide-menu"]:visible').slideUp(animationSpeed);
			ul1.removeClass('open');	
			$('body').addClass('horizontal-hover');
			$('body').addClass('horizontal');
			let subNavSub = document.querySelectorAll('.sub-slide-menu');
			subNavSub.forEach((e) => {
				e.style.display = '';
			})
			let subNav = document.querySelectorAll('.slide-menu')
			subNav.forEach((e) => {
				e.style.display = '';
			})
			// $('#slide-left').addClass('d-none');
			// $('#slide-right').addClass('d-none');
			$(".main-content").addClass("horizontal-content");
			$(".main-content").removeClass("app-content");
			$(".main-container").addClass("container");
			$(".main-container").removeClass("container-fluid");
			$(".main-header").addClass("hor-header");
			$(".main-header").removeClass("side-header");
			$(".app-sidebar").addClass("horizontal-main")
			$(".main-sidemenu").addClass("container")
			$('body').removeClass('sidebar-mini');
			$('body').removeClass('sidenav-toggled');
			$('body').removeClass('closed-menu');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('hover-submenu1');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('sideicon-menu');
			$('body')?.removeClass('double-menu-tabs');
			$('body')?.removeClass('double-menu');
			// $(".tab-content-show").addClass("active");
			// $(".tab-content-double").removeClass("active")
			$('.slide-menu')?.removeClass('double-menu-active');
			localStorage.setItem("AdminorhorizontalHover", true);
			localStorage.removeItem("Adminorhorizontal");
			localStorage.removeItem("Adminordoublemenutabs");
			localStorage.removeItem("Adminorvertical");
			if (document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
				document.querySelector('.horizontal .side-menu').style.flexWrap = 'noWrap';
				checkHoriMenu();
				ActiveSubmenu();
				responsive();
				menuClick();
				HorizontalHovermenu();
			}
		}
	});
	/***************** horizontal hover end*****************/

	/***************** RTL*****************/
	$(document).on("click", '#myonoffswitch55', function () {
		if (this.checked) {
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
			if (document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
				checkHoriMenu();
			}
		}
	});
	/***************** RTL end*****************/

	/***************** LTR*****************/
	$(document).on("click", '#myonoffswitch54', function () {

		if (this.checked) {
			$('body').addClass('ltr');
			$('body').removeClass('rtl');
			$("html[lang=en]").attr("dir", "ltr");
			$(".select2-container").attr("dir", "ltr");
			localStorage.setItem("Adminorltr", true);
			localStorage.removeItem("Adminorrtl");
			$("head link#style").attr("href", $(this));
			(document.getElementById("style")?.setAttribute("href", "assets/plugins/bootstrap/css/bootstrap.min.css"));
			var carousel = $('.owl-carousel');
			$.each(carousel, function (index, element) {
				// element == this
				var carouselData = $(element).data('owl.carousel');
				carouselData.settings.rtl = false; //don't know if both are necessary
				carouselData.options.rtl = false;
				$(element).trigger('refresh.owl.carousel');
				if (document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
					checkHoriMenu();
				}
			});
		} else {
			$('body').removeClass('ltr');
			$('body').addClass('rtl');
			$(".select2-container").attr("dir", "rtl");
			localStorage.setItem("Adminorltr", "false");
			$("head link#style").attr("href", $(this));
			(document.getElementById("style")?.setAttribute("href", "assets/plugins/bootstrap/css/bootstrap.rtl.min.css"));
		}
	});
   /***************** LTR*****************/


function resetData() {
	'use strict'
	$('#myonoffswitch3').prop('checked', true);
	$('#myonoffswitch1').prop('checked', true);
	$('#myonoffswitch9').prop('checked', true);
	$('#myonoffswitch11').prop('checked', true);
	$('#myonoffswitch13').prop('checked', true);
	$('#myonoffswitch07').prop('checked', true);
	$('#myonoffswitch03').prop('checked', true);
	$('#myonoffswitch54').prop('checked', true);
	$('#myonoffswitch34').prop('checked', true);
	$('body')?.removeClass('dark-theme');
	$('body')?.removeClass('dark-menu');
	$('body')?.removeClass('light-menu');
	$('body')?.removeClass('color-menu');
	$('body')?.removeClass('dark-header');
	$('body')?.removeClass('light-header');
	$('body')?.removeClass('color-header');
	$('body')?.removeClass('layout-boxed');
	$('body')?.removeClass('icontext-menu');
	$('body')?.removeClass('sideicon-menu');
	$('body')?.removeClass('closed-menu');
	$('body')?.removeClass('hover-submenu');
	$('body')?.removeClass('hover-submenu1');
	$('body')?.removeClass('scrollable-layout');
	$('body')?.removeClass('sidenav-toggled');
	$('body')?.removeClass('double-menu-tabs');
	$('body')?.removeClass('double-menu');
	$('.slide-menu')?.removeClass('double-menu-active');


	$('body').removeClass('horizontal');
	$('body').removeClass('horizontal-hover');
	$(".main-content").removeClass("horizontal-content");
	$(".main-content").addClass("app-content");
	$(".main-container").removeClass("container");
	$(".main-container").addClass("container-fluid");
	$(".main-header").removeClass("hor-header");
	$(".main-header").addClass("side-header");
	$(".app-sidebar").removeClass("horizontal-main")
	$(".tab-content-show").addClass("active");
	$(".tab-content-double").removeClass("active")
	$(".main-sidemenu").removeClass("container")
	$('#slide-left').removeClass('d-none');
	$('#slide-right').removeClass('d-none');
	$('body').addClass('sidebar-mini');
	menuClick();
	if (document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
		checkHoriMenu();
	}
	responsive();





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
}

function checkOptions() {
	'use strict'

	// horizontal
	if (document.querySelector('body').classList.contains('horizontal')) {
		$('#myonoffswitch35').prop('checked', true);
	}

	// horizontal-hover
	if (document.querySelector('body').classList.contains('horizontal-hover')) {
		$('#myonoffswitch111').prop('checked', true);
	}

	//RTL
	if (document.querySelector('body').classList.contains('rtl')) {
		$('#myonoffswitch55').prop('checked', true);
	}

	//Datk-theme
	if (document.querySelector('body').classList.contains('dark-theme')) {
		$('#myonoffswitch2').prop('checked', true);
	}

	// light header
	if (document.querySelector('body').classList.contains('light-header')) {
		$('#myonoffswitch6').prop('checked', true);
	}
	// color header
	if (document.querySelector('body').classList.contains('color-header')) {
		$('#myonoffswitch7').prop('checked', true);
	}
	// dark header
	if (document.querySelector('body').classList.contains('dark-header')) {
		$('#myonoffswitch8').prop('checked', true);
	}

	// light menu
	if (document.querySelector('body').classList.contains('light-menu')) {
		$('#myonoffswitch3').prop('checked', true);
	}
	// color menu
	if (document.querySelector('body').classList.contains('color-menu')) {
		$('#myonoffswitch4').prop('checked', true);
	}
	// dark menu
	if (document.querySelector('body').classList.contains('dark-menu')) {
		$('#myonoffswitch5').prop('checked', true);
	}
	
	// closed-menu
	if (document.querySelector('body').classList.contains('closed-menu')) {
		$('#myonoffswitch30').prop('checked', true);
	}
	// icontext-menu
	if (document.querySelector('body').classList.contains('icontext-menu')) {
		$('#myonoffswitch14').prop('checked', true);
	}
	// sideicon-menu
	if (document.querySelector('body').classList.contains('sideicon-menu')) {
		$('#myonoffswitch15').prop('checked', true);
	}
	// hover-submenu
	if (document.querySelector('body').classList.contains('hover-submenu')) {
		$('#myonoffswitch32').prop('checked', true);
	}
	// hover-submenu1
	if (document.querySelector('body').classList.contains('hover-submenu1')) {
		$('#myonoffswitch33').prop('checked', true);
	}
	// double-menu
	if (document.querySelector('body').classList.contains('double-menu')) {
		$('#switchbtn-doublemenu').prop('checked', true);
	}
	// double-menu-tabs
	if (document.querySelector('body').classList.contains('double-menu-tabs')) {
		$('#switchbtn-doublemenutabs').prop('checked', true);
	}
}
checkOptions()
	/***************** Add Switcher Classes *********************/
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

	//Vertical-menu & Horizontal-menu
	if (!localStorage.getItem('Adminorvertical') && !localStorage.getItem('Adminorhorizontal') && !localStorage.getItem('AdminorhorizontalHover')) {
		/***************** Horizontal THEME *********************/
		// $('body').addClass('horizontal');
		/***************** Horizontal THEME *********************/

		/***************** Horizontal-Hover THEME *********************/
		// $('body').addClass('horizontal-hover');
		/***************** Horizontal-Hover THEME *********************/
	}

	//Vertical Layout Style
	if (!localStorage.getItem('Adminordefaultmenu') && !localStorage.getItem('Adminorclosedmenu') && !localStorage.getItem('Adminoricontextmenu')&& !localStorage.getItem('Adminorsideiconmenu')&& !localStorage.getItem('Adminorhoversubmenu')&& !localStorage.getItem('Adminorhoversubmenu1')) {
		/**Default-Menu**/
		// $('body').addClass('default-menu');
		/**Default-Menu**/

		/**closed-Menu**/
		// $('body').addClass('closed-menu');
		// $('body').addClass('sidenav-toggled');
		/**closed-Menu**/

		/**Icon-Text-Menu**/
		// $('body').addClass('icontext-menu');
		// $('body').addClass('sidenav-toggled');
		// if (document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
			// icontext();
		// }
		/**Icon-Text-Menu**/

		/**Icon-Overlay-Menu**/
		// $('body').addClass('sideicon-menu');
		// $('body').addClass('sidenav-toggled');
		/**Icon-Overlay-Menu**/

		/**Hover-Sub-Menu**/
		// $('body').addClass('hover-submenu');
		// $('body').addClass('sidenav-toggled');
		// if (document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
		// 	hovermenu();
		// }
		/**Hover-Sub-Menu**/

		/**Hover-Sub-Menu1**/
		// $('body').addClass('hover-submenu1');
		// $('body').addClass('sidenav-toggled');
		// if (document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
		// 	hovermenu();
		// }
		/**Hover-Sub-Menu1**/

		/**Double-Menu**/
		// $('body').addClass('double-menu');
		// doubleLayoutFn()
		/**Double-Menu**/

		/**Double-Menu-Tabs**/
		// $('body').addClass('double-menu-tabs');
		// doubleLayoutFn()
		/**Double-Menu-Tabs**/
	}


	//Body Style
	if (!localStorage.getItem('Adminordefaultbody') && !localStorage.getItem('Adminorbodystyle')) {
	// $('body').addClass('body-style1');
	}

	/**Boxed Layout Style**/
	if (!localStorage.getItem('Adminorfullwidth') && !localStorage.getItem('Adminorboxedwidth')) {
	// $('body').addClass('layout-boxed');
	}

	/**Header-Position Styles**/
	if (!localStorage.getItem('Adminorfixed') && !localStorage.getItem('Adminorscrollable')) {
	// $('body').addClass('scrollable-layout');
	}
	/**Header-Position Styles**/

	//Menu Styles
	if (!localStorage.getItem('Adminorlightmenu') && !localStorage.getItem('Adminorcolormenu') && !localStorage.getItem('Adminordarkmenu') ) {
		/**Light-menu**/
		// $('body').addClass('light-menu');
		/**Light-menu**/

		/**Color-menu**/
		// $('body').addClass('color-menu');
		/**Color-menu**/

		/**Dark-menu**/
		// $('body').addClass('dark-menu');
		/**Dark-menu**/
	}
	//Header Styles
	if (!localStorage.getItem('Adminorlightheader') && !localStorage.getItem('Adminorcolorheader') && !localStorage.getItem('Adminordarkheader')) {
		/**Light-Header**/
		// $('body').addClass('light-header');
		/**Light-Header**/

		/**Color-Header**/
		// $('body').addClass('color-header');
		/**Color-Header**/

		/**Dark-Header**/
		// $('body').addClass('dark-header');
		/**Dark-Header**/

	}
	/***************** Add Switcher Classes *********************/
	
(function () {
	"use strict";

/***************** RTL Start*****************/

if ($("body").hasClass("rtl")) {
	$('body').addClass('rtl');
	$('body').removeClass('ltr');
	$("html[lang=en]").attr("dir", "rtl");
	$(".select2-container").attr("dir", "rtl");
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
	if (document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
		checkHoriMenu();
	}
}

/*****************RTL End*****************/

/*****************Horizontal Start*****************/
if ($("body").hasClass("horizontal")) {
	if (window.innerWidth >= 992) {
		let li = document.querySelectorAll('.side-menu li')
		li.forEach((e, i) => {
			e.classList.remove('is-expanded')
		})
		var animationSpeed = 300;
		// first level
		var parent = $("[data-bs-toggle='sub-slide']").parents('ul');
		var ul = parent.find('ul[class^="slide-menu"]:visible').slideUp(animationSpeed);
		ul.removeClass('open');
		var parent1 = $("[data-bs-toggle='sub-slide2']").parents('ul');
		var ul1 = parent1.find('ul[class^="sub-slide-menu"]:visible').slideUp(animationSpeed);
		ul1.removeClass('open');
	}
	$('body').addClass('horizontal');
	$(".main-content").addClass("horizontal-content");
	$(".main-content").removeClass("app-content");
	$(".main-container").addClass("container");
	$(".main-container").removeClass("container-fluid");
	$(".main-header").addClass("hor-header");
	$(".main-header").removeClass("side-header");
	$(".app-sidebar").addClass("horizontal-main")
	$(".main-sidemenu").addClass("container")
	$('body').removeClass('sidebar-mini');
	$('body').removeClass('sidenav-toggled');
	$('body').removeClass('horizontal-hover');
	$('body').removeClass('closed-menu');
	$('body').removeClass('hover-submenu');
	$('body').removeClass('hover-submenu1');
	$('body').removeClass('icontext-menu');
	$('body').removeClass('sideicon-menu');
	$('body').removeClass('double-menu');
	$('body').removeClass('double-menu-tabs');
	$('.slide-menu').removeClass('double-menu-active');
	// $('#slide-left').removeClass('d-none');
	// $('#slide-right').removeClass('d-none');
	if (document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
		document.querySelector('.horizontal .side-menu').style.flexWrap = 'noWrap';
		checkHoriMenu();
		ActiveSubmenu();
		menuClick();
		responsive();
	}

}
/*****************Horizontal End*****************/

/*****************Horizontal-Hover Start*****************/
if ($("body").hasClass("horizontal-hover")) {
	let li = document.querySelectorAll('.side-menu li')
	li.forEach((e, i) => {
		e.classList.remove('is-expanded')
	})
	var animationSpeed = 300;
	// first level
	var parent = $("[data-bs-toggle='sub-slide']").parents('ul');
	var ul = parent.find('ul:visible').slideUp(animationSpeed);
	ul.removeClass('open');
	var parent1 = $("[data-bs-toggle='sub-slide2']").parents('ul');
	var ul1 = parent1.find('ul:visible').slideUp(animationSpeed);
	ul1.removeClass('open');
	$('body').addClass('horizontal-hover');
	$('body').addClass('horizontal');
	let subNavSub = document.querySelectorAll('.sub-slide-menu');
	subNavSub.forEach((e) => {
		e.style.display = '';
	})
	let subNav = document.querySelectorAll('.slide-menu')
	subNav.forEach((e) => {
		e.style.display = '';
	})
	// $('#slide-left').addClass('d-none');
	// $('#slide-right').addClass('d-none');
	$(".main-content").addClass("horizontal-content");
	$(".main-content").removeClass("app-content");
	$(".main-container").addClass("container");
	$(".main-container").removeClass("container-fluid");
	$(".main-header").addClass("hor-header");
	$(".main-header").removeClass("side-header");
	$(".app-sidebar").addClass("horizontal-main")
	$(".main-sidemenu").addClass("container")
	$('body').removeClass('sidebar-mini');
	$('body').removeClass('sidenav-toggled');
	$('body').removeClass('closed-menu');
	$('body').removeClass('hover-submenu');
	$('body').removeClass('hover-submenu1');
	$('body').removeClass('icontext-menu');
	$('body').removeClass('sideicon-menu');
	$('body')?.removeClass('double-menu-tabs');
	$('body')?.removeClass('double-menu');
	// $(".tab-content-show").addClass("active");
	// $(".tab-content-double").removeClass("active")
	$('.slide-menu')?.removeClass('double-menu-active');
	if (document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
		document.querySelector('.horizontal .side-menu').style.flexWrap = 'noWrap';
		checkHoriMenu();
		ActiveSubmenu();
		responsive();
		menuClick();
		HorizontalHovermenu();
	}
}


	/***************** CLOSEDMENU HAs Class *********************/
	let bodyclosed = $('body').hasClass('closed-menu');
	if (bodyclosed) {
		$('body').addClass('closed-menu');
		$('body').addClass('sidenav-toggled');
		if (!document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
		}
	}
	/***************** CLOSEDMENU HAs Class *********************/

	/***************** ICONTEXT MENU HAs Class *********************/
	let bodyicontext = $('body').hasClass('icontext-menu');
	if (bodyicontext) {
		$('body').addClass('icontext-menu');
		$('body').addClass('sidenav-toggled');
		if (!document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
			icontext();
		}
	}
	/***************** ICONTEXT MENU HAs Class *********************/

	/***************** ICONOVERLAY MENU HAs Class *********************/
	let bodyiconoverlay = $('body').hasClass('sideicon-menu');
	if (bodyiconoverlay) {
		$('body').addClass('sideicon-menu');
		$('body').addClass('sidenav-toggled');
		if (!document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
		}
	}
	/***************** ICONOVERLAY MENU HAs Class *********************/

	/***************** HOVER-SUBMENU HAs Class *********************/
	let bodyhover = $('body').hasClass('hover-submenu');
	if (bodyhover) {
		$('body').addClass('hover-submenu');
		$('body').addClass('sidenav-toggled');
		if (!document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
			hovermenu();
		}
	}
	/***************** HOVER-SUBMENU HAs Class *********************/

	/***************** HOVER-SUBMENU HAs Class *********************/
	let bodyhover1 = $('body').hasClass('hover-submenu1');
	if (bodyhover1) {
		$('body').addClass('hover-submenu1');
		$('body').addClass('sidenav-toggled');
		if (!document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
			hovermenu();
		}
	}
	/***************** HOVER-SUBMENU HAs Class *********************/
	

	/***************** Double-Menu has Class *********************/
	let bodydoublemenu = $('body').hasClass('double-menu');
	if (bodydoublemenu) {
		$('body').addClass('double-menu');
		if (!document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
			doubleLayoutFn()
		}
	}
	/***************** Double-Menu has Class *********************/

	/***************** Double-Menu-Tabs has Class *********************/
	let bodydoublemenutabs = $('body').hasClass('double-menu-tabs');
	if (bodydoublemenutabs) {
		$('body').addClass('double-menu-tabs');
		if (!document.querySelector('body').classList.contains('horizontal')  && !document.querySelector('body').classList.contains('login-img')) {
		  doubleLayoutFn()
		}
	}
	/***************** Double-Menu-Tabs has Class *********************/
	checkOptions();
})()
