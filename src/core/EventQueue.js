class EventQueue {
  constructor(options = {}) {
    this.logger = options.logger || console;
    this.eventBus = options.eventBus || null;
    this.events = [];
    this.nextId = 1;
  }

  createEvent(input = {}) {
    return {
      id: input.id || `event_${this.nextId++}`,
      type: input.type || "unknown",
      actor: input.actor || null,
      target: input.target || null,
      region: input.region || null,
      visibilityLevel: input.visibilityLevel || "private",
      witnessCount: Number.isInteger(input.witnessCount) ? input.witnessCount : 0,
      payload: input.payload || {},
      status: input.status || "queued",
      day: input.day ?? null,
      phase: input.phase ?? null,
      sourceEvent: input.sourceEvent || null,
      participants: Array.isArray(input.participants) ? input.participants : [],
      tags: Array.isArray(input.tags) ? input.tags : []
    };
  }

  enqueue(input = {}) {
    const event = this.createEvent(input);
    this.events.push(event);

    if (this.eventBus?.emit) {
      this.eventBus.emit("event_enqueued", { event });
    }

    return event;
  }

  listByStatus(status) {
    return this.events.filter((event) => event.status === status);
  }

  getQueued() {
    return this.listByStatus("queued");
  }

  getResolved() {
    return this.listByStatus("resolved");
  }

  getArchived() {
    return this.listByStatus("archived");
  }

  findById(eventId) {
    return this.events.find((event) => event.id === eventId) || null;
  }

  markResolved(eventId) {
    const event = this.findById(eventId);
    if (!event) return null;

    event.status = "resolved";

    if (this.eventBus?.emit) {
      this.eventBus.emit("event_resolved", { event });
    }

    return event;
  }

  markArchived(eventId) {
    const event = this.findById(eventId);
    if (!event) return null;

    event.status = "archived";

    if (this.eventBus?.emit) {
      this.eventBus.emit("event_archived", { event });
    }

    return event;
  }

  archiveResolved() {
    const resolved = this.getResolved();

    for (const event of resolved) {
      event.status = "archived";
    }

    return resolved.length;
  }

  snapshot() {
    return {
      queued: this.getQueued().length,
      resolved: this.getResolved().length,
      archived: this.getArchived().length,
      total: this.events.length
    };
  }
}

module.exports = EventQueue;
