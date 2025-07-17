import { mediaFactory } from "./mediaFactory.js";
import { openLightbox, initLightboxEvents } from "./lightbox.js";

// ===============================
// Afichage de la galerie d'image et l'encart de prix et like
// ===============================

// Affichage dynamique des médias du photographe dans la galerie HTML
export function displayPhotographerMedia(mediaArray) {
  const gallerySection = document.querySelector(".media-gallery");

  mediaArray.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCard = mediaModel.getMediaDOM();
    gallerySection.appendChild(mediaCard);
  });
}

// Initialisation de la galerie
// Fonction qui ajoute les événements de lightbox sur chaque média
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

// Crée dynamiquement un encart de prix et de like en bas à droite de l'écran
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
