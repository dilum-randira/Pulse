export const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).toLowerCase());

export const hasMinPasswordLength = (value, min = 6) => String(value).length >= min;
