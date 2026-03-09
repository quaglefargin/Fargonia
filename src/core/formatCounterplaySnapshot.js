function fixed(value) {
  return Number(value || 0).toFixed(2);
}

function describeReadiness(value) {
  const v = Number(value || 0);

  if (v >= 0.85) return "razor-sharp";
  if (v >= 0.65) return "ready";
  if (v >= 0.45) return "steady";
  if (v >= 0.25) return "rusty";
  return "dull";
}

function formatCounterplaySnapshot(entity = {}) {
  const readiness = entity.domainReadiness || {
    physical: 0,
    social: 0,
    spiritual: 0,
    environmental: 0,
    meta: 0
  };

  const latestLesson =
    Array.isArray(entity.lessonRecords) && entity.lessonRecords.length
      ? entity.lessonRecords[entity.lessonRecords.length - 1]
      : null;

  const latestCounter =
    Array.isArray(entity.counterKnowledge) && entity.counterKnowledge.length
      ? entity.counterKnowledge[entity.counterKnowledge.length - 1]
      : null;

  return {
    readinessLines: [
      `physical: ${fixed(readiness.physical)} (${describeReadiness(readiness.physical)})`,
      `social: ${fixed(readiness.social)} (${describeReadiness(readiness.social)})`,
      `spiritual: ${fixed(readiness.spiritual)} (${describeReadiness(readiness.spiritual)})`,
      `environmental: ${fixed(readiness.environmental)} (${describeReadiness(readiness.environmental)})`,
      `meta: ${fixed(readiness.meta)} (${describeReadiness(readiness.meta)})`
    ],
    latestLesson: latestLesson
      ? `${latestLesson.domain} / ${latestLesson.lessonAccuracy} / confidence=${fixed(latestLesson.confidence)}`
      : "(none)",
    latestCounter: latestCounter
      ? `${latestCounter.counterId} / confidence=${fixed(latestCounter.confidence)} / mastery=${fixed(latestCounter.mastery)}`
      : "(none)"
  };
}

module.exports = {
  formatCounterplaySnapshot
};
