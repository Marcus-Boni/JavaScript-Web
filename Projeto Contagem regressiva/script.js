const daysContainer = document.querySelector("#days");
const hoursContainer = document.querySelector("#hours");
const minutesContainer = document.querySelector("#minutes");
const secondsContainer = document.querySelector("#seconds");
const nextYearContainer = document.querySelector("#year");
const spinnerLoading = document.querySelector("#loading");
const countdownContainer = document.querySelector("#countdown");

const nextYear = new Date().getFullYear() + 1;
const newYearTime = new Date(`January 01 ${nextYear} 00:00:00`);

nextYearContainer.textContent = nextYear;

const getTimeUnit = (unit) => (unit < 10 ? "0" + unit : unit);

const insertCountdownValues = ({ days, hours, minutes, seconds }) => {
  daysContainer.textContent = getTimeUnit(days);
  hoursContainer.textContent = getTimeUnit(hours);
  minutesContainer.textContent = getTimeUnit(minutes);
  secondsContainer.textContent = getTimeUnit(seconds);
};

const updateCountdown = () => {
  const currentTime = new Date();
  const difference = newYearTime - currentTime;
  const days = Math.floor(difference / 1000 / 60 / 60 / 24);
  const hours = Math.floor(difference / 1000 / 60 / 60) % 24;
  const minutes = Math.floor(difference / 1000 / 60) % 60;
  const seconds = Math.floor(difference / 1000) % 60;

  insertCountdownValues({ days, hours, minutes, seconds });
};

const handleCountdownDisplay = () => {
  spinnerLoading.remove();
  countdownContainer.style.display = "flex";
};

setTimeout(handleCountdownDisplay, 1000);

setInterval(updateCountdown, 1000);

let i = 0;
let time = 3000;
let images = [];

images[0] = "img/photo_1.webp";
images[1] = "img/photo_2.jpg";
images[2] = "img/photo_3.jpg";
images[3] = "img/photo_4.jpg";

const changeImage = () => {
  document.body.style.backgroundImage = `url("${images[i]}")`;

  if (i < images.length - 1) {
    i++;
  } else {
    i = 0;
  }
};
setInterval(changeImage, time);
