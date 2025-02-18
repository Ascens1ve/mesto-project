import { enableValidation, toggleButtonState, checkInputValidity } from './components/validate.js';
import { initialCards } from './cards.js';
import { createCard, handlerCardDeleteLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import * as css from '../pages/index.css';

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');


const popupOpenCallback = (popup) => {
    const inputList = Array.from(popup.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = popup.querySelector(validationSettings.submitButtonSelector);
    inputList.forEach((inputElement) => {
        checkInputValidity(popup, inputElement, validationSettings);
    });
    toggleButtonState(inputList, buttonElement, validationSettings);
}

// Кнопки открытия и закрытия поп-апа
const profileEditOpenButton = document.querySelector('.profile__edit-button');
const profileEditCloseButton = profilePopup.querySelector('.popup__close');
const cardAddOpenButton = document.querySelector('.profile__add-button');
const cardAddCloseButton = cardPopup.querySelector('.popup__close');

// Поле ввода в поп-апе редактирования профиля
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

profileEditOpenButton.addEventListener('click', () => {
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
    openModal(profilePopup, popupOpenCallback);
});

profileEditCloseButton.addEventListener('click', () => {
    closeModal(profilePopup);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;

    closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit); 

const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardFormElement.querySelector('.popup__input_type_url');
const cardTemplateInner = document.querySelector('#card-template').content.querySelector('.places__item');
const cards = document.querySelector('.places__list');


cardAddOpenButton.addEventListener('click', () => {
    cardNameInput.value = '';
    cardUrlInput.value = '';
    openModal(cardPopup, popupOpenCallback);
});

cardAddCloseButton.addEventListener('click', () => {
    closeModal(cardPopup);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    cards.prepend(createCard(image, imageName, cardTemplateInner, cardNameInput.value, cardUrlInput.value));
    closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit); 

const placesList = document.querySelector('.places__list');
const image = imagePopup.querySelector('.popup__image');
const imageName = imagePopup.querySelector('.popup__caption');

const handlerCloseImagePopup = event => {
    if (event.target.classList.contains('card__image')) {
        imageName.textContent = event.target.parentElement.querySelector('.card__description .card__title').textContent;
        image.src = event.target.src;
        openModal(imagePopup) 
    }
}

placesList.addEventListener('click', handlerCardDeleteLike);
placesList.addEventListener('click', handlerCloseImagePopup);

const imageCloseButton = imagePopup.querySelector('.popup__close');
imageCloseButton.addEventListener('click', () => {
    closeModal(imagePopup);
});

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = createCard(image, imageName, cardTemplateInner, initialCards[i].name, initialCards[i].link);
  cards.append(cardElement);
}

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

enableValidation(validationSettings);