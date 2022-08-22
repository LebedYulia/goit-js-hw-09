import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";
import { Notify } from "notiflix";

const refs = {
  myInput: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  min: document.querySelector('[data-minutes]'),
  sec: document.querySelector('[data-seconds]'),
};

let intervalId = null;
refs.startBtn.setAttribute('disabled', true)  


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);  
      const selectUserDate =  Date.parse(selectedDates[0]);      

      if (selectUserDate <= Date.now()) {
        Notify.failure('Please choose a date in the future');
        refs.startBtn.setAttribute('disabled', true)  
      } else {
        refs.startBtn.removeAttribute('disabled')       
      }

      refs.startBtn.addEventListener("click", () => {
        intervalId = setInterval(() => {
          refs.startBtn.setAttribute('disabled', true)
          const deltaTime = selectUserDate - Date.now();         

      if (deltaTime < 1000) {
        clearInterval(intervalId);
      }
      const result = convertMs(deltaTime);
      displayTimer(result);
    }, 1000);    
  });
},
};

  const fp = flatpickr(refs.myInput, options);  

  

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

  // console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  // console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  // console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


  function displayTimer({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.min.textContent = `${minutes}`;
    refs.sec.textContent = `${seconds}`;
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');

  }