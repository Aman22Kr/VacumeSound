import { SITE } from '../config/site';

// Safe, namespaced localStorage helpers. Never throws.
// NOTE: localStorage is per-browser and per-device. It does not sync and is not an account.
export function readStore(key, fallback, validate) {
  try {
    const raw = window.localStorage.getItem(SITE.storagePrefix + key);
    if (raw == null) return fallback;
    const parsed = JSON.parse(raw);
    if (validate && !validate(parsed)) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
}

export function writeStore(key, value) {
  try {
    window.localStorage.setItem(SITE.storagePrefix + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStore(key) {
  try {
    window.localStorage.removeItem(SITE.storagePrefix + key);
  } catch {
    /* ignore */
  }
}

export function clearAllStore() {
  try {
    Object.keys(window.localStorage)
      .filter((k) => k.startsWith(SITE.storagePrefix))
      .forEach((k) => window.localStorage.removeItem(k));
  } catch {
    /* ignore */
  }
}
