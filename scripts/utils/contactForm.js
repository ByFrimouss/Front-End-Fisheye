/**
 * Affiche la modale de contact
 */
export function displayModal() {
  const modal = document.getElementById("contact_modal");
  if (!modal) {
    console.error("[displayModal] Erreur : modale introuvable.");
    return;
  }
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  console.log("[displayModal] Modale affichée");
}

/**
 * Ferme la modale de contact
 */
export function closeModal() {
  const modal = document.getElementById("contact_modal");
  if (!modal) {
    console.error("[closeModal] Erreur : modale introuvable.");
    return;
  }
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  console.log("[closeModal] Modale fermée");
}

/**
 * Initialise les événements liés à la modale
 * - clic bouton "Contactez-moi"
 * - clic bouton "fermer"
 * - accessibilité clavier
 */
export function initModalEvents() {
  const contactButton = document.querySelector(".contact_button");
  const closeButton = document.querySelector(".close_button");

  if (!contactButton || !closeButton) {
    console.warn("[initModalEvents] Boutons de modale manquants.");
    return;
  }

  // ✅ Ouverture modale
  contactButton.addEventListener("click", displayModal);
  contactButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      displayModal();
    }
  });

  // ✅ Fermeture modale
  closeButton.addEventListener("click", closeModal);
  closeButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      closeModal();
    }
  });

  // (Optionnel) Échap pour fermer
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  console.log("[initModalEvents] Événements modale initialisés");
}
