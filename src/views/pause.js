import { translations } from '../i18n/fr.js';

export function renderPauseStep() {
  return `
    <h2>${translations.pause.title}</h2>
    <p>${translations.pause.message}</p>
    <button onclick="nextSchema()">${translations.pause.continueButton}</button>
  `;
}