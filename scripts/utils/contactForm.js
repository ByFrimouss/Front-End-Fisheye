import { log } from "../utils/logger.js";

// ===============================
// GESTION DE LA MODALE DE CONTACT
// ===============================

// ==== OUVERTURE DE LA MODALE ====
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
  document.body.classList.add("modal-open"); // Bloque le scroll en arrière-plan

  log("[contactForm] Événements modale initialisés");
}

// ====  FERMETURE DE LA MODALE ====
export function closeModal() {
  const modal = document.getElementById("contact_modal");

  if (!modal) {
    console.error("[closeModal] Erreur : modale introuvable.");
    return;
  }

  document.activeElement.blur(); // Retire le focus de la modale avant de la masquer
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  log("[contactForm] Modale fermée");
}

// ==== INITIALISATION DES ÉVÉNEMENTS ====
export function initModalEvents() {
  const contactButton = document.querySelector(".contact_button");
  const closeButton = document.querySelector(".close_button");

  if (!contactButton || !closeButton) {
    console.warn("[initModalEvents] Boutons de modale manquants.");
    return;
  }

  // Ouverture sur clic
  contactButton.addEventListener("click", displayModal);

  // Ouverture au clavier (Entrée ou Espace)
  contactButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      displayModal();
    }
  });

  // Fermeture sur clic
  closeButton.addEventListener("click", closeModal);

  // Fermeture au clavier (Entrée ou Espace)
  closeButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      closeModal();
    }
  });

  // Fermeture globale au clavier (Échap)
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}

// ==== SOUMISSION DU FORMULAIRE ====
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
      //prenom: data.firstName,
      nom: data.lastName,
      email: data.email,
      message: data.message,
    });

    // Ferme la modale après envoi
    closeModal();
  });
}

// ==== GÉNÈRE LE NOM DU PHOTOGRAPHE ====
export function updateModalTitle(photographerName) {
  const modalTitle = document.getElementById("contact_modal_title");
  if (modalTitle) {
    modalTitle.textContent = `Contactez-moi ${photographerName}`; // Injecte le nom
  }
}
