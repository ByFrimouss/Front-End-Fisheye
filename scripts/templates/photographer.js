// ===============================
// GÉNÉRATEUR DE CARTE POUR CHAQUE PHOTOGRAPHE
// ===============================

export function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data; // mise en place du tableau JSON

  // Construit le chemin vers l'image
  const picture = `assets/photographers/${portrait}`;

  // ==== CRÉE DYNAMIQUEMENT LA CARTE HTML D'UN PHOTOGRAPHE ====
  function getUserCardDOM() {
    // Conteneur principal <article>
    const article = document.createElement("article");
    article.setAttribute("role", "listitem");
    article.setAttribute("aria-label", `Carte du photographe ${name}`);

    // Ajout du lien cliquable autour de la carte photographe
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("aria-label", `Voir le profil du photographe ${name}`);

    // Portrait
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Portrait de ${name}`);

    // Nom
    const h2 = document.createElement("h2");
    h2.textContent = name;

    // Ajoute image + nom dans le lien
    link.appendChild(img);
    link.appendChild(h2);

    // Informations supplémentaires : localisation, tagline, tarif
    const location = document.createElement("p");
    location.textContent = `${city}, ${country}`;
    location.classList.add("photographer-location");

    const desc = document.createElement("p");
    desc.textContent = tagline;
    desc.classList.add("photographer-tagline");

    const tarif = document.createElement("p");
    tarif.textContent = `${price}€/jour`;
    tarif.classList.add("photographer-price");

    // Assemble la carte
    article.appendChild(link);
    article.appendChild(location);
    article.appendChild(desc);
    article.appendChild(tarif);

    return article;
  }

  // ==== CRÉE DYNAMIQUEMENT LE HEADER DU PHOTOGRAPHE ====
  function getUserHeaderDOM() {
    // Crée un conteneur <div> pour les infos du photographe
    const container = document.createElement("div");
    container.classList.add("photograph-info");

    // Nom
    const nameEl = document.createElement("h2");
    nameEl.textContent = name;

    // Lieu
    const locationEl = document.createElement("p");
    locationEl.classList.add("photographer-location");
    locationEl.textContent = `${city}, ${country}`;

    // Description
    const taglineEl = document.createElement("p");
    taglineEl.classList.add("photographer-tagline");
    taglineEl.textContent = tagline;

    container.appendChild(nameEl);
    container.appendChild(locationEl);
    container.appendChild(taglineEl);

    // Image de profil
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Portrait de ${name}`);
    img.classList.add("photographer-picture");

    return { container, img };
  }

  // Retourne les infos + les conteneurs associés (page d'accueil + page détaillé)
  return { name, picture, getUserCardDOM, getUserHeaderDOM };
}
