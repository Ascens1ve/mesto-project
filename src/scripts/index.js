import { enableValidation, toggleButtonState } from './components/validate.js';
import { createCard, handlerCardDeleteLike } from './components/card.js';
import { openModal, closeModal, validationSettings, popupOpenCallback, popupCloseCallback } from './components/modal.js';
import { getProfileInfo, updateProfileInfo, getInitialCards, postCard, updateAvatar } from './components/api.js';
import * as css from '../pages/index.css';

const popups = {
    profilePopup: document.querySelector('.popup_type_edit'),
    cardPopup: document.querySelector('.popup_type_new-card'),
    imagePopup: document.querySelector('.popup_type_image'),
    avatarPopup: document.querySelector('.popup_type_new-avatar')
};

// Закрытие по кнопке
Object.values(popups).forEach((popup) => {
    popup.querySelector('.popup__close').addEventListener('click', () => {
        if (!popup.classList.contains('popup_type_image')) {
            closeModal(popup, popupCloseCallback);
        } else {
            closeModal(popup);
        }
    })
})

const profileInfo = {
    title: document.querySelector('.profile__title'),
    description: document.querySelector('.profile__description'),
    avatar: document.querySelector('.profile__image'),
    id: ''
};

profileInfo.avatar.addEventListener('click', () => {
    if (!popups.avatarPopup.querySelector('.popup__button').classList.contains(validationSettings.submittingButtonClass)) {
        popups.avatarPopup.querySelector('.popup__input').value = '';
    }
    openModal(popups.avatarPopup, popupOpenCallback);
});

const getPopupInputElements = (popup) => {
    return Array.from(popup.querySelectorAll('.popup__input'));
}

const toggleDisabledState = (inputList, buttonElement, settings) => {
    inputList.forEach((inputElement) => {
        inputElement.disabled = !inputElement.disabled;
    });
    buttonElement.disabled = !buttonElement.disabled;
    buttonElement.classList.toggle(settings.inactiveButtonClass);
    buttonElement.classList.toggle(settings.submittingButtonClass);
};

popups.avatarPopup.querySelector('.popup__form').addEventListener('submit', (event) => {
    event.preventDefault();
    const buttonElement = popups.avatarPopup.querySelector('.popup__button');
    const inputList = getPopupInputElements(popups.avatarPopup);
    toggleDisabledState(inputList, buttonElement, validationSettings);
    buttonElement.textContent = 'Сохранение...';
    updateAvatar(event.currentTarget.querySelector('.popup__input').value)
        .then(data => {
            profileInfo.avatar.style.backgroundImage = `url('${data.avatar}')`;
            closeModal(popups.avatarPopup, popupCloseCallback);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            buttonElement.textContent = 'Сохранить';
            toggleDisabledState(inputList, buttonElement, validationSettings);
        });
})

getProfileInfo()
    .then(data => {
        profileInfo.title.textContent = data.name;
        profileInfo.description.textContent = data.about;
        profileInfo.avatar.style.backgroundImage = `url('${data.avatar}')`; 
        profileInfo.id = data._id;
    })
    .catch(err => {
        console.log(err);
    })

// Кнопки открытия и закрытия поп-апа
const profileEditOpenButton = document.querySelector('.profile__edit-button');
const cardAddOpenButton = document.querySelector('.profile__add-button');

// Поле ввода в поп-апе редактирования профиля
const profileFormElement = popups.profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

profileEditOpenButton.addEventListener('click', () => {
    if (!popups.profilePopup.querySelector('.popup__button').classList.contains(validationSettings.submittingButtonClass)) {
        nameInput.value = profileInfo.title.textContent;
        jobInput.value = profileInfo.description.textContent;
    }
    openModal(popups.profilePopup, popupOpenCallback);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const buttonElement = popups.profilePopup.querySelector('.popup__button');
    const inputList = getPopupInputElements(popups.profilePopup);
    toggleDisabledState(inputList, buttonElement, validationSettings);
    buttonElement.textContent = 'Сохранение...';
    updateProfileInfo(nameInput.value, jobInput.value)
        .then(res => {
            profileInfo.title.textContent = res.name;
            profileInfo.description.textContent = res.about;
            closeModal(popups.profilePopup, popupCloseCallback);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            buttonElement.textContent = 'Сохранить';
            toggleDisabledState(inputList, buttonElement, validationSettings);
        });
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit); 

const cardFormElement = popups.cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardFormElement.querySelector('.popup__input_type_url');
const cardTemplateInner = document.querySelector('#card-template').content.querySelector('.places__item');
const cards = document.querySelector('.places__list');

cardAddOpenButton.addEventListener('click', () => {
    if (!popups.cardPopup.querySelector('.popup__button').classList.contains(validationSettings.submittingButtonClass)) {
        cardNameInput.value = '';
        cardUrlInput.value = '';
    }
    openModal(popups.cardPopup, popupOpenCallback);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const buttonElement = popups.cardPopup.querySelector('.popup__button');
    const inputList = getPopupInputElements(popups.cardPopup);
    toggleDisabledState(inputList, buttonElement, validationSettings);
    buttonElement.textContent = 'Создание...';
    postCard(cardNameInput.value, cardUrlInput.value)
        .then(res => {
            cards.prepend(createCard(cardTemplateInner, res.name, res.link, res._id));
            closeModal(popups.cardPopup, popupCloseCallback);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            buttonElement.textContent = 'Создать';
            toggleDisabledState(inputList, buttonElement, validationSettings);
        });
}

cardFormElement.addEventListener('submit', handleCardFormSubmit); 

// Работа с карточками (лайк/удалить) и с картинками
const placesList = document.querySelector('.places__list');
const image = popups.imagePopup.querySelector('.popup__image');
const imageName = popups.imagePopup.querySelector('.popup__caption');

const handlerOpenImagePopup = (event) => {
    if (event.target.classList.contains('card__image')) {
        imageName.textContent = event.target.parentElement.querySelector('.card__description .card__title').textContent;
        image.src = event.target.src;
        openModal(popups.imagePopup) 
    }
}

placesList.addEventListener('click', handlerCardDeleteLike);
placesList.addEventListener('click', handlerOpenImagePopup);

getInitialCards()
    .then(data => {
        data.forEach(card => {
            const cardElement = card.owner._id === profileInfo.id ? 
                                    createCard(cardTemplateInner, card.name, card.link, card._id, false) :
                                    createCard(cardTemplateInner, card.name, card.link, card._id, true);
            if (card.likes.some((person) => {
                return person._id === profileInfo.id;
            })) cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active');
            cardElement.querySelector('.card__likes-count').textContent = card.likes.length;
            cards.append(cardElement);
        })
    })
    .catch(err => {
        console.log(err);
    })

enableValidation(validationSettings);