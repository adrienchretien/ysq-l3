import { initializeData } from './data/initialization.js';
import { initializeState } from './state/questionnaireState.js';
import {
  showQuestion,
  simulateResults,
  startQuestionnaire,
  submitAnswer,
  nextSchema,
  restart,
} from './controllers/questionFlow.js';
import { translations } from './i18n/fr.js';

// Make functions available globally
window.startQuestionnaire = startQuestionnaire;
window.simulateResults = simulateResults;
window.submitAnswer = submitAnswer;
window.nextSchema = nextSchema;
window.restart = restart;

async function initialize() {
  try {
    const data = await initializeData();
    initializeState(data);
    showQuestion();
  } catch (error) {
    document.getElementById(
      'app'
    ).innerHTML = `<h2>${translations.errors.initialization}</h2>`;
    console.error(error);
  }
}

initialize();
