/*
creates a dynamic characte counter for the textarea
returns negative number in red if over character limit
*/
$(document).ready(function () {
  var counter = parseInt($('.counter')[0].innerHTML);
  document.addEventListener('keyup', function(event) {
    var textCount = $('#text')[0].textLength;
    if(textCount > 140) {
      $('.counter').addClass('negative');
    } else if(textCount < 140) {
      $('.counter').removeClass('negative');
    }
    if(counter < 141) {
      $('.counter')[0].innerHTML = counter - textCount;
    }
  });
});