import { startTimer } from '../utils/timer.js';
import { showSummary } from '../views/summary.js';
import { getState, updateState } from '../state/questionnaireState.js';
import { renderIntroduction } from '../views/introduction.js';
import { renderQuestion } from '../views/question.js';
import { renderPauseStep } from '../views/pause.js';

export function showQuestion() {
  const state = getState();
  const { currentQuestion, questions, app } = state;

  if (currentQuestion === -1) {
    app.innerHTML = renderIntroduction(state);
    return;
  }

  if (currentQuestion >= questions.length) {
    showSummary(state);
    return;
  }

  app.innerHTML = renderQuestion(state);
  startTimer(state.remainingTime, () => submitAnswer(null));
}

export function simulateResults() {
  let state = getState();
  const { questions, scale } = state;
  const responses = questions.map((question) => ({
    question: question.question,
    ysqCode: question.ysqCode,
    response: Math.ceil(Math.random() * scale.length),
  }));
  console.log('responses', responses);
  state = updateState({
    responses,
    currentQuestion: questions.length,
  });
  showSummary(state);
  return;
}

export function startQuestionnaire() {
  const state = getState();
  updateState({
    currentQuestion: 0,
    currentSchema: state.questions[0].ysqCode,
    remainingTime: state.config.timerDuration,
  });
  showQuestion();
}

export function submitAnswer(value) {
  const state = getState();
  const { currentQuestion, questions, timer } = state;

  if (timer) {
    clearInterval(timer);
  }

  if (currentQuestion >= 0 && currentQuestion < questions.length) {
    const responses = [...state.responses];
    responses.push({
      question: questions[currentQuestion].question,
      ysqCode: questions[currentQuestion].ysqCode,
      response: value,
    });

    const nextQuestionSchema = questions[currentQuestion + 1]?.ysqCode;
    if (state.currentSchema && state.currentSchema !== nextQuestionSchema) {
      updateState({
        responses,
        currentSchema: nextQuestionSchema,
      });
      state.app.innerHTML = renderPauseStep();
      return;
    }

    updateState({
      responses,
      currentQuestion: currentQuestion + 1,
      remainingTime: state.config.timerDuration,
    });
    showQuestion();
  }
}

export function nextSchema() {
  const state = getState();
  const nextQuestion = state.currentQuestion + 1;

  updateState({
    currentQuestion: nextQuestion,
    currentSchema: state.questions[nextQuestion]?.ysqCode,
    remainingTime: state.config.timerDuration,
  });
  showQuestion();
}

export function restart() {
  updateState({
    currentQuestion: -1,
    responses: [],
    remainingTime: getState().config.timerDuration,
  });
  showQuestion();
}
