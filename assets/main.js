$(function() {

  "use strict";

  // Init polyfill stuff
  AOS.init();
  Stickyfill.add($(".sticky-top"));
  console.log(Stickyfill.stickies);
  $(".slick-slider").slick({
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true
  });

  // Search bar
  $(".search-svg").on("click",function() {
    $(this).prev().addClass("active").focus();
    $(this).addClass("active");
    $(document).one("click.hideSearch", function hideSearch(event) {
      if(!$(event.target).closest(".search").length ) {
        $(".search-input").removeClass("active");
        $(".search-svg").removeClass("active")
      }
    });
  });

  $('.dropdown').hover(function() {
    console.time('Hover');
    var menu = $(this).find('.dropdown-menu').first();
    // off the event again just incase
    menu.off("animationend");
    menu.addClass("show open");
    console.timeEnd('Hover');
  }, function() {
    var menu = $(this).find('.dropdown-menu').first();
    menu.removeClass("open");
    menu.one("animationend",function() {
       menu.removeClass("show");
       //console.log("animation end!");
    });
    
  });

  var filterItems = $(".filter-items > *");
  var filterTl = new TimelineLite();

  if (window.location.hash) {
    console.log(window.location.hash);
    filterItem("." + window.location.hash.substr(1));
    $("[data-toggle='filter'][href='" + "." + window.location.hash.substr(1) + "']").addClass("active");
  }

  $("[data-toggle='filter']").on("click",function(event) {
    event.preventDefault();

    filterTl = new TimelineLite();

    $(this).closest(".filter-sidebar").find(".nav-link").removeClass("active");

    $(this).addClass("active");
    
    var target = $(this).attr("href");
    window.location.hash = target.substr(1);

    filterItem(target);

    // filterItems.each(function() {
    //   var $this = $(this);
    //   TweenLite.to($(this),0.3,{opacity: 0, ease: Power1.easeInOut, onComplete: function() {
    //     $this.hide();
    //   }});
    // });

    
  });

  function filterItem(target) {
    filterTl.to(filterItems,0.3,{opacity: 0, ease: Power1.easeInOut});
    filterTl.to(filterItems,0,{display: "none"});
    filterTl.to($(target),0,{display: "block"});
    filterTl.to($(target),0.3,{opacity: 1, ease: Power1.easeInOut});

    $(".filter-reset").show();
    TweenLite.to($(".filter-reset"),0.3,{opacity: 1, ease: Power1.easeInOut});
  }

  $(".filter-reset").on("click",function() {
    event.preventDefault();
    history.pushState("", document.title, window.location.pathname+ window.location.search);
    $(this).closest(".filter-sidebar").find(".nav-link").removeClass("active");
    filterItems.show();
    TweenLite.to(filterItems,0.3,{opacity: 1, ease: Power1.easeInOut});
    var $this = $(this);
    TweenLite.to($(this),0.3,{opacity: 0, ease: Power1.easeInOut, onComplete: function () {
      $this.hide();
    }});
  });



  var tl = new TimelineLite();
  var tl2 = new TimelineLite();
  var controller = new ScrollMagic.Controller();

  // var liftTween = TweenLite.from("#lift-img",2,{x: -200,opacity: 0,ease: Power1.easeInOut});
  /*
  $(".product-overview-style-1 .product-overview-img-1").each(function(index,el) {
    tl.from(el,1.5,{y: 300, ease: Power1.easeInOut},'-=1');
  });
  */
  /*
  $(".product-overview-style-2 .product-overview-img-2").each(function(index,el) {
    tl2.from(el,1.5,{y: 300, ease: Power1.easeInOut},'-=1');
  });
  */
  /*
  var scene1 = new ScrollMagic.Scene({
    triggerElement: ".product-overview-style-1",
    triggerHook:"onEnter"
  })
  .setTween(tl)
  .addTo(controller);
  */
  /*
  var scene2 = new ScrollMagic.Scene({
    triggerElement: ".product-overview-style-2",
    triggerHook: "onEnter"
  })
  .setTween(tl2)
  .addTo(controller);
  */

  function animateCSS(element, animationName, speed, callback) {
    element.addClass('animated');
    element.addClass(animationName)
    if (speed) element.addClass(speed);

    function handleAnimationEnd() {
        element.removeClass('animated');
        element.removeClass(animationName);
        if (speed) element.removeClass(speed);
        console.log("animate End!");
        element.off('animationend', handleAnimationEnd);

        if (typeof callback === 'function') callback()
    }

    element.on('animationend', handleAnimationEnd);
}
    
});