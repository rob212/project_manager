
  // Project Listener Type
   type Listener<T> = (items: T[]) => void;

  export class State<T> {
    // this is a list of active subscribers who want to know about state
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }
