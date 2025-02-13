export function saveToLocalStorage(key, value) {
  if (typeof value === "string" || typeof value === "number") {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getItemFromLocalStorage(key) {
  const value = localStorage.getItem(key);
  try {
    return value ? JSON.parse(value) : null;
  } catch (error) {
    return value;
  }
}
