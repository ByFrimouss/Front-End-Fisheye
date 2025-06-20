function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data; //

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Portrait de ${name}`);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    //mise à jour de la fonction
    const location = document.createElement("p");
    location.textContent = `${city}, ${country}`;
    location.classList.add("photographer-location");

    const desc = document.createElement("p");
    desc.textContent = tagline;
    desc.classList.add("photographer-tagline");

    const tarif = document.createElement("p");
    tarif.textContent = `${price}€/jour`;
    tarif.classList.add("photographer-price");

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(desc);
    article.appendChild(tarif);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
