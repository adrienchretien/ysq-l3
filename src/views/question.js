import { renderProgressBars } from '../components/progressBar.js';

export function renderQuestion(state) {
  const { currentQuestion, questions, scale, remainingTime } = state;
  
  return `
    ${renderProgressBars(state)}
    <h2>${questions[currentQuestion].question}</h2>
    <div class="timer" id="timer">${remainingTime}</div>
    <div class="button-group">
      ${scale
        .map(
          (item) => `
        <button class="response-button" onclick="submitAnswer(${item.value})">${item.label}</button>
      `
        )
        .join('')}
    </div>
  `;
}