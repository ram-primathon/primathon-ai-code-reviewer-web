type StorageKey = "userDetails" | "jwtToken";

export const setItem = (key: StorageKey, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error setting item with key "${key}"`, error);
  }
};

export const getItem = <T>(key: StorageKey): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error(`Error getting item with key "${key}"`, error);
    return null;
  }
};

export const setObject = <T>(key: StorageKey, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting object with key "${key}"`, error);
  }
};

export const getObject = <T>(key: StorageKey): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error(`Error getting object with key "${key}"`, error);
    return null;
  }
};

export const removeItem = (key: StorageKey): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item with key "${key}"`, error);
  }
};

export const clearAll = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing local storage", error);
  }
};
