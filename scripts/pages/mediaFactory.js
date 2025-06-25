export function mediaFactory(media) {
  const { image, video, title } = media;
  const mediaPath = `../assets/media/${media.photographerId}/${
    media.image || media.video
  }`;

  function getMediaDOM() {
    const mediaArticle = document.createElement("article");
    mediaArticle.classList.add("media-card"); // Pour la lightbox
    mediaArticle.setAttribute("tabindex", "0"); // Accessibilité clavier

    // Crée élément media : image ou vidéo
    let mediaElement;
    if (image) {
      mediaElement = document.createElement("img");
      mediaElement.setAttribute("src", mediaPath);
      mediaElement.setAttribute("alt", title);
    } else if (video) {
      mediaElement = document.createElement("video");
      mediaElement.setAttribute("src", mediaPath);
      mediaElement.setAttribute("title", title);
      mediaElement.setAttribute("aria-label", `${title}, vidéo`);
      //mediaElement.setAttribute("controls", true);  Pour test, à retirer pour lightbox plus tard
    }

    // Titre + likes
    const mediaInfo = document.createElement("div");
    mediaInfo.classList.add("media-info");

    const mediaTitle = document.createElement("h3");
    mediaTitle.textContent = title;

    const likes = document.createElement("span");
    likes.classList.add("media-likes");
    likes.textContent = `${media.likes} ❤`;

    mediaInfo.appendChild(mediaTitle);
    mediaInfo.appendChild(likes);

    const mediaLink = document.createElement("a");
    mediaLink.setAttribute("href", "#"); // lien vers la lightbox
    mediaLink.appendChild(mediaElement);
    mediaArticle.appendChild(mediaLink);
    mediaArticle.appendChild(mediaInfo);

    return mediaArticle;
  }

  return { getMediaDOM };
}
