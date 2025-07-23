const debugMode = true; // false pour désactiver tous les logs

export function log(message, ...args) {
  if (debugMode) {
    console.log(message, ...args);
  }
}

export function warn(message, ...args) {
  if (debugMode) {
    console.warn(message, ...args);
  }
}

export function error(message, ...args) {
  console.error(message, ...args);
}
