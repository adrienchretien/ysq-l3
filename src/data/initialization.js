import { loadFile } from '../utils/loadFile.js';

export async function initializeData() {
  const config = await loadFile('data/config.json');
  const scale = await loadFile('data/scale.json');
  const emsList = await loadFile('data/ems.json');
  const questionData = await loadFile('data/questions.json');

  if (!config || !scale || !emsList || !questionData) {
    throw new Error('Erreur lors du chargement des données');
  }

  return {
    config,
    scale,
    emsList,
    questions: questionData.questions,
  };
}
