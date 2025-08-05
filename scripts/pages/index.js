import { photographerTemplate } from "../templates/photographer.js";
import { log } from "../utils/logger.js";
import { getPhotographers } from "../utils/api.js";

// ===============================
// PAGE D'ACCUEIL
// ===============================

// ==== AFFICHE DYNAMIQUEMENT LES CARTES DE CHAQUE PHOTOGRAPHES ====
async function displayPhotographers(photographers) {
  //console.log("[displayPhotographers] Données reçues :", photographers);
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    // console.log("[displayPhotographers] Photographe en cours :", photographer.name);

    // Crée le profil du photographe et récupère l'élément DOM à insérer
    const card = photographerTemplate(photographer).getUserCardDOM();
    // Ajoute la carte dans la section dédiée
    photographersSection.appendChild(card);
  });
}

// ==== INITIALISATION GÉNÉRALE DE LA PAGE D'ACCUEIL ====
async function init() {
  //console.log("[init] Initialisation");
  // Récupère les données des photographes
  const photographers = await getPhotographers();

  log(
    "[getPhotographers] Données de chaque photographe récupérées :",
    photographers
  );

  //Affiche les cartes des photographes dans le DOM
  displayPhotographers(photographers);
}

// ==== LANCE L'INITIALISATION AU CHARGEMENT ====
init();
