$(function() {

  // Init polyfill stuff
  Stickyfill.add($(".sticky-top"));
  console.log(Stickyfill.stickies);
  $(".slick-slider").slick({
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true
  });

  $(".search-svg").on("click",function() {
    $(this).prev().addClass("active").focus();
    $(this).addClass("active");
    $(document).on("click.hideSearch", function hideSearch(event) {
      if(!$(event.target).closest(".search").length ) {
        $(".search-input").removeClass("active");
        $(".search-svg").removeClass("active")
        $(document).off("click.hideSearch");
      }
    });
  });


  $('.dropdown').hover(function() {
    var menu = $(this).find('.dropdown-menu').first();
    //menu.stop(true, true);
    menu.addClass("show");
    //animateCSS(menu, "fadeIn","faster");
    TweenLite.to(menu,0.2, {opacity: 1,y:0});
  }, function() {
    var menu = $(this).find('.dropdown-menu').first();
    /*animateCSS(menu, "fadeOut","faster",function onComplete() {
      menu.removeClass('show');
    });*/
    
    TweenLite.to(menu,0.2, {opacity: 0,y: -10, onComplete: function() {
      menu.removeClass("show");
    }});
    
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

  $(".product-overview-style-1 .product-overview-img-1").each(function(index,el) {
    tl.from(el,1.5,{y: 300, ease: Power1.easeInOut},'-=1');
  });

  $(".product-overview-style-2 .product-overview-img-2").each(function(index,el) {
    tl2.from(el,1.5,{y: 300, ease: Power1.easeInOut},'-=1');
  });


  // $(".section-note").each(function(index,el) {
  //   var noteTween = TweenLite.to(el,3,{y: 200, ease:Power1.easeInOut});    

  //   console.log($(this).closest(".feature-section"));

  //   var noteScene = new ScrollMagic.Scene({
  //     triggerElement: $("#first-section"),
  //     duration: 500
  //   })
  //   .setTween(noteTween)
  //   .addTo(controller);
    
  // });

  // var liftScene = new ScrollMagic.Scene({
  //   triggerElement: "#lift-img",
  //   triggerHook: 0.7,
  //   reverse: false
  // })
  // .setTween(liftTween)
  // .addTo(controller);

  var scene1 = new ScrollMagic.Scene({
    triggerElement: ".product-overview-style-1",
    triggerHook:"onEnter"
  })
  .setTween(tl)
  .addTo(controller);

  var scene2 = new ScrollMagic.Scene({
    triggerElement: ".product-overview-style-2",
    triggerHook: "onEnter"
  })
  .setTween(tl2)
  .addTo(controller);

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