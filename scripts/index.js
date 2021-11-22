const editBtn = document.querySelector('.profile__edit-button');
const openAdd = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileInterest = document.querySelector('.profile__interest');
const elementList = document.querySelector('.elements-grid');

const popupElement = document.querySelector('.popup_type_edit');
const profileForm = document.querySelector('.popup__form');
const closeBtnProfile = document.querySelector('.popup_type_edit .popup__close-button');
let nameInput = document.querySelector('.popup__input_type_name');
let interestInput = document.querySelector('.popup__input_type_interest');

const popupAdd = document.querySelector('.popup_type_add-card');
const closeAdd = document.querySelector('.popup_type_add-card .popup__close-button');
const addForm = document.querySelector('.popup__form');
let placeInput = document.querySelector('.popup__input_add-card_name');
let linkInput = document.querySelector('.popup__input_add-card_link');

const imagePopup = document.querySelector('.popup_type_image');
let elementCaption = document.querySelector('.element__caption');
let elementImage = document.querySelector('.element__image');
const imageClose = document.querySelector('.popup__close-button');

const template = document.querySelector('#template');
const taskTemplate = document.querySelector('.element__item');


const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// лайк
function toggleLike(evt) {
    evt.target.classList.toggle('element__like_active');
}

// удаление изображения
function deleteCard(evt) {
    evt.target.closest('.task').remove();
}

//открытие попапа
function openPopup(popup) {
    popupElement.classList.add('popup_opened');
}

//закрытие попапа
function closePopup(popup) {
    popupElement.classList.remove('popup_opened');
}

// открытие профиля 
function editProfile() {
    openPopup(profilePopup);
    nameInput.value = profileName.textContent;
    interestInput.value = profileInterest.textContent;
}

//сохранение данных профиля
function saveProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileInterest.textContent = interestInput.value;
    /*valueName.textContent = inputName.value;
    valueAbout.textContent = inputAbout.value;*/
    closePopup(profilePopup);
}

//закрытие профиля
function closeProfile() {
    closePopup(profilePopup);
}

//открытие добавления фото
function openCard() {
    openPopup(popupAdd);
}

//очистка строк
function clearCard() {
    linkInput.value = '';
    placeInput.value = '';
}

//закрытие добавления фото
function closeCard() {
    clearCard();
    closePopup(popupAdd);
}

//сохранение добавления фото
function saveCard(evt) {
    evt.preventDefault();
    addCard(linkInput.value, placeInput.value);
    clearCard();
    closePopup(popupAdd);
}

//открытие изображения
function openImage(evt) {
    openPopup(imagePopup);
    elementImage.src = evt.target.src;
    elementImage.alt = evt.target.alt;
    elementCaption.textContent = evt.target.closest('.element').querySelector('.element__caption').textContent;
}

//закрытие изображения
function closeImage() {
    closePopup(imagePopup);
}

function addCard(imageLink, nameValue) {

    const cardElement = taskTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    cardImage.src = imageLink;
    cardImage.alt = nameValue;

    cardElement.querySelector('.element__caption').textContent = nameValue;
    cardElement.querySelector('.element__like').addEventListener('click', toggleLike);
    cardElement.querySelector('.element__delete').addEventListener('click', deleteCard);
    cardElement.querySelector('.element__open').addEventListener('click', openImage);
    elementList.prepend(cardElement);
}

initialCards.forEach(item => {
    addCard(item);
});

editBtn.addEventListener('click', editProfile);
closeBtnProfile.addEventListener('click', closeProfile);
profileForm.addEventListener('submit', saveProfile);

openAdd.addEventListener('click', openCard);
closeAdd.addEventListener('click', closeCard);
addForm.addEventListener('submit', saveCard);

imageClose.addEventListener('click', closeImage);