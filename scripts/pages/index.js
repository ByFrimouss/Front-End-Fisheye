import { photographerTemplate } from "../templates/photographer.js";

/**
 * Récupère les données des photographes depuis un fichier JSON local
 * Utilise fetch + async/await pour gérer les appels asynchrones
 */
//////  ⇩⇩⇩⇩⇩  /////////
async function getPhotographers() {
  try {
    const response = await fetch("./data/photographers.json"); // Appel du fichier JSON
    const data = await response.json(); // Conversion de la réponse HTTP en objet JavaScript
    console.log("[getPhotographers] Données récupérées :", data.photographers);

    //console.log("[getPhotographers] Fonction appelée");
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    /*  let photographers = [
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

/**
 * Affiche dynamiquement les cartes de photographes sur la page
 */
async function displayData(photographers) {
  //console.log("[displayData] Données reçues :", photographers);
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    //console.log("[displayData] Photographe en cours :", photographer.name);

    // Création du modèle de photographe
    const photographerModel = photographerTemplate(photographer);
    // Récupère l'élément DOM à insérer
    const userCardDOM = photographerModel.getUserCardDOM();
    // Ajoute la carte dans la section dédiée
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * Point d'entrée de l'application
 * Initialise l'affichage en important les données JSON
 */
async function init() {
  //console.log("[init] Initialisation");
  // Récupère les données des photographes
  const { photographers } = await getPhotographers();
  //console.log("[init] Données retournées par getPhotographers :", photographers);

  //Affiche les cartes des phOtographes dans le DOM
  displayData(photographers);
}

init();
