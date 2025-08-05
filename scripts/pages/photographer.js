import { getPhotographers, getMedia } from "../utils/api.js";
import { photographerTemplate } from "../templates/photographer.js";
import { displayPhotographerPrice, initGallery } from "../utils/gallery.js";
import { initCustomSelect } from "../utils/sort.js";
import { initModalEvents, updateModalTitle } from "../utils/contactForm.js";
import { initLightboxEvents } from "../utils/lightbox.js";
import { log } from "../utils/logger.js";

// ===============================
// SCRIPT PRINCIPAL POUR LA PAGE PHOTOGRAPHER.HTML
// ===============================

// ==== RÉCUPÈRE L'ID DU PHOTOGRAPHE DEPUIS L'URL ====
function getPhotographerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"), 10);
}

// ==== AFFICHE LES INFOS DU PHOTOGRAPHE DANS L'EN-TÊTE ====
function displayPhotographerData(photographer) {
  const header = document.querySelector(".photograph-header");

  // Sélectionne le bouton
  const button = header.querySelector(".contact_button");

  // Réutilise le template existant
  const template = photographerTemplate(photographer);

  // Récupère les éléments à insérer (texte + image)
  const { container, img } = template.getUserHeaderDOM();

  header.insertBefore(container, button);
  header.appendChild(img); // Insère la photo après le bouton
}

// ==== INITIALISATION GLOBALE DE LA PAGE PHOTOGRAPHER.HTML ====
async function init() {
  const id = getPhotographerIdFromUrl();

  const photographers = await getPhotographers();
  const selected = photographers.find((p) => p.id === id);

  log(
    "[getPhotographerIdFromUrl] Photographe sélectionné depuis l'URL :",
    selected
  );

  if (selected) {
    displayPhotographerData(selected); // Affiche les infos du photographe
    updateModalTitle(selected.name);

    // Affiche les médias filtré du photographe via l'ID
    const mediaArray = await getMedia();
    const photographerMedia = mediaArray.filter((m) => m.photographerId === id);

    // Affiche le tarif et le total de likes en bas à droite
    const totalLikes = photographerMedia.reduce((sum, m) => sum + m.likes, 0);
    displayPhotographerPrice(selected.price, totalLikes);

    initGallery(photographerMedia);
    initModalEvents(); // Active les événements d’ouverture/fermeture de la modale
    initLightboxEvents(); // Active les events de la lightbox (flèches, esc, etc.)
    initCustomSelect(photographerMedia, selected.name); // Active la gestion des filtres
  } else {
    console.error(`[init] Photographe avec ID ${id} non trouvé.`);
  }
}

// ==== LANCE L'INITIALISATION AU CHARGEMENT ====
init();
