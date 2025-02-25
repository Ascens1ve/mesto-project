const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
        authorization: '97139ce0-7eca-4035-8302-c2f2b2ac84ab',
        'Content-Type': 'application/json'
    }
}

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};


export const getProfileInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
        .then(handleResponse);
};

export const updateProfileInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about
        })
    })
        .then(handleResponse);
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
        .then(handleResponse);
};

export const postCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link
        })
    })
        .then(handleResponse);
};

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization
        }
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        });
};

export const putLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: config.headers.authorization
        }
    })
        .then(handleResponse);
};

export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization
        }
    })
        .then(handleResponse)
};

export const updateAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
        })
    })
        .then(handleResponse);
}