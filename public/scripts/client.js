$(document).ready( function() {
 //reload older tweets and show list of tweets
  $("#tweets-container").on('reload', loadTweets).trigger ('reload'); 
  $("#error").hide();
  // $(".new-tweet").toggle(); --> if we hide the text area we can open this line and when we first open the page we cannot see unless we use the "write a new line button"
  //post the new tweet on the main page, we also check the edge conditions before post and after post update the text area.
  $('#new-tweet-button').submit(function(event) {
    event.preventDefault();
    if($("#tweet-text").val() === "") {
      $('#error').text("You should write a tweet!").slideDown(500)
    } else if ($("#tweet-text").val().length > 140 ) {
    $('#error').text("Exceed the limits!").slideDown(500);
    } else {
      const serializedData = $(this).serialize();
      $.ajax("/tweets", {
      method: "POST", 
      data: serializedData
      }).then(() => {
        loadTweets();
      });
      $("#tweet-text").val("");
      $(".counter").val(140);
      $(".new-tweet").toggle();
    }
  });
  //toggle the compose button to create a new tweet
  $("#click-me").click(function() {
    $(".new-tweet").toggle();
  });
});