function formatDelta(value) {
  const number = Number(value || 0);
  const sign = number >= 0 ? "+" : "";
  return `${sign}${number.toFixed(2)}`;
}

function formatSocialFeedback(input = {}) {
  const targetName = input.targetName || "Unknown";
  const trustDelta = input.trustDelta || 0;
  const tensionDelta = input.tensionDelta || 0;
  const jealousyDelta = input.jealousyDelta || 0;
  const fearDelta = input.fearDelta || 0;
  const moodDelta = input.moodDelta || 0;

  return `${targetName}: trust ${formatDelta(trustDelta)}, tension ${formatDelta(tensionDelta)}, jealousy ${formatDelta(jealousyDelta)}, fear ${formatDelta(fearDelta)}, mood ${formatDelta(moodDelta)}`;
}

module.exports = {
  formatSocialFeedback
};
