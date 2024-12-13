import { translations } from '../i18n/fr.js';
import { formatString } from '../utils/formatString.js';
import { formatSeconds } from '../utils/formatTime.js';

function showSimulateButton(showButton) {
  if (showButton) {
    return `<button onclick="simulateResults()">${translations.welcome.simulateResults}</button>`;
  }
  return '';
}

export function renderIntroduction(state) {
  const { questions, scale, config } = state;
  const totalQuestions = questions.length;
  const estimatedTime = totalQuestions * config.timerDuration;

  return `
    <h2>${translations.welcome.title}</h2>
    <p>${translations.welcome.scaleIntro}</p>
    <ul>
      ${scale.map((item) => `<li>${item.value} - ${item.label}</li>`).join('')}
    </ul>
    <p>${formatString(translations.welcome.questionsInfo, {
      count: totalQuestions,
      groups: 18,
      time: formatSeconds(estimatedTime),
    })}</p>
    <p>${translations.welcome.timeOff}</p>
    <button onclick="startQuestionnaire()">${
      translations.welcome.startButton
    }</button>
    ${showSimulateButton(config.showSimulateButton)}
  `;
}
