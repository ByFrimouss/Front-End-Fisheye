// Importe les fonctions pour gérer le total de likes
import { incrementTotalLikes, decrementTotalLikes } from "./like.js";
import { log } from "../utils/logger.js";

export function mediaFactory(media) {
  const { image, video, title } = media;
  const mediaPath = `../assets/media/${media.photographerId}/${image || video}`;

  function getMediaDOM() {
    const mediaArticle = document.createElement("article");
    mediaArticle.classList.add("media-card");

    const mediaLink = document.createElement("a");
    mediaLink.setAttribute("href", "#");
    mediaLink.setAttribute("aria-label", `${title}`);

    let mediaElement;
    if (image) {
      mediaElement = document.createElement("img");
      mediaElement.setAttribute("src", mediaPath);
      mediaElement.setAttribute("alt", title);
    } else if (video) {
      mediaElement = document.createElement("video");
      mediaElement.setAttribute("src", mediaPath);
      mediaElement.setAttribute("aria-label", `${title}, vidéo`);
    }

    mediaLink.appendChild(mediaElement);
    mediaArticle.appendChild(mediaLink);

    const info = document.createElement("div");
    info.classList.add("media-info");

    const mediaTitle = document.createElement("h3");
    mediaTitle.textContent = title;

    const likesContainer = document.createElement("div");
    likesContainer.classList.add("likes-container");

    const likesCount = document.createElement("span");
    likesCount.classList.add("media-likes");
    likesCount.textContent = media.likes;

    const likeBtn = document.createElement("button");
    likeBtn.classList.add("like-btn");
    likeBtn.setAttribute("aria-label", "Aimer");
    likeBtn.innerHTML = "❤";

    likesContainer.appendChild(likesCount);
    likesContainer.appendChild(likeBtn);

    info.appendChild(mediaTitle);
    info.appendChild(likesContainer);
    mediaArticle.appendChild(info);

    // Gestion du like : un seul clic par média
    let liked = false;

    likeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();

      if (!liked) {
        media.likes += 1;
        likesCount.textContent = media.likes;
        incrementTotalLikes();
        liked = true;
      } else {
        media.likes -= 1;
        likesCount.textContent = media.likes;
        decrementTotalLikes();
        liked = false;
      }
      log(`[Like] "${media.title}" → ${media.likes} likes au total`);
    });

    return mediaArticle;
  }

  return { getMediaDOM };
}

/* Fabrique un élément média pour la lightbox (image ou vidéo) */
export function lightboxMediaFactory(media) {
  const { image, video, title, photographerId } = media;
  const mediaPath = `../assets/media/${photographerId}/${image || video}`;

  let mediaElement;

  if (image) {
    mediaElement = document.createElement("img");
    mediaElement.src = mediaPath;
    mediaElement.alt = title;
  } else if (video) {
    mediaElement = document.createElement("video");
    mediaElement.src = mediaPath;
    mediaElement.controls = true;
    mediaElement.setAttribute("aria-label", `${title}, vidéo`);
  }

  return mediaElement;
}
