function clamp01(value) {
  return Math.max(0, Math.min(1, Number(value || 0)));
}

function labelTrust(value) {
  if (value >= 0.75) return "strong";
  if (value >= 0.45) return "warming";
  if (value >= 0.2) return "tentative";
  return "none";
}

function labelTension(value) {
  if (value >= 0.75) return "volatile";
  if (value >= 0.45) return "uneasy";
  if (value >= 0.2) return "strained";
  return "calm";
}

function labelJealousy(value) {
  if (value >= 0.75) return "burning";
  if (value >= 0.45) return "sharp";
  if (value >= 0.2) return "present";
  return "absent";
}

function labelFear(value) {
  if (value >= 0.75) return "terrified";
  if (value >= 0.45) return "afraid";
  if (value >= 0.2) return "wary";
  return "none";
}

function deriveDisposition(trust, tension, jealousy, fear) {
  if (fear >= 0.6 || tension >= 0.7) return "hostile";
  if (trust >= 0.55 && tension < 0.35) return "friendly";
  if (trust >= 0.25 && tension < 0.5) return "open";
  if (jealousy >= 0.45) return "guarded";
  if (fear >= 0.2 || tension >= 0.2) return "wary";
  return "unclear";
}

function summarizeRelationship(input = {}) {
  const trust = clamp01(input.trust);
  const tension = clamp01(input.tension);
  const jealousy = clamp01(input.jealousy);
  const fear = clamp01(input.fear);

  return {
    disposition: deriveDisposition(trust, tension, jealousy, fear),
    trust: {
      value: trust,
      label: labelTrust(trust)
    },
    tension: {
      value: tension,
      label: labelTension(tension)
    },
    jealousy: {
      value: jealousy,
      label: labelJealousy(jealousy)
    },
    fear: {
      value: fear,
      label: labelFear(fear)
    }
  };
}

module.exports = {
  summarizeRelationship
};
