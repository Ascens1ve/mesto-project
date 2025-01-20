const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
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
    openModal(profilePopup);
});

profileEditCloseButton.addEventListener('click', () => {
    closeModal(profilePopup);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const job = jobInput.value;
    const name = nameInput.value;
    document.querySelector('.profile__title').textContent = name;
    document.querySelector('.profile__description').textContent = job;

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
    openModal(cardPopup);
});

cardAddCloseButton.addEventListener('click', () => {
    closeModal(cardPopup);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    cards.prepend(createCard(cardNameInput.value, cardUrlInput.value));
    closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit); 

const image = imagePopup.querySelector('.popup__image');
const imageName = imagePopup.querySelector('.popup__caption');

function createCard(name, link) {
    const cardElement = cardTemplateInner.cloneNode(true);
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').src = link;

    cardElement.querySelector('.card__like-button').addEventListener('click', (event) => {
            event.target.classList.toggle('card__like-button_is-active');
    });

    cardElement.querySelector('.card__delete-button').addEventListener('click', (event) => {
        event.target.closest('.places__item').remove();
    });

    cardElement.querySelector('.card__image').addEventListener('click', () => {
        image.src = link;
        imageName.textContent = name;
        openModal(imagePopup) 
    });

    return cardElement;
}

const imageCloseButton = imagePopup.querySelector('.popup__close');
imageCloseButton.addEventListener('click', () => {
    closeModal(imagePopup);
});


  
// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = createCard(initialCards[i].name, initialCards[i].link);
  cards.append(cardElement);
}

