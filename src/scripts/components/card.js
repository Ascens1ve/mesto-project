import { deleteCard, putLike, deleteLike } from './api.js';

function createCard(cardTemplateInner, name, link, id, del) {
    const cardElement = cardTemplateInner.cloneNode(true);
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').src = link;
    cardElement.id = id;
    if (del) cardElement.querySelector('.card__delete-button').style.display = "none";
    return cardElement;
}

const handlerCardDeleteLike = event => {
    if (event.target.classList.contains('card__like-button')) {
        if (event.target.classList.contains('card__like-button_is-active')) {
            deleteLike(event.target.closest('.places__item').id)
                .then(data => {
                    event.target.parentElement.querySelector('.card__likes-count').textContent = data.likes.length;
                    event.target.classList.remove('card__like-button_is-active');
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            putLike(event.target.closest('.places__item').id)
                .then(data => {
                    event.target.parentElement.querySelector('.card__likes-count').textContent = data.likes.length;
                    event.target.classList.add('card__like-button_is-active');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
    else if (event.target.classList.contains('card__delete-button')) {
        console.log(event.target.closest('.places__item').id);
        deleteCard(event.target.closest('.places__item').id)
            .then(() => {
                event.target.closest('.places__item').remove();
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export { createCard, handlerCardDeleteLike };

