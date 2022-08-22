import Notiflix from 'notiflix';


const form = document.querySelector('.form');

form.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const formEl = e.currentTarget.elements;
  let delay = formEl.delay.valueAsNumber;
  const step = formEl.step.valueAsNumber;
  const amount = formEl.amount.valueAsNumber;
    
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `Fulfilled promise ${i} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `Rejected promise ${i} in ${delay}ms`
        );
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve({ position, delay });
  } else {
    reject({ position, delay });
  } }, delay);
});
}
