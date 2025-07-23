// ===============================
// MODULE DE TRI CUSTOM + ACCESSIBILITÉ ARIA
// ===============================

import { displayPhotographerMedia, initGallery } from "./gallery.js";
import { log } from "../utils/logger.js";

// ==== CONFIGURATION DES ÉLÉMENTS DU DOM ====
const sortButton = document.getElementById("sortButton");
const sortOptions = document.getElementById("sortOptions");
const customSelect = document.querySelector(".custom-select");
const criteria = ["popularity", "date", "titre"];

// ==== ACCESSIBILITÉ ARIA ====
sortButton.setAttribute("aria-haspopup", "listbox");
sortButton.setAttribute("aria-expanded", "false");
sortOptions.setAttribute("role", "listbox");

// ==== FORMATE LE LABEL POUR LES OPTIONS ====
export function getLabel(value) {
  if (value === "popularity") return "Popularité";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// ==== ÉVÉNEMENTS PRINCIPAUX ====
sortButton.addEventListener("click", () => {
  const expanded = sortButton.getAttribute("aria-expanded") === "true";
  sortButton.setAttribute("aria-expanded", String(!expanded));
  customSelect.classList.toggle("open");

  log(`[Tri] Menu ${!expanded ? "ouvert" : "fermé"}`);

  if (!expanded) {
    const firstOption = sortOptions.querySelector("li");
    if (firstOption) firstOption.focus();
  }
});

// ==== CONSTRUCTION DES OPTIONS ====
export function buildOptions(selectedValue, mediaArray, photographerName) {
  const available = criteria.filter((c) => c !== selectedValue);
  sortOptions.innerHTML = "";

  // Génère dynamiquement les <li> selon l'option sélectionné
  available.forEach((crit) => {
    const li = document.createElement("li");
    li.dataset.value = crit;
    li.id = `option-${crit}`; // ID pour aria-activedescendant
    li.textContent = getLabel(crit);
    li.setAttribute("tabindex", "0");
    li.setAttribute("role", "option");

    li.addEventListener("click", () => {
      sortButton.childNodes[0].nodeValue = getLabel(crit);
      sortButton.dataset.value = crit;
      buildOptions(crit, mediaArray, photographerName);
      customSelect.classList.remove("open");
      sortButton.setAttribute("aria-expanded", "false");

      // Option active
      sortOptions.setAttribute("aria-activedescendant", li.id);

      sortMedia(mediaArray, crit, photographerName);

      log(`[Tri] Option sélectionné : "${getLabel(crit)}"`);
      sortButton.focus();
    });

    // === Clavier (Accessibilité) ===
    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        li.click();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = li.nextElementSibling || sortOptions.firstElementChild;
        next.focus();
        sortOptions.setAttribute("aria-activedescendant", next.id);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = li.previousElementSibling || sortOptions.lastElementChild;
        prev.focus();
        sortOptions.setAttribute("aria-activedescendant", prev.id);
      }
      if (e.key === "Escape") {
        customSelect.classList.remove("open");
        sortButton.setAttribute("aria-expanded", "false");
        sortButton.focus();
      }
    });

    sortOptions.appendChild(li);
  });

  // Met à jour l’option active par défaut pour le lecteur d'écran
  const firstLi = sortOptions.querySelector("li");
  if (firstLi) {
    sortOptions.setAttribute("aria-activedescendant", firstLi.id);
  }
}

// ==== FERMETURE SI CLIC HORS SELECT ====
document.addEventListener("click", (e) => {
  if (!customSelect.contains(e.target)) {
    customSelect.classList.remove("open");
    sortButton.setAttribute("aria-expanded", "false");
  }
});

// ==== INITIALISATION DU SELECT CUSTOM ====
export function initCustomSelect(mediaArray, photographerName) {
  sortButton.childNodes[0].nodeValue = getLabel("popularity");
  sortButton.dataset.value = "popularity";
  buildOptions("popularity", mediaArray, photographerName);

  // Tri initial avec le nom correct
  sortMedia(mediaArray, "popularity", photographerName);
}

// ==== TRI DES MÉDIAS ====
export function sortMedia(mediaArray, criterion, photographerName) {
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

  displayPhotographerMedia(mediaArray, photographerName);

  // log(`[Tri] Tri effectué : ${criterion} (${mediaArray.length} médias)`);

  initGallery(mediaArray);
}
