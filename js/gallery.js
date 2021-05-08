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
      class="gallery__image"
      src="${preview}"
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
  galleryImageIndex = e.target.dataset.index;
  console.log(galleryImageIndex);
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
    galleryImageIndex++;

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
