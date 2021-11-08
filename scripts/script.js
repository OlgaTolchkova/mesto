const popupElement = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close-button');
const openPopup = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const saveButton = document.querySelector('.popup__save-button');
let profileName = document.querySelector('.profile__name');
let profileInterest = document.querySelector('.profile__interest');
let nameInput = document.querySelector('.popup__input_name');
let interestInput = document.querySelector('.popup__input_interest');


// Функция обработчик сработает, в момент отправки 
// из формы в профиль

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileInterest.textContent = interestInput.value;
    closeClick();
}


// открытие попапа
function openClick() {
    popupElement.classList.add('popup_opened');

    formSubmitHandler();
}


// закрытие попапа
function closeClick() {
    popupElement.classList.remove('popup_opened');
}

openPopup.addEventListener('click', openClick);
popupElement.addEventListener('submit', formSubmitHandler);
closePopup.addEventListener('click', closeClick);
saveButton.addEventListener('click', saveInput);