export class LocalStorageService {
  static get(key) {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  }

  static save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}
