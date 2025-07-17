import { displayPhotographerMedia, initGallery } from "./gallery.js";

// CUSTOM SELECT POUR LES FILTRES

const sortButton = document.getElementById("sortButton");
const sortOptions = document.getElementById("sortOptions");
const customSelect = document.querySelector(".custom-select");
const criteria = ["popularity", "date", "titre"];

sortButton.setAttribute("aria-haspopup", "listbox");
sortButton.setAttribute("aria-expanded", "false");
sortOptions.setAttribute("role", "listbox");

export function getLabel(value) {
  if (value === "popularity") return "Popularité";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

sortButton.addEventListener("click", () => {
  const expanded = sortButton.getAttribute("aria-expanded") === "true";
  sortButton.setAttribute("aria-expanded", String(!expanded));
  customSelect.classList.toggle("open");
  if (!expanded) {
    const firstOption = sortOptions.querySelector("li");
    if (firstOption) firstOption.focus();
  }
});

export function buildOptions(selectedValue, mediaArray) {
  const available = criteria.filter((c) => c !== selectedValue);
  sortOptions.innerHTML = "";
  available.forEach((crit) => {
    const li = document.createElement("li");
    li.dataset.value = crit;
    li.textContent = getLabel(crit);
    li.setAttribute("tabindex", "0");
    li.setAttribute("role", "option");

    li.addEventListener("click", () => {
      sortButton.childNodes[0].nodeValue = getLabel(crit);
      sortButton.dataset.value = crit;
      buildOptions(crit, mediaArray);
      customSelect.classList.remove("open");
      sortButton.setAttribute("aria-expanded", "false");
      sortMedia(mediaArray, crit);
      sortButton.focus();
    });

    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        li.click();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = li.nextElementSibling || sortOptions.firstElementChild;
        next.focus();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = li.previousElementSibling || sortOptions.lastElementChild;
        prev.focus();
      }
      if (e.key === "Escape") {
        customSelect.classList.remove("open");
        sortButton.setAttribute("aria-expanded", "false");
        sortButton.focus();
      }
    });

    sortOptions.appendChild(li);
  });
}

// Ferme le menu si clic hors du composant
document.addEventListener("click", (e) => {
  if (!customSelect.contains(e.target)) {
    customSelect.classList.remove("open");
    sortButton.setAttribute("aria-expanded", "false");
  }
});

// Initialisation
export function initCustomSelect(mediaArray) {
  sortButton.childNodes[0].nodeValue = getLabel("popularity");
  sortButton.dataset.value = "popularity";
  buildOptions("popularity", mediaArray);
}

// Fonction de TRI
export function sortMedia(mediaArray, criterion) {
  switch (criterion) {
    case "popularity":
      mediaArray.sort((a, b) => b.likes - a.likes);
      break;
    case "date":
      mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "titre":
      mediaArray.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  // Vider la galerie et ré-injecter les médias triés
  const gallery = document.querySelector(".media-gallery");
  gallery.innerHTML = "";
  displayPhotographerMedia(mediaArray);
  initGallery(mediaArray);
}
