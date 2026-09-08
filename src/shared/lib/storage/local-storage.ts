export function readJson<T>(key: string): T | null {
  if (import.meta.server) return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    console.error(`Не удалось прочитать данные из LocalStorage по ключу ${key}`);
    return null;
  }
}

export function writeJson(key: string, value: unknown): void {
  if (import.meta.server) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error(`Не удалось записать данные в LocalStorage по ключу ${key}`);
  }
}

export function removeItem(key: string): void {
  if (import.meta.server) return;
  try {
    localStorage.removeItem(key);
  } catch {
    console.error(`Не удалось удалить данные из LocalStorage по ключу ${key}`);
  }
}
