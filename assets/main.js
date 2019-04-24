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

  $(window).on('scroll', function() {
    var windowScroll = $(window).scrollTop();
    var item = $('.navbar-scroll');
    if (windowScroll >= 140 && lastScroll < 140 ) {
      item.show();
      item.each(function(i,obj) {
        var animationName = $(this).attr('animation')
        $(this).animateCss(animationName);
      });
    }
    if (windowScroll <= 140 && lastScroll > 140) {
      item.hide();
    }
    lastScroll = windowScroll;
  });

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

  $('.color-option').on('click',function() {
    $('.color-option').removeClass('active');
    $(this).addClass('active');
  });
});

$.fn.extend({
  transitionCss: function(animationName, option, callback) {
    var transitionend = 'webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend';

    $(this).off(transitionend);
    if (option.show) {
      console.log($(this));
      $(this).show().addClass(animationName);
      if (typeof(callback) === 'function') {
        callback();
      } 
    } else {
      if (option.once) {
        var $allThis = $(this);
        $allThis.removeClass(animationName);
        
        $allThis.filter(':visible').first().one(transitionend, function() {
          $allThis.hide();
          
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
  }
});