import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"

const myInput = document.querySelector("#datetime-picker");
const startBtn = document.querySelector('[data-start]');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  };

  const fp = flatpickr(myInput, options); 

  startBtn.addEventListener("click", handlerBtn);
  function handlerBtn() {
    if (selectedDates < defaultDate) {
        alert ('kkk')
    }
  } 

