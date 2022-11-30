var windowWidth = 0,
	windowHeight = 0,
	headerHeight = 0,
	scrollBusy = false,
	assetArray = [],
	isCookie = false,
	timer;

const style = document.documentElement.style;

var propelrr = {
	debug: false,
	browser: '',
	isMobile: '',
	os: '',

	browserdetect: function() {
		var BrowserDetect = {
			init: function() {
				this.browser = this.searchString(this.dataBrowser) || 'Other';
				this.version =
					this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || 'Unknown';
				$('html').addClass(BrowserDetect.browser);
			},
			searchString: function(data) {
				for (var i = 0; i < data.length; i++) {
					var dataString = data[i].string;
					this.versionSearchString = data[i].subString;

					if (dataString.indexOf(data[i].subString) !== -1) {
						return data[i].identity;
					}
				}
			},
			searchVersion: function(dataString) {
				var index = dataString.indexOf(this.versionSearchString);
				if (index === -1) {
					return;
				}

				var rv = dataString.indexOf('rv:');
				if (this.versionSearchString === 'Trident' && rv !== -1) {
					return parseFloat(dataString.substring(rv + 3));
				} else {
					return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
				}
			},
			dataBrowser: [
				{ string: navigator.userAgent, subString: 'Edge', identity: 'ms-edge' },
				{ string: navigator.userAgent, subString: 'MSIE', identity: 'explorer' },
				{ string: navigator.userAgent, subString: 'Trident', identity: 'explorer' },
				{ string: navigator.userAgent, subString: 'Firefox', identity: 'firefox' },
				{ string: navigator.userAgent, subString: 'Opera', identity: 'opera' },
				{ string: navigator.userAgent, subString: 'OPR', identity: 'opera' },

				{ string: navigator.userAgent, subString: 'Chrome', identity: 'chrome' },
				{ string: navigator.userAgent, subString: 'Safari', identity: 'safari' }
			]
		};

		BrowserDetect.init();
		BrowserDetect.browser = BrowserDetect.browser;
	},

	mobiledetect: function() {
		var isMobile = {
			Android: function() {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera: function() {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function() {
				return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
			},
			any: function() {
				return (
					isMobile.Android() ||
					isMobile.BlackBerry() ||
					isMobile.iOS() ||
					isMobile.Opera() ||
					isMobile.Windows()
				);
			}
		};

		propelrr.isMobile = isMobile.any();

		if (propelrr.isMobile) {
			$('html').addClass('bp-touch');
			$('.desktop-only').remove();
		} else {
			$('.mobile-only').remove();
		}
	},

	osdetect: function() {
		var userAgent = window.navigator.userAgent,
			platform = window.navigator.platform,
			macosPlatforms = [ 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K' ],
			windowsPlatforms = [ 'Win32', 'Win64', 'Windows', 'WinCE' ],
			iosPlatforms = [ 'iPhone', 'iPad', 'iPod' ],
			os = null;

		if (macosPlatforms.indexOf(platform) !== -1) {
			os = 'mac-os';
		} else if (iosPlatforms.indexOf(platform) !== -1) {
			os = 'ios';
		} else if (windowsPlatforms.indexOf(platform) !== -1) {
			os = 'windows';
		} else if (/Android/.test(userAgent)) {
			os = 'android';
		} else if (!os && /Linux/.test(platform)) {
			os = 'linux';
		}

		propelrr.os = os;
		$('html').addClass(os);
	},

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
				{ accY: -90 }
			);
		} else {
			$('.hiding').css({ opacity: 1 });
		}
	},

	coverImage: function(image) {
		var _banner = {
			init: function() {
				//$(window).on('resize', function() {
				$('.coverimage-img img').each(function() {
					_banner.calculate($(this));
				});
				//});
			},

			calculate: function(image) {
				var imgObj = image;

				var iW = imgObj.attr('width');
				var iH = imgObj.attr('height');
				imgObj.width(0).height(0);

				var imgContainer = image.parent();
				var cW = imgContainer.width(); //width of container or browser
				var cH = imgContainer.height(); //height of container or browser

				//console.log(iW,iH,cW,cH);

				if (cH > 1) {
					var cP = cW / cH; //ratio of container or browser
					var iP = iW / iH; //ratio of image

					if (iP > cP) {
						//if image ratio is more than container ratio (if image width is more than container width)
						iH = cH; //set image height from container height
						iW = cH * iP; //set image width using container height and image ratio
						imgObj.css({
							'margin-top': 0,
							'margin-left': Math.ceil((cW - iW) / 2),
							width: Math.ceil(iW),
							height: Math.ceil(iH)
						}); //center the image and set dimensions
					} else {
						//if image ratio is less than container ratio (if image height is more than container height)
						iW = cW; //set image width from container width
						iH = cW / iP; //set image height from container width and ratio
						imgObj.css({
							'margin-top': Math.ceil((cH - iH) / 2),
							'margin-left': 0,
							width: Math.ceil(iW),
							height: Math.ceil(iH)
						}); //center the image and set dimensions
					}
				} else {
					imgObj.css({
						'margin-top': 0,
						'margin-left': 0,
						width: 'auto',
						height: 'auto'
					});
				}
			}
		};

		_banner.init();
	},

	init: function() {
		propelrr.entranceAnimation();
		propelrr.coverImage();
		propelrr.resize();
		//propelrr.animateFramework();
		propelrr.loaderBar();
	}
};
