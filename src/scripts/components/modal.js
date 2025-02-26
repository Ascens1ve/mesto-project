import { hideInputError, toggleButtonState } from "./validate.js";

export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
    submittingButtonClass: 'popup__button_sumbit'
};

export const popupOpenCallback = (popup) => {
    const buttonElement = popup.querySelector(validationSettings.submitButtonSelector);
    if (buttonElement.classList.contains(validationSettings.submittingButtonClass)) return;
    const inputList = Array.from(popup.querySelectorAll(validationSettings.inputSelector));
    toggleButtonState(inputList, buttonElement, validationSettings);
}

export const popupCloseCallback = (popup) => {
    const inputList = Array.from(popup.querySelectorAll(validationSettings.inputSelector));
    inputList.forEach(inputElement => {
        if (!inputElement.validity.valid) {
            hideInputError(popup, inputElement, validationSettings);
        }
    });
}

function closeByEsc(event) {
    if (event.key === 'Escape') {
        let popup = document.querySelector('.popup_is-opened');
        if (!popup.classList.contains('popup_type_image')) {
            if (popup.querySelector('.popup__button').classList.contains(validationSettings.submittingButtonClass)) return;
            closeModal(popup, popupCloseCallback);
        } else {
            closeModal(popup);
        }
    }
}

function closeByClick(event) {
    if (event.target.classList.contains('popup')) {
        if (!event.target.classList.contains('popup_type_image')) {
            if (event.target.querySelector('.popup__button').classList.contains(validationSettings.submittingButtonClass)) return;
            closeModal(event.target, popupCloseCallback);
        } else {
            closeModal(event.target);
        }
    }
}

export function openModal(popup, onOpenCallback) {
    popup.classList.add('popup_is-opened');
  
    if (typeof onOpenCallback === 'function') {
      onOpenCallback(popup);
    }
  
    document.addEventListener('keydown', closeByEsc);
    document.addEventListener('click', closeByClick);
  }

export function closeModal(popup, onCloseCallback) {
    popup.classList.remove('popup_is-opened');
    if (typeof onCloseCallback === 'function') {
        onCloseCallback(popup);
    }
    document.removeEventListener('keydown', closeByEsc);
    document.removeEventListener('click', closeByClick);
}
