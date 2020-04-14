// Validator
export interface Validatable {
  value: string | number;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function valid(input: Validatable): boolean {
  if (input.required && !input.value) {
    return false;
  }
  if (typeof input.value === "string") {
    if (input.minLength && input.value.trim().length < input.minLength) {
      return false;
    }
    if (input.maxLength && input.value.trim().length > input.maxLength) {
      return false;
    }
  }

  if (typeof input.value === "number") {
    if (input.min && input.value < input.min) {
      return false;
    }
    if (input.max && input.value > input.max) {
      return false;
    }
  }
  return true;
}
