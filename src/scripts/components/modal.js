function closeByEsc(event) {
    if (event.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

function closeByClick(event) {
    if (event.target.classList.contains('popup')) {
        closeModal(event.target);
    }
}

function openModal(popup, onOpenCallback) {
    popup.classList.add('popup_is-opened');
  
    if (typeof onOpenCallback === 'function') {
      onOpenCallback(popup);
    }
  
    document.addEventListener('keydown', closeByEsc);
    document.addEventListener('click', closeByClick);
  }

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
    document.removeEventListener('click', closeByClick);
}

export { openModal, closeModal };