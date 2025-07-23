import { lightboxMediaFactory } from "../utils/mediaFactory.js";
import { log } from "../utils/logger.js";

let currentIndex = 0;
let currentMediaArray = [];

export function openLightbox(media, index, mediaArray) {
  currentIndex = index;
  currentMediaArray = mediaArray;

  const lightbox = document.getElementById("lightbox");
  const mediaContainer = lightbox.querySelector(".lightbox-media");

  mediaContainer.innerHTML = ""; // Nettoie

  const mediaElement = lightboxMediaFactory(media);

  // Ajoute le titre
  mediaContainer.appendChild(mediaElement);

  const titleElement = document.createElement("p");
  titleElement.classList.add("lightbox-title");
  titleElement.textContent = media.title;

  mediaContainer.appendChild(titleElement);

  lightbox.style.display = "flex";
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  log(
    `[Lightbox] Média affiché : "${media.title}" (Média ${index + 1}/${
      currentMediaArray.length
    })`
  );

  // Focus sur le bouton fermer
  const closeBtn = lightbox.querySelector(".lightbox-close");
  if (closeBtn) {
    closeBtn.focus();
  }
}

export function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto";

  // Focus sur le bouton "Contact"
  const fallbackFocus = document.querySelector(".contact_button");
  if (fallbackFocus) fallbackFocus.focus();
}

export function showNextMedia() {
  currentIndex = (currentIndex + 1) % currentMediaArray.length;
  openLightbox(
    currentMediaArray[currentIndex],
    currentIndex,
    currentMediaArray
  );
}

export function showPreviousMedia() {
  currentIndex =
    (currentIndex - 1 + currentMediaArray.length) % currentMediaArray.length;
  openLightbox(
    currentMediaArray[currentIndex],
    currentIndex,
    currentMediaArray
  );
}

export function initLightboxEvents() {
  const closeBtn = document.querySelector(".lightbox-close");
  const nextBtn = document.querySelector(".lightbox-next");
  const prevBtn = document.querySelector(".lightbox-prev");

  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNextMedia);
  prevBtn.addEventListener("click", showPreviousMedia);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowRight") showNextMedia();
    else if (e.key === "ArrowLeft") showPreviousMedia();
  });
}
