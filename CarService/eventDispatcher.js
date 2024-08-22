class eventDispather {
    listeners = {}

    addListener(event, listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }

    dispatch(event, data) {
        const listeners = this.listeners[event]
        listeners.forEach((listener) => {
            listener(data);
        })
    }

}

module.exports = eventDispather;
