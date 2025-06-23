//Mettre le code JavaScript lié à la page photographer.html
import { mediaFactory } from "./mediaFactory.js"; // si ce n'est pas déjà fait

// Récupération des données
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

// Récupère les médias depuis le fichier JSON
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

// Récupération de l'ID depuis l'URL
function getPhotographerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"), 10);
}

// Affichage dynamique
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

// Initialisation
async function init() {
  const id = getPhotographerIdFromUrl();

  const photographers = await getPhotographers();
  const selected = photographers.find((p) => p.id === id);

  if (selected) {
    displayPhotographerData(selected);

    const mediaArray = await getMedia();
    const photographerMedia = mediaArray.filter((m) => m.photographerId === id);
    console.log(photographerMedia); // ✅ Est-ce que ça affiche un tableau ?
    displayPhotographerMedia(photographerMedia);
  } else {
    console.error(`[init] Photographe avec ID ${id} non trouvé.`);
  }
}

init();

// Gestion ouverture modale
const contactButton = document.querySelector(".contact_button");
if (contactButton) {
  contactButton.addEventListener("click", displayModal);
  contactButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      displayModal();
    }
  });
}

// Gestion fermeture modale
const closeButton = document.querySelector(".close_button");
if (closeButton) {
  closeButton.addEventListener("click", closeModal);
  closeButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      closeModal();
    }
  });
}

function displayPhotographerMedia(mediaArray) {
  const gallerySection = document.querySelector(".media-gallery"); // 👈 à mettre dans ton HTML

  mediaArray.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCard = mediaModel.getMediaDOM(); // appelle ta méthode
    gallerySection.appendChild(mediaCard);
  });
}
