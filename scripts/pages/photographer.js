// Mettre le code JavaScript lié à la page photographer.html

// ===============================
// Importation des fonctions
// ===============================
import { getPhotographers, getMedia } from "../utils/api.js";
import {
  displayPhotographerPrice,
  displayPhotographerMedia,
  initGallery,
} from "../utils/gallery.js";
import { initCustomSelect } from "../utils/sort.js";
import { initModalEvents, updateModalTitle } from "../utils/contactForm.js";
import { initLightboxEvents } from "../utils/lightbox.js";

console.log("[photographer.js] initModalEvents importée avec succès");

// ===============================
// Fonctions utilitaires
// ===============================

// Extrait l'ID du photographe depuis l'URL
function getPhotographerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"), 10);
}

// ===============================
// Affichage dans le DOM
// ===============================

// Affiche les informations du photographe dans l'en-tête de la page
function displayPhotographerData(photographer) {
  const header = document.querySelector(".photograph-header");

  // Crée un conteneur texte
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

  // Crée une image
  const picture = document.createElement("img");
  picture.setAttribute(
    "src",
    `../assets/photographers/${photographer.portrait}`
  );
  picture.setAttribute("alt", `Portrait de ${photographer.name}`);
  picture.classList.add("photographer-picture");

  // Sélectionne le bouton
  const button = header.querySelector(".contact_button");

  // Injecter les éléments AVANT le bouton
  header.insertBefore(infoContainer, button);
  header.appendChild(picture); // l'image va après le bouton
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
    updateModalTitle(selected.name);

    const mediaArray = await getMedia();
    const photographerMedia = mediaArray.filter((m) => m.photographerId === id);
    console.log(photographerMedia);

    // Affiche le tarif et les likes en bas à droite
    const totalLikes = photographerMedia.reduce((sum, m) => sum + m.likes, 0);
    displayPhotographerPrice(selected.price, totalLikes);

    displayPhotographerMedia(photographerMedia); // Injecte les cartes médias dans la galerie

    initGallery(photographerMedia);

    initModalEvents(); // Active les événements d’ouverture/fermeture de la modale
    initLightboxEvents(); // Active les events de la lightbox (flèches, esc, etc.)
    initCustomSelect(photographerMedia); // Active la gestion des filtres
  } else {
    console.error(`[init] Photographe avec ID ${id} non trouvé.`);
  }
}

init();
