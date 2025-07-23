// ===============================
// Récupération des données depuis le fichier JSON
// ===============================

// Récupération de la liste des photographes
export async function getPhotographers() {
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
export async function getMedia() {
  try {
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
    //log("[getMedia] Media récupérés :", data.media);
    return data.media;
  } catch (error) {
    console.error("[getMedia] Erreur :", error);
    return [];
  }
}
