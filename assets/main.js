$(function() {

  'use strict';

  // Init polyfill stuff
  AOS.init();
  Stickyfill.add($('.sticky-top'));
  console.log(Stickyfill.stickies);
  $('.slick-slider').slick({
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true
  });

  // $('#nav-logo').hide();

  // var navShowOnce = false;
  // $(window).on('scroll', function() {
  //   var navOffsetTop = $('#main-nav').offset().top;
  //   console.log($(window).scrollTop());
  //   if ($(window).scrollTop() >= navOffsetTop ) {
  //     $('#nav-logo').show();
  //   } else {
  //     $('#nav-logo').hide();
  //   }
  // });

  // Search bar
  $('.search-svg').on('click',function() {
    $(this).prev().addClass('active').focus();
    $(this).addClass('active');
    $(document).on('click.hideSearch', function hideSearch(event) {
      if(!$(event.target).closest('.search').length ) {
        $('.search-input').removeClass('active');
        $('.search-svg').removeClass('active')
        $(document).off('click.hideSearch');
      }
    });
  });

  $('[smooth-scroll]').on('click',function(event) {
    event.preventDefault();
    var target = $(this).attr('href');
    if ($(target).length) {
      TweenLite.to(window, 1, {scrollTo:{y: target, offsetY:70}});
    } else {
      console.warn('Empty hash link at ' + target);
    }
  });

  $('.dropdown').hover(function() {
    console.time('Hover');
    var menu = $(this).find('.dropdown-menu').first();
    // off the event again just incase
    menu.off('animationend');
    menu.addClass('show open');
    console.timeEnd('Hover');
  }, function() {
    var menu = $(this).find('.dropdown-menu').first();
    menu.removeClass('open');
    menu.one('animationend',function() {
       menu.removeClass('show');
       //console.log('animation end!');
    });
    
  });

  var filterItems = $('.filter-items > *');
  //var filterTl = new TimelineLite();

  if (window.location.hash) {
    console.log(window.location.hash);
    filterItem(filterItems,$('.' + window.location.hash.substr(1)));
    $('[data-toggle="filter"][href="' + '.' + window.location.hash.substr(1) + '"]').addClass('active');
  }

  $('[data-toggle="filter"]').on('click',function(event) {
    event.preventDefault();

    //filterTl = new TimelineLite();

    $(this).closest('.filter-sidebar').find('.nav-link').removeClass('active');
    $(this).addClass('active');
    
    var target = $(this).attr('href');
    window.location.hash = target.substr(1);

    filterItem(filterItems,$(target));
  });

  function filterItem(filterItems,target) {
    //target.off('animationend');
    //filterItems.off('animationend');
    console.log('filteritems' + new Date());

    $('.filter-reset').show();
    $('.filter-reset').addClass("fadeShow");

    if (!$('.filter-items').find('.fadeShow').length) {
      console.log('hello');
      target.show();
      target.addClass('fadeShow');
      return;
    }

    filterItems.removeClass('fadeShow');
    filterItems.filter(':visible').first().one('transitionend',function() {
      filterItems.off('transitionend');

      filterItems.hide();
      target.show();
      target.addClass('fadeShow');
    });
  }

  $('.filter-reset').on('click',function() {
    event.preventDefault();
    history.pushState('', document.title, window.location.pathname+ window.location.search);
    $(this).closest('.filter-sidebar').find('.nav-link').removeClass('active');
    filterItems.off('transitionend');
    filterItems.show();
    filterItems.addClass('fadeShow');
    $(this).removeClass('fadeShow').one('animationend',function() {
      $(this).hide();
    });
    console.log('fadeOut');
  });

});

$.fn.extend({
  animateCss: function (animationName, callback) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    // if (!Array.isArray(animationNames)) {
    //   animationNames = [animationNames];
    // }

    var animateOnce = false;
    this.addClass('animated');
    $(this).addClass(animationName).one(animationEnd, function () {
      if (!animateOnce) {
          $(this).removeClass(animationName);
          if (typeof(callback) === 'function') {
            callback();
          }

          animateOnce = true;
      }
    });
    return this;
  }
});