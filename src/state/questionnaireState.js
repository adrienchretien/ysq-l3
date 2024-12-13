let state = {
  currentQuestion: -1,
  currentSchema: '',
  questions: [],
  responses: [],
  remainingTime: 0,
  timer: null,
  config: null,
  scale: null,
  emsList: null,
  app: null,
};

export function getState() {
  return state;
}

export function initializeState(initialData) {
  const { config, scale, questions, emsList } = initialData;
  state = {
    ...state,
    config,
    scale,
    questions,
    emsList,
    app: document.getElementById('app'),
    currentQuestion: -1,
    responses: [],
    remainingTime: config.timerDuration,
  };
}

export function updateState(updates) {
  state = { ...state, ...updates };
  return state;
}

export function resetState() {
  updateState({
    currentQuestion: -1,
    responses: [],
    remainingTime: state.config.timerDuration,
  });
}
