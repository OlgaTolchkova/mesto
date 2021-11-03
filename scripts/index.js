const popupElement=document.querySelector('.popup');
const closePopup=document.querySelector('.popup__close-button');
const openPopup=document.querySelector('.profile__edit-button');
const addButton=document.querySelector('.popup__add-button');
const saveButton=document.querySelector('.popup__save-button');
const profileName=document.querySelector('.profile__title');
const profileInterest=document.querySelector('.profile__interest');
const popupProfileInputs = popupProfile.querySelectorAll('.popup__input');

function noViewPopup() {
    popupElement.classList.remove('popup_opened');
}

function viewPopup() {
    popupElement.classList.add('popup_opened');
}

// Находим форму в DOM
let formElement = document.querySelector('.popup__input');
let nameInput = document.querySelector('.popup__input_name.css');
let interestInput = document.querySelector('.popup__input_interes.css');

// Обработчик отправки форм
function formSabmitHandler (evt) {
    evt.preventDefault();
    profileInterest.textContent = interestInput.value;
    profileName.textContent = nametInput.value;
}

// Прикрепляем обработчик к отправке форм
saveButton.addEventListener('submit', formSabmitHandler);
openPopup.addEventListener('click', viewPopup );
closePopup.addEventListener('click', noViewPopup);

  
  // функция заполнения полей формы данными из профиля
  function handleTextInput() {
    const userData = userInfo.getUserInfo();
    popupProfileInputs.forEach(input => {
      input.value = userData[input.name];
    });
  }
