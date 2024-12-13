export const translations = {
  welcome: {
    title: 'Bienvenue dans le questionnaire YSQ',
    scaleIntro: 'Vous répondrez à des questions avec une échelle de notation :',
    questionsInfo:
      'Ce questionnaire comporte <strong>{count} questions</strong> divisées en <strong>{groups} groupes</strong> et devrait prendre environ <strong>{time}</strong>.',
    timeOff:
      'Une pause sera mise en place à la fin de chaque groupe de question.',
    startButton: 'Commencer',
    simulateResults: 'Simulation',
  },
  progress: {
    total: 'Progression totale',
    currentSchema: 'Schéma en cours',
  },
  pause: {
    title: 'Pause entre les schémas',
    message:
      'Vous avez terminé un schéma. Prenez un moment pour vous reposer avant de continuer.',
    continueButton: 'Continuer',
  },
  summary: {
    title: 'Résumé des réponses par schéma',
    schema: 'Schéma',
    ysqCode: 'YSQ Code',
    total: 'Total (max)',
    restartButton: 'Recommencer',
    valueCount: 'Valeur {value}: {count} réponses',
  },
  errors: {
    initialization: "Erreur lors de l'initialisation.",
  },
};
