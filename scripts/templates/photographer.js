function photographerTemplate(data) {
  //console.log("[photographerTemplate] Fonction appelée avec data :", data);
  const { name, portrait } = data;

  const picture = `assets/photographers/${portrait}`;
  //console.log(`[photographerTemplate] Construction du chemin image : ${picture}`);

  function getUserCardDOM() {
    //console.log(`[getUserCardDOM] Création de la carte pour : ${name}`);
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    article.appendChild(img);
    article.appendChild(h2);

    //console.log("[getUserCardDOM] Carte DOM créée :", article);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
