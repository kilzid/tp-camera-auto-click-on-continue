javascript:
const autoRefresh = () => {
  if (isVideoOnPause()) {
    counter++;
    if (counter <= minRetries) {
      console.log('kilzi: pause but lower then minRetries', counter, new Date().toTimeString());
      return;
    };
    counter = 0;
    window.clearInterval(ids.cancelInterval);
    clickOnContinue();
    ids.cancelIsUp = window.setInterval(() => {
      counter++;
      console.log('kilzi: checking if up', counter, new Date().toTimeString());
      if (!isVideoOnPause()) {
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
  ids.cancelInterval = window.setInterval(autoRefresh, 1 * 1000);
  counter = 0;
};

const isVideoOnPause = () => $("#JSVideo").get(0).paused;

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
ids.cancelInterval = window.setInterval(autoRefresh, 1 * 1000);
