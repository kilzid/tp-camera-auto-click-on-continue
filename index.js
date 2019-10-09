javascript:
const autoRefresh = () => {
  if (shouldClickOnContinue()) {
    window.clearInterval(ids.cancelAutoRefresh);
    clickOnContinue();
    ids.cancelIsUp = window.setInterval(() => {
      counter++;
      console.log('kilzi: checking if up', counter, new Date().toTimeString());
      if (isVideoIsPlaying()) {
        console.log('kilzi: we are up!', new Date().toTimeString());
        cancelIsUp();
      };
      if (counter > max_retries) {
        console.warn('kilzi: still down. trying to refresh', new Date().toTimeString());
        cancelIsUp();
      };
    }, 1 * 1000);
  }
};

const cancelIsUp = () => {
  window.clearInterval(ids.cancelIsUp);
  ids.cancelAutoRefresh = window.setInterval(autoRefresh, 1 * 1000);
  counter = 0;
};

const shouldClickOnContinue = () => {
  return $('#continue').is(":visible") || $('.network-tips').is(":visible");
};

const isVideoIsPlaying = () => !$("#JSVideo").get(0).paused;

const clickOnContinue = () => {
  console.log("kilzi: click on continue at", new Date().toTimeString());
  $('#continue').click();
};

console.log("https://www.minifier.org/");
console.log('kilzi: starting at', new Date().toTimeString());
const minRetries = 5;
const max_retries = 20;
let counter = 0;
const ids = {};
ids.cancelAutoRefresh = window.setInterval(autoRefresh, 1 * 1000);
