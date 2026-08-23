export function humanize(value) {
  if (!value) return "—";
  return String(value)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatAnswer(value) {
  if (Array.isArray(value)) return value.map(humanize).join(", ");
  return humanize(value);
}
