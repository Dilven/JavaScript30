
const player = document.querySelector('.player');
const video = player.querySelector('video[class="player__video viewer"]');
const buttonToggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const progressBar = player.querySelector('.progress__filled');
const progress = player.querySelector('.progress');
const playerSlider = player.querySelectorAll('.player__slider');
const buttonFullScreen = player.querySelector('.player__fullscreen');


console.dir(video);

function playVideo() {
  const method = video.paused ? 'play' : 'pause';
  buttonToggle.textContent = !video.paused ? '►' : '❚ ❚';
  video[method]();
  console.dir(video);
};

function skip() {
  const time = this.dataset.skip;
  video.currentTime += parseFloat(time);
};

function updateProgress () {
  const percentVideo = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percentVideo}%`
};

function rangeUpdate() {
  video[this.name] = this.value
};

function slideMovie(e) {
  const slideTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = slideTime;
  console.log(slideTime)
}

function openFullScreen () {
  video.webkitEnterFullscreen();
  console.log('milenie sie udało')
}

let mousedown = false;

video.addEventListener('click', playVideo);
buttonToggle.addEventListener('click', playVideo);
skipButtons.forEach(button => button.addEventListener('click', skip))
video.addEventListener('timeupdate',updateProgress);
playerSlider.forEach(slider => slider.addEventListener('change', rangeUpdate));
playerSlider.forEach(slider => slider.addEventListener('mousemove', rangeUpdate));

progress.addEventListener('click', slideMovie);
progress.addEventListener('mousemove', (e) => mousedown && slideMovie(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false); 

buttonFullScreen.addEventListener('click', openFullScreen)


