import { galleryItems } from "./gallery-items.js";

const container = document.querySelector(".gallery");

const markup = galleryItems
  .map(({ preview, original, description }) => {
    return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `;
  })
  .join("");

container.insertAdjacentHTML("beforeend", markup);

container.addEventListener("click", handlerClick);

function handlerClick(e) {
  e.preventDefault();

  const target = e.target;
  if (target.nodeName !== "IMG") return;
  const imageUrl = target.dataset.source;
  const instance = basicLightbox.create(
    `
      <img src="${imageUrl}" width="800" height="600">
    `,
    {
      onShow: () => {
        document.addEventListener("keydown", handleKeyDown);
      },
      onClose: () => {
        document.removeEventListener("keydown", handleKeyDown);
      },
    }
  );

  instance.show();
  document.addEventListener("keydown", handleKeyDown);
  function handleKeyDown(event) {
    if (event.key !== "Escape") return;
    instance.close();
    document.removeEventListener("keydown", handleKeyDown);
  }
}
