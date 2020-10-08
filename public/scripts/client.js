$(document).ready( function() {
  const loadTweets = function() {
    $.ajax("/tweets", {
      method: "GET",
      dataType: 'json'
      }).then( function(tweets)  {
        renderTweets(tweets);
      })
  }

  $("#tweets-container").on('reload', loadTweets).trigger ('reload');

  const escape = function(str) {
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  }
  const createTweetElement = function(data) {
    let $tweet = ` <article class="tweet" >
                    <header > 
                      <div class="first">
                        <img src="${data.user.avatars}">  
                          <p>${data.user.name}</p>
                      </div>
                      <p class="handle">${data.user.handle}</p>
                    </header>
                    <p class="tweet-text">${escape(data.content.text)}</p>
                    <footer>
                      <p class="foot-text">${data.created_at}</p>
                      <div class="icons">
                        <i class="fa fa-flag"></i>
                        <i class="fa fa-retweet"></i>
                        <i class="fa fa-heart"></i>
                      </div>
                    </footer>
                  </article>
                  <br>`
    return $tweet;
  }

  const renderTweets = function(tweets) {
    const $tweets = $('#tweets-container');
    $tweets.empty();
    for (let item of tweets) {
      $tweets.prepend(createTweetElement(item));
    }
  }
  $("#error").hide()
  $(".new-tweet").toggle();
  $('#new-tweet-button').submit(function(event) {
    event.preventDefault();
    if($("#tweet-text").val() === "") {
      $('#error').text("there is an error!").slideDown(500)
    } else if ($("#tweet-text").val().length > 140 ) {
    $('#error').text("there is another error!").slideDown(500)
    } else {
      const serializedData = $(this).serialize();
      $.ajax("/tweets", {
      method: "POST", 
      data: serializedData
      }).then(() => {
        loadTweets();
      })
    }
    $(".new-tweet").toggle();
  })
  $("#click-me").click(function() {
    $(".new-tweet").toggle();
  })
})