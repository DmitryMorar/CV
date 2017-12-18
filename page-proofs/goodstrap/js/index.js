$(document).ready(function() {
  $('#top-menu a').on('click', function() {
      var scrollAnchor = $(this).attr('data-scroll'),
          scrollPoint = $('section[data-anchor="' + scrollAnchor + '"]').offset().top;
      $('body,html').animate({
          scrollTop: scrollPoint
      }, 500);
      return false;
  });

  $(window).scroll(function() {
  var windscroll = $(window).scrollTop();
    $('.b-right_wrapper section').each(function(i){
      if($(this).position().top <= windscroll + 10) {
        $('#top-menu a.__active').removeClass('__active');
        $('#top-menu a').eq(i).addClass('__active');
      }
    });
  }).scroll();
});

