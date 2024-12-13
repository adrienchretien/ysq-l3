import { translations } from '../i18n/fr.js';
import { formatString } from '../utils/formatString.js';
import { calculateTotals } from '../utils/calculations.js';

export function showSummary(state) {
  console.log(state);
  const { responses, emsList, questions, scale, app } = state;
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
            <td class="dotted" title="${t.counts
              .map((c) =>
                formatString(translations.summary.valueCount, {
                  value: c.value,
                  count: c.count,
                })
              )
              .join('\n')}">${t.total} (${t.maxScore})</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>
    <button onclick="restart()">${translations.summary.restartButton}</button>
  `;
}
