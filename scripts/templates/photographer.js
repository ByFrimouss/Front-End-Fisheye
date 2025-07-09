export function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data; // mise en place du tableau JSON

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("role", "listitem");
    article.setAttribute("aria-label", `Carte du photographe ${name}`);

    // Ajout du lien autour de la carte photographe
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("aria-label", `Voir le profil du photographe ${name}`);

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Portrait de ${name}`);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    //mise à jour des autres elements
    const location = document.createElement("p");
    location.textContent = `${city}, ${country}`;
    location.classList.add("photographer-location");

    const desc = document.createElement("p");
    desc.textContent = tagline;
    desc.classList.add("photographer-tagline");

    const tarif = document.createElement("p");
    tarif.textContent = `${price}€/jour`;
    tarif.classList.add("photographer-price");

    // Assemble la carte dans le lien
    link.appendChild(img);
    link.appendChild(h2);

    // Rajout du lien
    article.appendChild(link);

    article.appendChild(location);
    article.appendChild(desc);
    article.appendChild(tarif);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
