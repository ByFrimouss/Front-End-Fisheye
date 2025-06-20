async function getPhotographers() {
  // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
  // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".

  //  ⇩⇩⇩⇩⇩
  try {
    const response = await fetch("./data/photographers.json");
    const data = await response.json();
    console.log("[getPhotographers] Données récupérées :", data.photographers);

    //console.log("[getPhotographers] Fonction appelée");

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

    // et bien retourner le tableau photographers seulement une fois récupéré
    return {
      //photographers: [...photographers, ...photographers, ...photographers],
      photographers: data.photographers,
    };
  } catch (error) {
    console.error(
      "[getPhotographers] Erreur lors du chargement des données :",
      error
    );
    return { photographers: [] };
  }
}

async function displayData(photographers) {
  //console.log("[displayData] Données reçues :", photographers);
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    //console.log("[displayData] Photographe en cours :", photographer.name);
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  //console.log("[init] Initialisation");
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  //console.log("[init] Données retournées par getPhotographers :", photographers);
  displayData(photographers);
}

init();
