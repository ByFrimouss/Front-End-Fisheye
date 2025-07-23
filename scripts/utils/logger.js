// ===============================
// ACTIVE OU DÉSACTIVE LES LOGS GLOBAUX SELON DEBUGMODE
// ===============================

// Passe à false en prod pour couper les traces console
const debugMode = true;

// ==== AFFICHE UN LOG DANS LA CONSOLE SI DEBUGMODE EST ACTIF ====
export function log(message, ...args) {
  if (debugMode) {
    console.log(message, ...args);
  }
}

// ==== AFFICHE UN AVERTISSEMENT DANS LA CONSOLE SI DEBUGMODE EST ACTIF ====
export function warn(message, ...args) {
  if (debugMode) {
    console.warn(message, ...args);
  }
}

// ==== AFFICHE UNE ERREUR DANS LA CONSOLE MÊME SI DEBUGMODE EST DÉSACTIVÉ ====
// Une erreur doit être visible
export function error(message, ...args) {
  console.error(message, ...args);
}
