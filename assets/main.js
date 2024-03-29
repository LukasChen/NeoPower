$(function() {

  'use strict';

  // Init polyfill stuff
  AOS.init();
  Stickyfill.add($('.sticky-top'));
  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
    // ... more custom settings?
  });
  
  $('.slick-slider').slick({
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true
  });

  $('.slick-slider-thumbnail').slick({
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    customPaging: function(slider,i) {
      var thumb = $(slider.$slides[i]).children().attr('src');
      return '<img class="img-fluid" style="height: 100%" src="' + thumb +  '">';
    }
  });

  var lastScroll = 0;
  var navbarItem = $('.navbar-scroll');

  slideInLogo(navbarItem);


  $(window).on('scroll.slideInLogo', function() {  slideInLogo(navbarItem) });

  function slideInLogo (slideIn) {
    var windowScroll = $(window).scrollTop();
    if (windowScroll >= 140 && lastScroll < 140 ) {
      slideIn.show();
      slideIn.each(function(i,obj) {
        var animationName = $(this).attr('animation');
        $(this).animateCss(animationName);
      });
    }
    if (windowScroll <= 140 && lastScroll > 140) {
      slideIn.hide();
    }
    lastScroll = windowScroll;
  }

  // Search bar
  $('.search-svg').on('click',function() {
    $(this).prev().addClass('active').focus();
    $(this).addClass('active');
    $(document).on('click.hideSearch', function hideSearch(event) {
      if(!$(event.target).closest('.search').length) {
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
    var menu = $(this).find('.dropdown-menu').first();
    // off the event again just incase
    menu.off('animationend');
    menu.addClass('show open');
  }, function() {
    var menu = $(this).find('.dropdown-menu').first();
    menu.removeClass('open');
    menu.one('animationend',function() {
       menu.removeClass('show');
       //console.log('animation end!');
    });
    
  });

  var filterItems = $('.filter-items > *');

  $(window).on('hashchange', checkHash);

  if(window.location.hash) {
    checkHash();
  }

  function checkHash() {
    var target = window.location.hash.substr(1);
    console.log(target)
    filterItem(filterItems,target);
    $('[data-toggle="filter"][href="' + target + '"]').addClass('active');
  }

  $('[data-toggle="filter"]').on('click',function(event) {
    event.preventDefault();

    $(this).closest('.filter-sidebar').find('.nav-link').removeClass('active');
    $(this).addClass('active');


    
    var target = $(this).attr('href');
    window.location.hash = target;

    var mobile = window.matchMedia('(max-width: 576px)').matches;

    if (mobile) {
      $(this).closest('.collapse').prev('.btn-collapse').reusableCollapse();
    }
  });

  function filterItem(filterItems,targetName) {

    var name = targetName.replace(/product-/,'').replace(/-/g,' ');
    $('#current-category').show()
    $('#current-category').text(name);

    var target = $('.' + $.escapeSelector(targetName))
    console.log($.escapeSelector(targetName));

    $('.filter-reset').transitionCss('fadeShow',{show: true});

    if (!$('.filter-items').find('.fadeShow').length) {
      target.transitionCss('fadeShow', {show: true});
      return;
    }

    filterItems.transitionCss('fadeShow',{show: false, once: true}, function callback() {
      target.transitionCss('fadeShow', {show: true});
    });
  }

  $('.filter-reset').on('click',function resetAll(event) {
    event.preventDefault();
    history.pushState('', document.title, window.location.pathname+ window.location.search);

    $(this).closest('.filter-sidebar').find('.nav-link').removeClass('active');

    filterItems.transitionCss('fadeShow',{show: true, once: true});
    $(this).transitionCss('fadeShow',{show: false});

    $('#current-category').hide();

    var mobile = window.matchMedia('(max-width: 576px)').matches;

    if (mobile) {
      $(this).closest('.collapse').prev('.btn-collapse').reusableCollapse();
    }
  });

  $('.input-numerical-left').on('click',function() {
    var input = $(this).next();
    var minValue = parseInt(input.attr('min'));
    console.log(minValue)
    if (minValue == input.val()) {
      alert('This is the minimum amount of quantity for order');
      return;
    }
    input.val(parseInt(input.val()) - 1);
  });
  
  $('.input-incremental').on('change',function() {
    var value = $(this).val();
    var min = $(this).attr('min');
    var max = $(this).attr('max');
    if (value < min) {
      alert('This is the minimum amount of quantity for order');
      $(this).val(min);
    }
    if (value > max) {
      alert('This is the maximum amount of quantity for order');
      $(this).val(max);
    }
  });
  
  $('.input-numerical-right').on('click',function() {
    var input = $(this).prev();
    var maxValue = parseInt(input.attr('max'));
    console.log(maxValue);
    if (maxValue == input.val()) {
      alert('This is the maximum amount of quantity for order');
      return;
    }
    input.val(parseInt(input.val()) + 1);
  });

  $('.product-options:not(.disabled)').on('click',function() {
    $(this).parent().find('.product-options').removeClass('active');
    $(this).addClass('active');
  });

  $('[data-toggle="collapse"]').on('click',function() {
    $(this).reusableCollapse();
  });
});

$.fn.extend({
  transitionCss: function(animationName, option, callback) {
    var transitionend = 'webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend';

    $(this).off(transitionend);
    if (option.show) {
      $(this).show().addClass(animationName);
      if (typeof(callback) === 'function') {
        callback();
      } 
    } else {
      if (option.once) {
        var $allThis = $(this);
        $allThis.removeClass(animationName).filter(':visible').first().one(transitionend, function() {
          $allThis.hide();
          $allThis.off(transitionend);
          
          if (typeof(callback) === 'function') {
            callback();
          }
        });
        return;
      }
      $(this).off(transitionend);
      $(this).removeClass(animationName).one(transitionend, function() {
        $(this).hide();
        if (typeof(callback) === 'function') {
          callback();
        }
      });
    }
  },
  animateCss: function (animationName, callback) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    // if (!Array.isArray(animationNames)) {
    //   animationNames = [animationNames];
    // }

    $(this).addClass('animated');
    $(this).addClass(animationName).one(animationEnd, function () {
      $(this).removeClass(animationName);
      if (typeof(callback) === 'function') {
        callback();
      }
    });
    return this;
  },
  reusableCollapse: function() {
    var collapse = $(this).next('.collapse');
    var icon = $(this).children('.collapse-icon');

    console.log(collapse);
    collapse.collapse('toggle');
    icon.toggleClass('rotate-180');
  }
});