let currentIndex = 0;
let currentMediaArray = [];

export function openLightbox(media, index, mediaArray) {
  currentIndex = index;
  currentMediaArray = mediaArray;

  const lightbox = document.getElementById("lightbox");
  const mediaContainer = lightbox.querySelector(".lightbox-media");

  mediaContainer.innerHTML = ""; // Nettoie

  const mediaPath = `../assets/media/${media.photographerId}/${
    media.image || media.video
  }`;
  let mediaElement;

  if (media.image) {
    mediaElement = document.createElement("img");
    mediaElement.src = mediaPath;
    mediaElement.alt = media.title;
  } else if (media.video) {
    mediaElement = document.createElement("video");
    mediaElement.src = mediaPath;
    mediaElement.controls = true;
    mediaElement.setAttribute("aria-label", `${media.title}, vidéo`);
  }

  mediaContainer.appendChild(mediaElement);
  lightbox.style.display = "flex";
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

export function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto";
}

export function showNextMedia() {
  currentIndex = (currentIndex + 1) % currentMediaArray.length;
  openLightbox(
    currentMediaArray[currentIndex],
    currentIndex,
    currentMediaArray
  );
}

export function showPreviousMedia() {
  currentIndex =
    (currentIndex - 1 + currentMediaArray.length) % currentMediaArray.length;
  openLightbox(
    currentMediaArray[currentIndex],
    currentIndex,
    currentMediaArray
  );
}

export function initLightboxEvents() {
  const closeBtn = document.querySelector(".lightbox-close");
  const nextBtn = document.querySelector(".lightbox-next");
  const prevBtn = document.querySelector(".lightbox-prev");

  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNextMedia);
  prevBtn.addEventListener("click", showPreviousMedia);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowRight") showNextMedia();
    else if (e.key === "ArrowLeft") showPreviousMedia();
  });
}
