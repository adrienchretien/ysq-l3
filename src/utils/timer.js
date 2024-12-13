let currentTimer;

export function startTimer(remainingTime, onTimeUp) {
  const timerElement = document.getElementById('timer');
  let time = remainingTime;

  if (currentTimer) {
    clearInterval(currentTimer);
  }

  currentTimer = setInterval(() => {
    time--;
    if (timerElement) {
      timerElement.textContent = time;
    }

    if (time === 0) {
      clearInterval(currentTimer);
      if (typeof onTimeUp === 'function') {
        onTimeUp();
      }
    }
  }, 1000);

  return currentTimer;
}