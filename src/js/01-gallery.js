import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');

const elements = galleryItems.map(({ preview, original, description }) => {
  const galleryItemEl = document.createElement('div');
  galleryItemEl.classList.add('gallery__item');

  const galleryLinkEl = document.createElement('a');
  galleryLinkEl.classList.add('gallery__link');
  galleryLinkEl.href = original;

  const galleryImageEl = document.createElement('img');
  galleryImageEl.classList.add('gallery__image');
  galleryImageEl.src = preview;
  galleryImageEl.dataset.source = original;
  galleryImageEl.alt = description;

  galleryLinkEl.appendChild(galleryImageEl);
  galleryItemEl.appendChild(galleryLinkEl);

  return galleryItemEl;
});

galleryContainer.append(...elements);

galleryContainer.addEventListener('click', onImageClick);

function onImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const instance = basicLightbox.create(
    `
<img src="${event.target.dataset.source}">
`,
    {
      onShow: () => {
        window.addEventListener('keydown', onEscKeyPress);
      },

      onClose: () => {
        window.removeEventListener('keydown', onEscKeyPress);
      },
    }
  );

  instance.show();

  function onEscKeyPress(event) {
    const isEscKey = event.code === 'Escape';

    if (isEscKey) {
      instance.close();
    }
  }
}

console.log(galleryItems);
