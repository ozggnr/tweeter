//fetch the tweets from server
const loadTweets = function() {
  $.ajax("/tweets", {
    method: "GET",
    dataType: 'json'
  }).then( function(tweets) {
      renderTweets(tweets);
    });
};
//to avoid creating a vulnerable page we define the excape function
const escape = function(str) {
  let p = document.createElement('p');
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
};
//Define html markup for tweets
const createTweetElement = function(data) {
  //Calculating the difference between the current time and the time tweet was posted
  let datenow = Date.now();
  let newDate = Math.floor((datenow-data.created_at)/(1000*60*60*24));
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
                    <p class="foot-text">${newDate} days ago</p>
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
//Add tweets to the page in reverse-chronological order
const renderTweets = function(tweets) {
  const $tweets = $('#tweets-container');
  for (let item of tweets) {
    $tweets.prepend(createTweetElement(item));
  }
}
