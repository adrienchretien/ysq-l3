import { translations } from '../i18n/fr.js';
import { formatString } from '../utils/formatString.js';

export function calculateTotals({ responses, emsList, questions, scale }) {
  return emsList.map((ems) => {
    const schemaQuestions = questions.filter((q) => q.ysqCode === ems.ysqCode);
    const schemaResponses = responses.filter((r) =>
      schemaQuestions.some((q) => q.question === r.question)
    );
    const total = schemaResponses.reduce(
      (sum, r) => sum + (r.response || 0),
      0
    );
    const counts = scale.map((item) => ({
      value: item.value,
      count: schemaResponses.filter((r) => r.response === item.value).length,
    }));
    return {
      name: ems.name,
      ysqCode: ems.ysqCode,
      total,
      counts,
    };
  });
}

export function showSummary({ responses, emsList, questions, scale, app }) {
  const totals = calculateTotals({ responses, emsList, questions, scale });
  app.innerHTML = `
    <h2>${translations.summary.title}</h2>
    <table>
      <thead>
        <tr>
          <th>${translations.summary.schema}</th>
          <th>${translations.summary.ysqCode}</th>
          <th>${translations.summary.total}</th>
        </tr>
      </thead>
      <tbody>
        ${totals
          .map(
            (t) => `
          <tr>
            <td>${t.name}</td>
            <td>${t.ysqCode}</td>
            <td title="${t.counts
              .map((c) => formatString(translations.summary.valueCount, {
                value: c.value,
                count: c.count
              }))
              .join('\n')}">${t.total}</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>
    <button onclick="restart()">${translations.summary.restartButton}</button>
  `;
}