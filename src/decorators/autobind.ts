export function Autobind(_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescription: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return adjustedDescription;
  }