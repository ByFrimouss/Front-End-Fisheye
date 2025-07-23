import { log } from "../utils/logger.js";

/* Affiche la modale de contact */
export function displayModal() {
  const modal = document.getElementById("contact_modal");
  if (!modal) {
    console.error("[displayModal] Erreur : modale introuvable.");
    return;
  }
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  log("[contactForm] Modale ouverte");
  modal.focus(); // Focus direct sur la modale
  document.body.classList.add("modal-open");
  log("[contactForm] Événements modale initialisés");
}

/* Ferme la modale de contact */
export function closeModal() {
  const modal = document.getElementById("contact_modal");
  if (!modal) {
    console.error("[closeModal] Erreur : modale introuvable.");
    return;
  }

  document.activeElement.blur(); // Retire le focus de la modale avant de la masquer
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  log("[contactForm] Modale fermée");
  document.body.classList.remove("modal-open");
}

/**
 * Initialise les événements liés à la modale
 * - clic bouton "Contactez-moi"
 * - clic bouton "fermer"
 * - accessibilité clavier
 */
export function initModalEvents() {
  const contactButton = document.querySelector(".contact_button");
  if (contactButton) contactButton.focus(); // focus sur le bouton “Contactez-moi” à la fermeture
  const closeButton = document.querySelector(".close_button");

  if (!contactButton || !closeButton) {
    console.warn("[initModalEvents] Boutons de modale manquants.");
    return;
  }

  // Ouverture modale
  contactButton.addEventListener("click", displayModal);
  contactButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      displayModal();
    }
  });

  // Fermeture modale
  closeButton.addEventListener("click", closeModal);
  closeButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      closeModal();
    }
  });

  // Échap pour fermer
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}

const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // évite le rechargement de la page

    const data = {
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    log("[contactForm] Formulaire soumis", {
      prenom: data.firstName,
      nom: data.lastName,
      email: data.email,
      message: data.message,
    });

    closeModal();
  });
}

// Génère le nom du photographe
export function updateModalTitle(photographerName) {
  const modalTitle = document.getElementById("contact_modal_title");
  if (modalTitle) {
    modalTitle.textContent = `Contactez-moi ${photographerName}`;
  }
}
