javascript:
console.log("https://www.minifier.org/");
console.log('kilzi: starting at', new Date().toTimeString());

cleanLastRun();
init();
window.ids.cancelAutoRefresh = window.setInterval(autoRefresh, 1 * 1000);

function autoRefresh() {
  if (shouldClickOnContinue()) {
    window.clearInterval(window.ids.cancelAutoRefresh);
    clickOnContinue();
    window.ids.cancelIsUp = window.setInterval(() => {
      window.counter++;
      console.log('kilzi: checking if up', window.counter, new Date().toTimeString());
      if (isVideoIsPlaying()) {
        console.log('kilzi: we are up!', new Date().toTimeString());
        cancelIsUp();
      };
      if (window.counter > window.max_retries) {
        console.warn('kilzi: still down. trying to refresh', new Date().toTimeString());
        cancelIsUp();
      };
    }, 1 * 1000);
  } else if (isVideoIsPlaying()) {
    window.lastPlaying = new Date().valueOf();
  } else {
    now = new Date().valueOf();
    diff = now - window.lastPlaying;
    if ((diff / 1000) > window.max_retries) {
      window.lastPlaying = now;
      clickOnContinue();
    }
  }
};

function cancelIsUp() {
  window.clearInterval(window.ids.cancelIsUp);
  window.counter = 0;
  window.lastPlaying = new Date().valueOf();
  window.ids.cancelAutoRefresh = window.setInterval(autoRefresh, 1 * 1000);
};

function shouldClickOnContinue() {
  if ($('.network-tips').is(":visible")) {
    console.warn('kilzi: network error. trying to refresh', new Date().toTimeString());
    return true;
  };
  if ($('#refresh').is(":visible")) {
    console.warn('kilzi: camera is offline. trying to refresh', new Date().toTimeString());
    return true;
  };
  return $('#continue').is(":visible");
};

function isVideoIsPlaying() {
  return !$("#JSVideo").get(0).paused;
};

function clickOnContinue () {
  console.log("kilzi: click on continue at", new Date().toTimeString());
  $('#continue').click();
};

function cleanLastRun() {
  if (window.ids) {
    window.clearInterval(window.ids.cancelAutoRefresh);
    window.clearInterval(window.ids.cancelIsUp);
  }
};

function init() {
  window.max_retries = 20;
  window.counter = 0;
  window.ids = {};
  clickOnContinue();
};