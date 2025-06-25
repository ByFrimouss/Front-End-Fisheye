// Mettre le code JavaScript lié à la page photographer.html
import { mediaFactory } from "./mediaFactory.js";
import { displayModal, closeModal } from "../utils/contactForm.js";

// ===============================
// Fonctions utilitaires
// ===============================

// Extrait l'ID du photographe depuis l'URL
function getPhotographerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"), 10);
}

// ===============================
// Récupération des données depuis le fichier JSON
// ===============================

// Récupèration de la liste des photographes
async function getPhotographers() {
  try {
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
    return data.photographers;
  } catch (error) {
    console.error("[getPhotographers] Erreur :", error);
    return [];
  }
}

// Récupération de la galerie médias
async function getMedia() {
  try {
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
    return data.media;
  } catch (error) {
    console.error("[getMedia] Erreur :", error);
    return [];
  }
}

// ===============================
// Affichage dans le DOM
// ===============================

// Affiche les informations du photographe dans l'en-tête de la page
function displayPhotographerData(photographer) {
  const header = document.querySelector(".photograph-header");

  // Créer conteneur texte
  const infoContainer = document.createElement("div");
  infoContainer.classList.add("photograph-info");

  const name = document.createElement("h2");
  name.textContent = photographer.name;

  const location = document.createElement("p");
  location.textContent = `${photographer.city}, ${photographer.country}`;
  location.classList.add("photographer-location");

  const tagline = document.createElement("p");
  tagline.textContent = photographer.tagline;
  tagline.classList.add("photographer-tagline");

  infoContainer.appendChild(name);
  infoContainer.appendChild(location);
  infoContainer.appendChild(tagline);

  // Créer image
  const picture = document.createElement("img");
  picture.setAttribute(
    "src",
    `../assets/photographers/${photographer.portrait}`
  );
  picture.setAttribute("alt", `Portrait de ${photographer.name}`);
  picture.classList.add("photographer-picture");

  // Trouver le bouton
  const button = header.querySelector(".contact_button");

  // Injecter les éléments AVANT le bouton
  header.insertBefore(infoContainer, button);
  header.appendChild(picture); // l'image va après le bouton
}

// Affichage dynamique des médias du photographe dans la galerie HTML
function displayPhotographerMedia(mediaArray) {
  const gallerySection = document.querySelector(".media-gallery");

  mediaArray.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCard = mediaModel.getMediaDOM();
    gallerySection.appendChild(mediaCard);
  });
}

// Crée dynamiquement un encart de prix en bas à droite de l'écran
function displayPhotographerPrice(price) {
  const priceTag = document.createElement("div");
  priceTag.classList.add("price-tag");
  priceTag.setAttribute("aria-label", "Tarif journalier du photographe");

  priceTag.innerHTML = `<span>${price}€ / jour</span>`;
  document.body.appendChild(priceTag);
}

// ===============================
// Initialisation globale
// ===============================

// Initialise la page du photographe avec ses données et ses médias
async function init() {
  const id = getPhotographerIdFromUrl();

  const photographers = await getPhotographers();
  const selected = photographers.find((p) => p.id === id);

  if (selected) {
    displayPhotographerData(selected); // Affiche les infos du photographe
    displayPhotographerPrice(selected.price); // Affiche le tarif en bas à droite

    const mediaArray = await getMedia();
    const photographerMedia = mediaArray.filter((m) => m.photographerId === id);
    console.log(photographerMedia);
    displayPhotographerMedia(photographerMedia);

    // Active les événements d’ouverture/fermeture de la modale
    initModalEvents();
  } else {
    console.error(`[init] Photographe avec ID ${id} non trouvé.`);
  }
}

init();

// ===============================
// Gestion de la modale contact
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const openModalBtn = document.querySelector(
    ".photograph-header .contact_button"
  );
  const closeModalBtn = document.querySelector(".close_button");

  if (openModalBtn) {
    openModalBtn.addEventListener("click", displayModal);
    openModalBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        displayModal();
      }
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
    closeModalBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        closeModal();
      }
    });
  }
});
