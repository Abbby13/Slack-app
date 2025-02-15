export function saveToLocalStorage(key, value) {
  if (typeof value === "string" || typeof value === "number") {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export const getItemFromLocalStorage = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn(`Cannot access localStorage: ${error.message}`);
    return null;
  }
};
