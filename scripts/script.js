import { FormValidator } from '../scripts/FormValidator.js';

import { Card } from '../scripts/Card.js';

import { initialCards } from '../scripts/initialCards.js';

const editPopupElement = document.querySelector('.popup_type_edit');
const addPopupButton = document.querySelector('.popup_type_add-card');
const closePopupButton = document.querySelector('.popup_type_edit .popup__close-button');
const openEditPopupButton = document.querySelector('.profile__edit-button');
const openAddPopupButton = document.querySelector('.profile__add-button');
const closeAddPopupButton = document.querySelector('.popup_type_add-card .popup__close-button');
const editPopupForm = document.querySelector('.popup_type_edit .popup__form');
const profileNameElement = document.querySelector('.profile__name');
const profileInterestElement = document.querySelector('.profile__interest');
const nameInput = document.querySelector('.popup__input_type_name');
const interestInput = document.querySelector('.popup__input_type_interest');
const closeImagePopupButton = document.querySelector('.popup_type_image .popup__close-button');
const addPopupForm = document.querySelector('.popup_type_add-card .popup__form');
const placeInput = document.querySelector('.popup__input_add-card_name');
const linkInput = document.querySelector('.popup__input_add-card_link');
const elementList = document.querySelector('.elements-grid');
const imageOpenPopup = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');
const form = document.querySelector('.popup__form_type_second');
const addButton = document.querySelector('.popup__save-button_add');


//объекты настроек всеx нужныx функциям классов и селекторов элементов
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
};

const cardFormValidator = new FormValidator(validationConfig, addPopupForm);
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validationConfig, editPopupForm);
profileFormValidator.enableValidation();

// закрытие попапа с помощью Esc
function closePopupEsc(evt) {
    const popupOpened = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
        closePopup(popupOpened);
    }
}

//закрытие попапов
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}


// открытие попапов
function openPopup(popup) {
    document.addEventListener('keydown', closePopupEsc);
    popup.classList.add('popup_opened');
}

// открытие профиля
function openEditPopup() {
    openPopup(editPopupElement);
    nameInput.value = profileNameElement.textContent;
    interestInput.value = profileInterestElement.textContent;
    profileFormValidator.resetValidation();
}

// закрытие профиля
function closeEditPopup() {
    closePopup(editPopupElement);
}

// сохранение профиля
function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileNameElement.textContent = nameInput.value;
    profileInterestElement.textContent = interestInput.value;
    closeEditPopup();
}

//открытие редактирования фото
function openAddPopup() {
    openPopup(addPopupButton);
    cardFormValidator.resetValidation();
}

// закрытие редактора фото
function closeAddPopup() {
    closePopup(addPopupButton);
}

/* // очищение значений
function clearCardPopup() {
    linkInput.value = '';
    placeInput.value = '';
} */

//закрытие изображения
function closeImagePopup() {
    closePopup(imageOpenPopup);
}

function setSubmitButtonState(isFormValid) {
    if (isFormValid) {
        addButton.removeAttribute('disabled');
        addButton.classList.remove('popup__button_inactive');
    } else {
        addButton.setAttribute('disabled', true);
        addButton.classList.add('popup__button_inactive');
    }
}

// функция для создания карточки
function createCard(dataCard) {
    const card = new Card(dataCard, '.template');
    const cardElement = card.generateCard();

    return cardElement;
}

function saveCard() {
    createCard(linkInput.value, placeInput.value);
    closeAddPopup();
}

// перебераем массив и добавляем карточку
initialCards.forEach(dataCard => {
    createCard(dataCard);
});

// добавление карточки на стр. с помощью попапа
const handleCardFormSubmit = (evt) => {
    cardFormValidator.resetValidation();
    evt.preventDefault();
    const inputValueLink = linkInput.value;
    const inputValuePlace = placeInput.value;
    const taskName = createCard({ name: inputValuePlace, link: inputValueLink });

    elementList.prepend(taskName);
    closeAddPopup();
    clearCardPopup();
    setSubmitButtonState(false);
}

/*elementList.append(cardElement);*/



form.addEventListener('input', function(evt) {
    const isValid = linkInput.value.length > 0 && placeInput.value.length > 0
    setSubmitButtonState(isValid);

});

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    })
})

addPopupForm.addEventListener('submit', handleCardFormSubmit);

openEditPopupButton.addEventListener('click', openEditPopup);
closePopupButton.addEventListener('click', closeEditPopup);
editPopupForm.addEventListener('submit', handleEditFormSubmit);
openAddPopupButton.addEventListener('click', openAddPopup);
closeAddPopupButton.addEventListener('click', closeAddPopup);
closeImagePopupButton.addEventListener('click', closeImagePopup);