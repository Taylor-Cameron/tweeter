/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  /* renders a new tweet into a tweet within the tweet-container
  adds class or appends based on the requirements of the tweet
  attributes, to make all tweets follow tweet.css
  */
  function createTweetElement (tweets) {
    let $tweet = $('<article>')
      .addClass('tweet')
      .append($('<header>')
        .append($('<img>')
          .addClass('avatar')
          .attr('src', tweets.user.avatars.small))
        .append($('<h2>')
          .addClass('username')
          .text(tweets.user.name))
        .append($('<div>')
          .addClass('userHandle')
          .text(tweets.user.handle)))
      .append($('<body>')
        .addClass('tweet')
        .append($('<p>').text(tweets.content.text)))
      .append($('<footer>')
        .append($('<div>')
          .addClass('hide')
          .text('🍄 💖 🐥'))
        .append($('<p>')
          .text(moment(tweets.created_at).fromNow())));
    return $tweet;
  }
  /*
    renders errors based on the textarea input,
    returns error if too many characters or no input
    uses loadTweets function to create tweet in tweet-container
  */
  function tweetSubmitted() {
    var $button = $('#submit');
    $button.on('click', function(event) {
      event.preventDefault();
      let text = $('#text').val();
      if(text === '' || text === null) {
        $('.char-max-error.negative').slideUp();
        $('.empty-error.negative').slideDown();
      } else if (text.length > 140) {
        $('.empty-error.negative').slideUp();
        $('.char-max-error.negative').slideDown();
      } else {
        $('.empty-error.negative').slideUp();
        $('.char-max-error.negative').slideUp();
        $.ajax(
          '/tweets', {
            method: 'post',
            data: 'text=' + text,
            complete: function() {
              $('#text').val('');
              $('.counter')[0].innerHTML = '140';
              loadTweets();
            }
          });
      }
    });
  }
  tweetSubmitted();

  /*
  loads the tweets from mongodb *tweeter* to
  load the databases tweets and to prepend new tweets
  */
  function loadTweets() {
    $.ajax('/tweets', { method: 'get'})
      .then(function(tweets) {
        tweets.forEach(function (obj) {
          let $tweet = createTweetElement(obj);
          $('#tweets-container').prepend($tweet);
        });
      });
  }
  loadTweets();

  /*allows for the toggled viewing of the new-tweet area
    by usingc compose button
  */
  $('.compose').click(function () {
    $('.new-tweet').toggle('fast');
    $('#text').focus();
  });
});
