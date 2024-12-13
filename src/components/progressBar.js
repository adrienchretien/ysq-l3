import { translations } from '../i18n/fr.js';

export function renderProgressBars(state) {
  const { currentQuestion, currentSchema, questions, responses } = state;
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const schemaQuestions = questions.filter((q) => q.ysqCode === currentSchema);
  const schemaProgress =
    schemaQuestions.length > 0
      ? (responses.filter((r) =>
          schemaQuestions.some((q) => q.question === r.question)
        ).length /
          schemaQuestions.length) *
        100
      : 0;

  return `
    <div class="progress-container">
      <label>${translations.progress.total}</label>
      <div class="progress-bar" style="width: ${progress}%"></div>
    </div>
    <div class="progress-container">
      <label>${translations.progress.currentSchema}</label>
      <div class="progress-bar" style="width: ${schemaProgress}%"></div>
    </div>
  `;
}