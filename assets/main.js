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