/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
const fakeData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
const createTweetElement = function(data) {
  let $tweet = ` <article class="tweet" >
                  <header > 
                    <div class="first">
                      <img src="${data.user.avatars}">  
                        <p>${data.user.name}</p>
                    </div>
                    <p class="handle">${data.user.handle}</p>
                  </header>
                  <p class="tweet-text">${data.content.text}</p>
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

$(document).ready( function() {
  const renderTweets = function(tweets) {
    for (let item of tweets) {
      $('#tweets-container').append(createTweetElement  (item));
    }
  }
  renderTweets(fakeData);
  
  $('#new-tweet-button').submit(function() {
    const serializedData = $(this).serialize();
    $.ajax("/tweets", {method: "POST", data: serializedData})
    event.preventDefault();
   console.log(serializedData)
  })
})


// const fetchTweet = () => {
//   $.ajax({
//     url: "/tweets",
//     method: "POST"
//   })
// }
