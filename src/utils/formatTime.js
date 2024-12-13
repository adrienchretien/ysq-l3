export function formatSeconds(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const resultItems = [];

  if (days) {
    resultItems.push(`${days} jours`);
  }

  if (hours) {
    resultItems.push(`${hours} heures`);
  }

  if (minutes) {
    resultItems.push(`${minutes} minutes`);
  }

  if (secs) {
    resultItems.push(`${secs} secondes`);
  }

  return resultItems.join(' ');
}
