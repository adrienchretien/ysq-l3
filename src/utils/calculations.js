export function calculateTotals({ responses, emsList, questions, scale }) {
  return emsList.map((ems) => {
    const schemaQuestions = questions.filter((q) => q.ysqCode === ems.ysqCode);
    const schemaResponses = responses.filter((r) =>
      schemaQuestions.some((q) => q.question === r.question)
    );
    const total = schemaResponses.reduce(
      (sum, r) => sum + (r.response > 3 ? r.response : 0),
      0
    );
    const counts = scale.map((item) => ({
      value: item.value,
      count: schemaResponses.filter((r) => r.response === item.value).length,
    }));
    return {
      name: ems.name,
      ysqCode: ems.ysqCode,
      maxScore: ems.maxScore,
      total,
      counts,
    };
  });
}
