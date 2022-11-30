var windowWidth = 0,
	windowHeight = 0,
	headerHeight = 0,
	scrollBusy = false,
	assetArray = [],
	isCookie = false,
	timer;

const style = document.documentElement.style;

var threaded = {
	
	entranceAnimation: function() {
		if ($(window).width() > 768) {
			$('.animated').appear(
				function() {
					var element = $(this);
					var animation = element.data('animation');
					var animationDelay = element.data('delay');
					if (animationDelay) {
						setTimeout(function() {
							element.addClass(animation + ' visible');
							element.removeClass('hiding');
						}, animationDelay);
					} else {
						element.addClass(animation + ' visible');
						element.removeClass('hiding');
					}
				},
				{ accY: -120 }
			);
		} else {
			$('.hiding').css({ opacity: 1 });
		}
	},

	bannerCarousel: function() {
		$(document).ready(function(){
			console.log('test');
			if($('.threaded-carousel.owl-carousel').length > 0){
				var bannerOption = {
					items: 1,
					lazyLoad: true,
					loop: true,
					dots: true,
					nav: true,
					margin: 0,
					autoplay: false,
					mouseDrag: false,
					touchDrag: true,
					animateIn: 'fadeIn'
				}
		
				var bannerCarousel = $('.threaded-carousel.owl-carousel');
				bannerCarousel.owlCarousel(bannerOption);
			}
		})
	},

	clickable: function() {

		$('.js-hamburger-main').click(function(e){
			e.preventDefault();

			$(this).toggleClass('active');
			$('.main-menu').toggleClass('active');
		});


		$('.custom-currency li a').click(function(){
			var sitem = $(this).html(),
				$this = $(this);
	
			$('.switch-language .js-mobile-custom-dropdown ul li').removeClass('selected');
			$(this).parent().addClass('selected');
			$(this).closest('ul').siblings('span.selected').html(sitem);
			$(this).closest('ul').slideUp(150);
			$(this).children('ul').stop(true, false).slideToggle(150);
	
		});
	
		$('.custom-currency').click(function() {
			$(this).children('ul').stop(true, false).slideToggle(150);
		});
	},

	init: function() {
		threaded.entranceAnimation();
		threaded.bannerCarousel();
		threaded.clickable();
	}
};

if(window.jQuery) {
    threaded.init();
}

$(document).on({
	mouseenter: function(){
		clearTimeout(timer);
		$('.custom-dropdown-menu', this).slideDown(150);

	},
	mouseleave: function(){
		timer = setTimeout(function(){
			$('.custom-dropdown-menu').slideUp(150);
		}, 1500);
	}
}, '.custom-dropdown-menu');