const popupElement=document.querySelector('.popup');
const closeButton=popupElement.querySelector('.popup__close-button');

function openPopup() {
    popupElement.classList.remove('hidden');
}

function closePopup() {
    popupElement.classList.add('hidden');
}

navButton.addEventListener('click', openPopup)

closeButton.addEventListener('click', closePopup)







export default class Popup {
    constructor(popupSelector) {
      this._popupSelector = popupSelector;
      this._popupElement = document.querySelector(this._popupSelector);
      this._popupCloseButton = this._popupElement.querySelector('.popup__close');
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    open() {
      this._popupElement.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
    }
  
    close() {
      this._popupElement.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
    }
  


  
    setEventListeners() {
      this._popupCloseButton.addEventListener('click', () => this.close());
  
      this._popupElement.addEventListener("mousedown", (evt) => this._handlePopupClick(evt));
    }
  }