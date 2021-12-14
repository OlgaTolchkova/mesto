// класс Card, который создаёт карточку с текстом и ссылкой на изображение

export class Card {
    constructor(data, templateSelector) {

        this._image = data.image;
        this._name = data.name;
        this._link = data.link;
        this._taskTemplate = templateSelector;
        /* this._handleCardFormSubmit = handleCardFormSubmit; */
    }

    // берем разметку из HTML и клонируем элемент
    _getTemplate() {
        const cardElement = document
            .querySelector(this._taskTemplate)
            .content
            .querySelector('.element__item')
            .cloneNode(true);

        return cardElement;
    }

    // готовим карточку к публикации
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__image') = this._image;
        this.__image.src = this._image;
        this.__image.alt = this._name;
        this._element.querySelector('.element__delete') = this._delete;
        this._element.querySelector('.element__caption').textContent = this._name;
        this._element.querySelector('.element__like') = this._like;

        return this._element;
    }

    _setEventListeners() {
        this._image.addEventListener('click', () => {
            this._handleCardFormSubmit(this._name, this._link);
        });

        this._delete.addEventListener('click', () => {
            this._element.remove();
        });

        this._like.addEventListener('click', () => {
            evt.target.classList.toggle('element__like_active');
        });
    }
}