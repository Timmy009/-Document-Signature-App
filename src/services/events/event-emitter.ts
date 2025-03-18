/* eslint-disable @typescript-eslint/no-explicit-any */
export default class CustomEventEmitter {
  _events: Record<string, Array<(data: unknown) => void>>;
  constructor() {
    this._events = {};
  }

  on(name: string, listener: any): void {
    if (!this._events[name]) {
      this._events[name] = [];
    }

    this._events[name].push(listener);
  }

  removeListener(name: string, listenerToRemove: any): void {
    if (!this._events[name]) {
      throw new Error(
        `Can't remove a listener. Event "${name}" doesn't exits.`
      );
    }

    const filterListeners = (listener: any) => listener !== listenerToRemove;

    this._events[name] = this._events[name].filter(filterListeners);
  }

  emit<D>(name: string, data: D): void {
    if (!this._events[name]) {
      throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
    }

    const fireCallbacks = (callback: (arg0: D) => void) => {
      callback(data);
    };

    this._events[name].forEach(fireCallbacks);
  }
}
