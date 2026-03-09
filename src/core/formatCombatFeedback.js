function formatCombatFeedback(input = {}) {
  const targetName = input.targetName || "Unknown";
  const visibilityLevel = input.visibilityLevel || "private";
  const witnessCount = Number(input.witnessCount || 0);
  const fearDelta = Number(input.fearDelta || 0);
  const rumorDelta = Number(input.rumorDelta || 0);

  const fearText = fearDelta >= 0.08 ? "Fear rises." : "Fear stirs.";
  const rumorText = rumorDelta >= 0.05 ? "Rumor is seeded." : "Whispers may follow.";

  let visibilityText = "Few eyes are on you.";
  if (visibilityLevel === "public" && witnessCount > 0) {
    visibilityText = "The square is watching.";
  } else if (visibilityLevel === "semi_public" && witnessCount > 0) {
    visibilityText = "Some eyes are on you.";
  }

  return `${targetName} reels back. ${fearText} ${rumorText} ${visibilityText}`;
}

module.exports = {
  formatCombatFeedback
};
