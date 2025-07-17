// ===============================
// Gestion des likes +1 / -1 pour chaque média
// ===============================

export function incrementTotalLikes() {
  const totalLikesElement = document.getElementById("totalLikes");
  let current = parseInt(totalLikesElement.textContent, 10);
  totalLikesElement.textContent = current + 1;
}

export function decrementTotalLikes() {
  const totalLikesElement = document.getElementById("totalLikes");
  let current = parseInt(totalLikesElement.textContent, 10);
  totalLikesElement.textContent = current - 1;
}
