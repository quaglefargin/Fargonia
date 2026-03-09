class EventBus {
  constructor(options = {}) {
    this.logger = options.logger || console;
    this.listeners = new Map();
  }

  on(eventName, handler) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }

    const handlers = this.listeners.get(eventName);
    handlers.push(handler);

    return () => {
      const current = this.listeners.get(eventName) || [];
      this.listeners.set(
        eventName,
        current.filter((entry) => entry !== handler)
      );
    };
  }

  emit(eventName, payload = {}) {
    const handlers = this.listeners.get(eventName) || [];

    for (const handler of handlers) {
      try {
        handler(payload);
      } catch (error) {
        if (this.logger?.error) {
          this.logger.error("EventBus handler failed", {
            eventName,
            error: error.message
          });
        } else {
          console.error(error);
        }
      }
    }
  }

  clear(eventName = null) {
    if (eventName) {
      this.listeners.delete(eventName);
      return;
    }

    this.listeners.clear();
  }

  listenerCount(eventName) {
    return (this.listeners.get(eventName) || []).length;
  }
}

module.exports = EventBus;
