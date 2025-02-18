function createCard(image, imageName, cardTemplateInner, name, link) {
    const cardElement = cardTemplateInner.cloneNode(true);
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').src = link;

    //cardElement.querySelector('.card__like-button').addEventListener('click', (event) => {
    //        event.target.classList.toggle('card__like-button_is-active');
    //});

    //cardElement.querySelector('.card__delete-button').addEventListener('click', (event) => {
    //    event.target.closest('.places__item').remove();
    //});

    //cardElement.querySelector('.card__image').addEventListener('click', () => {
    //    image.src = link;
    //    imageName.textContent = name;
    //    openModal(imagePopup) 
    //});

    return cardElement;
}

const handlerCardDeleteLike = event => {
    if (event.target.classList.contains('card__like-button')) {
        event.target.classList.toggle('card__like-button_is-active');
    }
    else if (event.target.classList.contains('card__delete-button')) {
        event.target.closest('.places__item').remove();
    }
}

export { createCard, handlerCardDeleteLike };

