const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const timerButtons = document.querySelectorAll('.timer__button');
const selectAlarm = document.querySelector('[name="alarm"]')

let countdown;

function timer(seconds) {
  const milisecToEnd = Date.now() + seconds * 1000;
  const end = new Date(milisecToEnd)
  timeToEnd(end);
  clearInterval(countdown);
  countdown = setInterval(() => {
    if (seconds % 60 === 0) seconds - 60;
    seconds--
    if (seconds < 0) {
      const sound = selectAlarm.value
      const alarm = document.querySelector(`[name="${sound}"`);
      alarm.play();
      clearInterval(countdown)
      return;
    }
    timeToDisplay(seconds)
  }, 1000)
};

function timeToDisplay(secs) {
  const minsToDisplay = Math.floor(secs / 60);
  const secsToDisplay = secs % 60
  const timeToDisplay = `${minsToDisplay}:${(secsToDisplay < 10 ? '0' : '')}${secsToDisplay}`
  timeLeft.textContent = timeToDisplay;
  document.title = timeToDisplay;
};

function timeToEnd(end) {
  const hour = end.getHours();
  const min = end.getMinutes();
  const sec = end.getSeconds();
  endTime.textContent = `You have time to ${hour}:${min < 10 ? '0': ''}${min}:${sec < 10 ? '0': ''}${sec}`;
};

timerButtons.forEach(timerButton => timerButton.addEventListener('click', function () {
  const secs = parseInt(this.dataset.time);1
  timeToDisplay(secs)
  timer(secs)
}));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const secs = 60 * this.minutes.value;
  timeToDisplay(secs);
  timer(secs);
  this.reset();
})