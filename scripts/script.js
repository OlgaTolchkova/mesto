const popupElement = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close-button');
const openPopup = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const saveButton = document.querySelector('.popup__save-button');
const savePopup = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileInterest = document.querySelector('.profile__interest');
let nameInput = document.querySelector('.popup__input_type_name');
let interestInput = document.querySelector('.popup__input_type_interest');


// открытие попапа
function openClick() {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    interestInput.value = profileInterest.textContent;
}

// закрытие попапа
function closeClick() {
    popupElement.classList.remove('popup_opened');
}

// сохранение
function saveClick(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileInterest.textContent = interestInput.value;
    closeClick();
}

openPopup.addEventListener('click', openClick);
closePopup.addEventListener('click', closeClick);
savePopup.addEventListener('submit', saveClick);