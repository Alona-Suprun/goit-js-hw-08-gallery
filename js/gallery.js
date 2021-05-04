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
