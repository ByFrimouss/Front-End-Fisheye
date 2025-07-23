import { photographerTemplate } from "../templates/photographer.js";
import { log } from "../utils/logger.js";

// ===============================
// SCRIPT DE LA PAGE D'ACCUEIL
// ===============================

// ==== RÉCUPÈRE LES PHOTOGRAPHES DEPUIS LE JSON LOCAL ====
//////  ⇩⇩⇩⇩⇩  /////////
async function getPhotographers() {
  try {
    const response = await fetch("./data/photographers.json"); // Appel du fichier JSON
    const data = await response.json(); // Conversion de la réponse HTTP en objet JavaScript
    log(
      "[getPhotographers] Données de chaque photographe récupérées :",
      data.photographers
    );

    //console.log("[getPhotographers] Fonction appelée");
    /* Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
     mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
      let photographers = [
    {
      name: "Ma data test",
      id: 1,
      city: "Paris",
      country: "France",
      tagline: "Ceci est ma data test",
      price: 400,
      portrait: "account.png",
    },
    {
      name: "Autre data test",
      id: 2,
      city: "Londres",
      country: "UK",
      tagline: "Ceci est ma data test 2",
      price: 500,
      portrait: "account.png",
    },
  ]; */

    //console.log("[getPhotographers] Données récupérées :", photographers);

    // Retourner le tableau photographers seulement une fois récupéré
    return {
      //photographers: [...photographers, ...photographers, ...photographers],
      photographers: data.photographers,
    };
  } catch (error) {
    console.error(
      "[getPhotographers] Erreur lors du chargement des données :",
      error
    );
    return { photographers: [] }; // Sinon retourne un tableau vide
  }
}

// ==== AFFICHE DYNAMIQUEMENT LES CARTES DE CHAQUE PHOTOGRAPHES ====
async function displayPhotographers(photographers) {
  //console.log("[displayData] Données reçues :", photographers);
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    // console.log("[displayData] Photographe en cours :", photographer.name);

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
  const { photographers } = await getPhotographers();

  //Affiche les cartes des photographes dans le DOM
  displayPhotographers(photographers);
}

// ==== LANCE L'INITIALISATION AU CHARGEMENT ====
init();
