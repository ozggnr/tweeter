$(document).ready(function () {
  const text_max = 140;
    $('#tweet-text').keyup(function() {
      const text_length = $(this).val().length;
      const text_remaining = text_max - text_length;
      $('.counter').html(text_remaining);
      if (text_remaining < 0) {
        $(".counter").css("color","red");
      } else {
        $(".counter").css("color","#545149");
      }
    });
});
