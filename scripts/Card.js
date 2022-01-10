// класс Card, который создаёт карточку с текстом и ссылкой на изображение
/*const valueImage = document.querySelector('.popup__image');
const valueTitle = document.querySelector('.popup__image-title');*/

export class Card {
    constructor({
            data,
            handleCardClick,
            handleDeleteClick,
            handleLikeClick
        },
        cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

    // берем разметку из HTML и клонируем элемент
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element__item')
            .cloneNode(true);

        return cardElement;
    }

    // готовим карточку к публикации
    generateCard() {
        // запишем разметку в приватное поле _element
        this._element = this._getTemplate();

        // добавим данные
        this._elementImage = this._element.querySelector('.element__image');
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._element.querySelector('.element__caption').textContent = this._name;
        this._delete = this._element.querySelector('.element__delete');
        this._like = this._element.querySelector('.element__like');

        this._setEventListeners();
        /*generateCard() {
    this._element = this._getTemplate();
    this._picture = this._element.querySelector('.element__pic');
    this._picture.src = this._link;
    this._picture.alt = `Фото ${this._name}`;
    this._element.querySelector('.element__title').textContent = this._name;
    this._delete = this._element.querySelector('.element__trash');
    this._like = this._element.querySelector('.element__like');*/

        return this._element;
    }

    _handleLikeClick() {
        evt.target.classList.toggle('element__like_active');
    }

    _handleDeleteClick() {
        this._element.remove();
        this._element = null;
    }

    _handleCardClick() {
            openPopup(imageOpenPopup);
            valueImage.src = this._image;
            valueImage.alt = this._name;
            valueTitle.textContent = this._name;
        }
        /* removeCard() {
             this._element.remove();
             this._element = null;
           }  */

    // метод слушателей событий
    _setEventListeners() {
        this._elementImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);

        });

        this._delete.addEventListener('click', () => {
            this._handleDeleteClick();

        });

        this._like.addEventListener('click', () => {
            this._handleLikeClick();

        });
    }
}