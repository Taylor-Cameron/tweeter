/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = [
  {
    'user': {
      'name': 'Newton',
      'avatars': {
        'small': 'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png',
        'regular': 'https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png',
        'large': 'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png'
      },
      'handle': '@SirIsaac'
    },
    'content': {
      'text': 'If I have seen further it is by standing on the shoulders of giants'
    },
    'created_at': 1461116232227
  },
  {
    'user': {
      'name': 'Descartes',
      'avatars': {
        'small': 'https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png',
        'regular': 'https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png',
        'large': 'https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png'
      },
      'handle': '@rd'
    },
    'content': {
      'text': 'Je pense , donc je suis'
    },
    'created_at': 1461113959088
  },
  {
    'user': {
      'name': 'Johann von Goethe',
      'avatars': {
        'small': 'https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png',
        'regular': 'https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png',
        'large': 'https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png'
      },
      'handle': '@johann49'
    },
    'content': {
      'text': 'Es ist nichts schrecklicher als eine tätige Unwissenheit.'
    },
    'created_at': 1461113796368
  }
];

$(document).ready(function () {
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
          .text(tweets.created_at)));
    return $tweet;
  }

  function renderTweet(tweets) {
    tweets.forEach(function(obj) {
      let $tweet = createTweetElement(obj);
      $('#tweets-container').append($tweet);
    });
  }

  renderTweet(tweetData);

  function tweetSubmitted() {
    var $button = $('#submitButton');
    $button.on('click', function(event) {
      event.preventDefault();
      let text = $('#text').val();
      $.ajax(
        '/tweets', {
          method: 'post',
          data: 'text=' + text});
      if(text === '' || text === null) {
        alert('Error: tweet is not defined');
      } else if (text.length > 140) {
        alert('Error: tweet is too many characters');
      } else {
        loadTweets();
      }
    });
  }
  tweetSubmitted();

  function loadTweets() {
    $.ajax('/tweets', { method: 'get'})
      .then(function(tweets) {
        $('#tweets-container').prepend(createTweetElement(tweets.pop()));
      });
  }
});
