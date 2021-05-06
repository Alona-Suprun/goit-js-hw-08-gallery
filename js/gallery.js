import galleryItem from "./gallery-items.js";
//Создание и рендер разметки по массиву данных и предоставленному шаблону
const galleryContainer = document.querySelector(".js-gallery");

const makeGalleryMarkup = (images) => {
  return images
    .map(({ preview, original, description }) => {
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
    />
  </a>
</li>`;
    })
    .join(" ");
};

const imagesMarkup = makeGalleryMarkup(galleryItem);
galleryContainer.insertAdjacentHTML("beforeend", imagesMarkup);

//Реализация делегирования на галерее ul.js-gallery и получение url большого изображения
//Открытие модального окна по клику на элементе галереи.
//Подмена значения атрибута src элемента img.lightbox__image.
const bigImageLink = document.querySelector(".lightbox__image");
const backdrop = document.querySelector(".lightbox");
const onOpenModal = () => {
  backdrop.classList.add("is-open");
};

const onGalleryContainerClick = (e) => {
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  e.preventDefault();
  bigImageLink.setAttribute("src", e.target.dataset.source);
  onOpenModal();
};

galleryContainer.addEventListener("click", onGalleryContainerClick);

//Закрытие модального окна по клику на кнопку [data-action="close-lightbox"].
const closeModal = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const onCloseModal = () => {
  backdrop.classList.remove("is-open");
  //Очистка значения атрибута src элемента img.lightbox__image
  bigImageLink.setAttribute("src", "");
};
closeModal.addEventListener("click", onCloseModal);
//Закрытие модального окна по клику на div.lightbox__overlay

const onBackdropClick = (e) => {
  if (e.target !== bigImageLink) {
    onCloseModal();
  }
};
backdrop.addEventListener("click", onBackdropClick);
