import { mediaFactory } from "./mediaFactory.js";
import { openLightbox, initLightboxEvents } from "./lightbox.js";
import { log } from "../utils/logger.js";

// ===============================
// AFICHAGE DE LA GALERIE D'IMAGE ET L'ENCART DE PRIX ET LIKE
// ===============================

// ==== AFFICHAGE DYNAMIQUE DES MÉDIAS DU PHOTOGRAPHE DANS LA GALERIE ====
export function displayPhotographerMedia(mediaArray, photographerName) {
  const gallerySection = document.querySelector(".media-gallery");
  const name =
    photographerName ||
    mediaArray[0]?.photographerName ||
    "(photographe non précisé)";

  mediaArray.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCard = mediaModel.getMediaDOM();
    gallerySection.appendChild(mediaCard);
  });

  log(`[Gallery] ${mediaArray.length} médias affichés pour : (${name})`);
}

// ==== INITIALISATION DE LA GALERIE ====
export function initGallery(mediaArray) {
  const mediaElements = document.querySelectorAll(".media-card");

  mediaElements.forEach((element, index) => {
    element.addEventListener("click", () => {
      openLightbox(mediaArray[index], index, mediaArray);
    });

    element.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(mediaArray[index], index, mediaArray);
      }
    });
  });

  // Initialise les contrôles clavier et boutons
  initLightboxEvents();
}

// ==== CRÉE DYNAMIQUEMENT UN ENCART DE PRIX ET DE LIKE EN BAS À DROITE DE L'ÉCRAN ====
export function displayPhotographerPrice(price, totalLikes) {
  const priceTag = document.createElement("div");
  priceTag.classList.add("price-tag");
  priceTag.setAttribute(
    "aria-label",
    "Tarif journalier et likes du photographe"
  );

  priceTag.innerHTML = ` <span class="total-likes">
      <span id="totalLikes">${totalLikes}</span> ❤
    </span>
    <span>${price}€ / jour</span>
  `;
  document.body.appendChild(priceTag);
}
