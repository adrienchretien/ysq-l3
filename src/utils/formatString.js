export function formatString(template, values) {
  return template.replace(/{(\w+)}/g, (match, key) => 
    values[key] !== undefined ? values[key] : match
  );
}