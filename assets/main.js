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

  var prevNavOpen;

  $(".nav-link.dropdown-toggle").on("click",function(event) {
    event.preventDefault();
    var menu = $(this).next();
    menu.addClass("show");
    TweenLite.from(menu,0.3,{y: -20, ease: Power1.easeInOut});
    TweenLite.to(menu,0.3,{opacity: 1, ease: Power1.easeInOut});
    if(menu.data("isOpen")) {
      closeMenu();
      return;
    }
    menu.data("isOpen", true);

    if (prevNavOpen) {
      var $this = prevNavOpen;
      TweenLite.to($this,0.3,{ease: Power1.easeInOut, opacity: 0, onComplete: function() {
        $this.removeClass("show");
      }});
      console.log("currentOpen");
      console.log(prevNavOpen);
      console.log(menu);
      //prevNavOpen = null;
    }

    $(document).on("click.hideMenu",function(event) {
      if(!$(event.target).closest("#main-nav").length) {
        closeMenu();
        $(document).off("click.hideMenu");
      }
    });

    function closeMenu () {
      TweenLite.to(menu,0.3,{ease: Power1.easeInOut, opacity: 0, onComplete: function() {
        menu.removeClass("show");
      }});
      menu.data("isOpen",false);
      prevNavOpen = null;
    }

    prevNavOpen = menu;
    //console.log(prevNavOpen);
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

    $(this).closest(".nav").find(".nav-link").removeClass("active");

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
    $(this).closest(".nav").find(".nav-link").removeClass("active");
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
    
});