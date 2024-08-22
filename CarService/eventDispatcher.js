class eventDispather {
    listeners = {}
    //listeners = new Set()

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

/*     dispatch2Events(event1, event2, data) {
        const listeners = this.listeners[event1].intersect(this.listeners[event2])
        listeners.forEach((listener) => {
            listener(data);
    })
    } */

}



module.exports = eventDispather;
