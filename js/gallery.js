import galleryItems from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery.js-gallery");
const bigImageLink = document.querySelector(".lightbox__image");
const backdrop = document.querySelector(".lightbox");
const closeModal = document.querySelector(
  'button[data-action="close-lightbox"]'
);

let galleryImageIndex;

const makeGalleryMarkup = (galleryItems) => {
  return galleryItems
    .map(({ preview, original, description }, index) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      loading="lazy"
      class="gallery__image lazyload"
      data-src="${preview}"
      data-source="${original}"
      alt="${description}"
      data-index="${index}"
    />
  </a>
</li>`;
    })
    .join("");
};

const imagesMarkup = makeGalleryMarkup(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", imagesMarkup);

const onGalleryContainerClick = (e) => {
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  e.preventDefault();
  galleryImageIndex = Number(e.target.dataset.index);
  bigImageLink.src = e.target.dataset.source;
  onOpenModal();
};

galleryContainer.addEventListener("click", onGalleryContainerClick);

const onOpenModal = () => {
  backdrop.classList.add("is-open");
  backdrop.addEventListener("click", onBackdropClick);
  window.addEventListener("keydown", onEscPress);
  window.addEventListener("keydown", onRightLeftPress);
};

const onBackdropClick = (e) => {
  if (e.target !== bigImageLink) {
    onCloseModal();
  }
};

const onEscPress = (e) => {
  if (e.code === "Escape") {
    onCloseModal();
  }
};

const onRightLeftPress = (e) => {
  if (e.code === "ArrowRight") {
    galleryImageIndex += 1;

    if (galleryImageIndex === galleryItems.length) {
      galleryImageIndex = 0;
    }
    bigImageLink.src = galleryItems[galleryImageIndex].original;
  }
  if (e.code === "ArrowLeft") {
    galleryImageIndex -= 1;
    if (galleryImageIndex === -1) {
      galleryImageIndex = galleryItems.length - 1;
    }
    bigImageLink.src = galleryItems[galleryImageIndex].original;
  }
};

const onCloseModal = () => {
  backdrop.classList.remove("is-open");
  backdrop.removeEventListener("click", onBackdropClick);
  window.removeEventListener("keydown", onEscPress);
  window.removeEventListener("keydown", onRightLeftPress);
  bigImageLink.src = "";
};
closeModal.addEventListener("click", onCloseModal);

//Lazy loading

if ("loading" in HTMLImageElement.prototype) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  lazyImages.forEach((img) => {
    img.src = img.dataset.src;
  });
} else {
  addLazyScript();
}

const addLazyScript = () => {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js";
  script.integrity =
    "sha512-TmDwFLhg3UA4ZG0Eb4MIyT1O1Mb+Oww5kFG0uHqXsdbyZz9DcvYQhKpGgNkamAI6h2lGGZq2X8ftOJvF/XjTUg==";
  script.crossOrigin = "anonymous";

  document.body.appendChild(script);
};
