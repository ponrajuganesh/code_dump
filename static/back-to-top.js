// function that makes scrolling possible
$(document).ready(function () {
  $(window).scroll(function() {
      // scrolling arrow mark appears when the scrolled more than 50px
      // on a 200 seconds
      if ($(this).scrollTop() >= 50) {
          $('#return-to-top').fadeIn(200);
      } else {
          $('#return-to-top').fadeOut(200);
      }
  });
  $('#return-to-top').click(function() {
      $('body,html').animate({
          scrollTop : 0
      }, 500);
  });
});
