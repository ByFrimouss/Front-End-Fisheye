import { lightboxMediaFactory } from "../utils/mediaFactory.js";
import { log } from "../utils/logger.js";

// ===============================
// GESTION DE LA LIGHTBOX (OUVERTURE, FERMETURE, NAVIGATION, ÉVÉNEMENTS)
// ===============================

let currentIndex = 0; // Position du média courant
let currentMediaArray = []; // Tableau complet des médias affichés

// ==== OUVERTURE DE LA LIGHTBOX ====
export function openLightbox(media, index, mediaArray) {
  currentIndex = index;
  currentMediaArray = mediaArray;

  const lightbox = document.getElementById("lightbox");
  const mediaContainer = lightbox.querySelector(".lightbox-media");

  mediaContainer.innerHTML = ""; // Nettoie

  // Crée l'élément média (image ou vidéo)
  const mediaElement = lightboxMediaFactory(media);
  mediaContainer.appendChild(mediaElement);

  // Ajoute le titre du média
  const titleElement = document.createElement("p");
  titleElement.classList.add("lightbox-title");
  titleElement.textContent = media.title;
  mediaContainer.appendChild(titleElement);

  // Affiche la lightbox
  lightbox.style.display = "flex";
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  log(
    `[Lightbox] Média affiché : "${media.title}" (Média ${index + 1}/${
      currentMediaArray.length
    })`
  );

  // Focus sur le bouton fermer pour l'accessibilité
  const closeBtn = lightbox.querySelector(".lightbox-close");
  if (closeBtn) {
    closeBtn.focus();
  }
}

// ==== FERMETURE DE LA LIGHTBOX ====
export function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto";

  // Focus sur le bouton contact pour garder la navigation clavier
  const fallbackFocus = document.querySelector(".contact_button");
  if (fallbackFocus) fallbackFocus.focus();
}

// ==== MÉDIA SUIVANT ====
export function showNextMedia() {
  currentIndex = (currentIndex + 1) % currentMediaArray.length;
  openLightbox(
    currentMediaArray[currentIndex],
    currentIndex,
    currentMediaArray
  );
}

// ==== MÉDIA PRÉCÉDENT ====
export function showPreviousMedia() {
  currentIndex =
    (currentIndex - 1 + currentMediaArray.length) % currentMediaArray.length;
  openLightbox(
    currentMediaArray[currentIndex],
    currentIndex,
    currentMediaArray
  );
}

// ==== INITIALISE TOUS LES ÉCOUTEURS POUR LA LIGHTBOX ====
export function initLightboxEvents() {
  const closeBtn = document.querySelector(".lightbox-close");
  const nextBtn = document.querySelector(".lightbox-next");
  const prevBtn = document.querySelector(".lightbox-prev");

  // Clics
  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNextMedia);
  prevBtn.addEventListener("click", showPreviousMedia);

  // Clavier : Escape, Flèches
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowRight") showNextMedia();
    else if (e.key === "ArrowLeft") showPreviousMedia();
  });
}
