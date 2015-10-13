var cursor = '<span class="cursor"></span>';
var start;

$(document).ready(function () {
  window.requestAnimationFrame(type);
});

var speed = 12;
var atBat, onDeck;
var mode = 1;
function type (timeStamp) {
  atBat = $('#this'+mode).text();
  onDeck = $('#thing'+mode).text();
  if (onDeck.length > 0) {
    $('#this'+mode).text(atBat + onDeck.substring(0, speed));
    $('#thing'+mode).text(onDeck.substring(speed));
    window.requestAnimationFrame(type);
  } else {
    if (mode === 1) {
      mode = 2;
      window.requestAnimationFrame(type);
    } else {
      $('#won').append(cursor);
      start = timeStamp;
      window.requestAnimationFrame(waitForQuestion);
    }
  }
}

// Variables for question and answer
var fps = 10;
var interval = 1000 / fps;
var delta, text, word;

var q = 'Q: How does one rejoin a meta-Cornell box made by a person who (at '
      + 'least occasionally) designs puzzles for adventure games?';
function waitForQuestion (timeStamp) {
  if (timeStamp - start < 4000) window.requestAnimationFrame(waitForQuestion);
  else window.requestAnimationFrame(question);
}
function question (timeStamp) {
  delta = timeStamp - start;
  if (delta > interval) {
    if (q.length > 0) {
      text = $('#won').text();
      word = Math.floor(Math.random() * 5);
      $('#won')
      .text(text + q.substring(0, word))
      .append(cursor);
      q = q.substring(word);
      start = timeStamp - (delta % interval);
    }
    else {
      $('body').on('click', function () {
        $(this).off('click');
        $(this).addClass('time');
        start = performance.now();
        window.requestAnimationFrame(waitForAnswer);
      });
      $('body').removeClass('time');
      return;
    }
  }
  window.requestAnimationFrame(question);
}

var cursorAdvance = true;
function waitForAnswer(timeStamp) {
  if(cursorAdvance) {
    $('.cursor').remove();
    $('#notoriety').append(cursor);
    $('#notoriety').addClass('cr');
    cursorAdvance = false;
    window.requestAnimationFrame(waitForAnswer);
  } else if (timeStamp - start < 3000)
    window.requestAnimationFrame(waitForAnswer);
  else window.requestAnimationFrame(answer);
}
var a = 'A glimpse into the heart of something unfamiliar...';
function answer (timeStamp) {
  delta = timeStamp - start;
  if (delta > interval) {
    if (a.length > 0) {
      text = $('#notoriety').text();
      word = Math.floor(Math.random() * 5);
      $('#notoriety')
      .text(text + a.substring(0, word))
      .append(cursor);
      a = a.substring(word);
      start = timeStamp - (delta % interval);
      window.requestAnimationFrame(answer);
    }
    else {
      start = timeStamp;
      window.requestAnimationFrame(waitForBreadcrumb);
    }
  } else window.requestAnimationFrame(answer);
}

function waitForBreadcrumb (timeStamp) {
  if (timeStamp - start < 3000) window.requestAnimationFrame(waitForBreadcrumb);
  else {
    $('.cursor').remove();
    $('#SECRET').append(cursor);
    speed /= 4;
    window.requestAnimationFrame(breadcrumb);
  }
}
function breadcrumb (timeStamp) {
  atBat = $('#SECRET').text();
  onDeck = $('#handshake').text();
  if (onDeck.length > 0) {
    $('#SECRET')
    .text(atBat + onDeck.substring(0, speed))
    .append(cursor);
    $('#handshake').text(onDeck.substring(speed));
    window.requestAnimationFrame(breadcrumb);
  } else $('body').addClass('wakeup');
}
