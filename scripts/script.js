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
const template = document.querySelector('.template');
const elementList = document.querySelector('.elements-grid');
const meaningImg = document.querySelector('.popup__image');
const meaningName = document.querySelector('.popup__image-title');
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
}

// закрытие редактора фото
function closeAddPopup() {
    closePopup(addPopupButton);
}

// очищение значений
function clearCardPopup() {
    linkInput.value = '';
    placeInput.value = '';
}

//закрытие изображения
function closeImagePopup() {
    closePopup(imageOpenPopup);
}

const createDomNode = (item) => {
    // клонируем содержание тега template
    const taskTemplate = template.content.querySelector('.element__item').cloneNode(true);

    //наполняем содержимым
    const nameOpen = taskTemplate.querySelector('.element__caption');
    const image = taskTemplate.querySelector('.element__image');
    nameOpen.textContent = item.name;
    image.src = item.link;
    image.alt = item.name;

    //реализуем кнопку лайк
    const likeBtn = taskTemplate.querySelector('.element__like');
    likeBtn.addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
    });

    //реализуем кнопку удаления
    const deleteBtn = taskTemplate.querySelector('.element__delete');
    deleteBtn.addEventListener('click', () => {
        taskTemplate.remove();
    });

    //открытие изображения
    image.addEventListener('click', () => {
        openPopup(imageOpenPopup);
        meaningName.textContent = nameOpen.textContent;
        meaningImg.src = image.src;
        meaningImg.alt = image.alt;

    });

    return taskTemplate;
}

const result = initialCards.map((item) => {
    return createDomNode(item);
});

function setSubmitButtonState(isFormValid) {
    if (isFormValid) {
        addButton.removeAttribute('disabled');
        addButton.classList.remove('popup__button_inactive');
    } else {
        addButton.setAttribute('disabled', true);
        addButton.classList.add('popup__button_inactive');
    }
}

// добавление карточки на стр.
const handleCardFormSubmit = (evt) => {
    evt.preventDefault();
    const inputValueLink = linkInput.value;
    const inputValuePlace = placeInput.value;
    const taskName = createDomNode({ name: inputValuePlace, link: inputValueLink });

    elementList.prepend(taskName);
    closeAddPopup();
    clearCardPopup();
    setSubmitButtonState(false);
}

elementList.append(...result);

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