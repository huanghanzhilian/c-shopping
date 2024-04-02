class LocalStorage {
  constructor() { }

  static setItem(key, value) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  static getItem(key) {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key)
    }
    return null
  }

  static removeItem(key) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key)
    }
  }
}

export default LocalStorage
