export function mediaFactory(media) {
  const { image, video, title } = media;
  const mediaPath = `../assets/media/${media.photographerId}/${image || video}`;

  function getMediaDOM() {
    const mediaArticle = document.createElement("article");

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

    const likes = document.createElement("span");
    likes.classList.add("media-likes");
    likes.textContent = `${media.likes} ❤`;

    info.appendChild(mediaTitle);
    info.appendChild(likes);
    mediaArticle.appendChild(info);

    return mediaArticle;
  }

  return { getMediaDOM };
}
