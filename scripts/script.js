const popupElement = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close-button');
const openPopup = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const saveButton = document.querySelector('.popup__save-button');
const profileName = document.querySelector('.profile__name');
const profileInterest = document.querySelector('.profile__interest');
/*const popupProfileInputs = popupProfile.querySelectorAll('.popup__input');*/

// открытие попапа
function openClick() {
    popupElement.classList.add('popup_opened');
}
openPopup.addEventListener('click', openClick);

// закрытие попапа
function closeClick() {
    popupElement.classList.remove('popup_opened');
}
closePopup.addEventListener('click', closeClick);

// Функция обработчик сработает, в момент отправки формы, когда все поля заполнены

saveButton.addEventListener('submit', function() {
    evt.preventDefault()
    profileInterest.textContent = interestInput.value;
    profileName.textContent = nameInput.value;
})


/*// Находим форму в DOM
let saveButton = document.querySelector('.popup__input');
let nameInput = document.querySelector('.popup__input_name');
let interestInput = document.querySelector('.popup__input_interes');

// Обработчик отправки форм
function formSabmitHandler(evt) {
    evt.preventDefault();
    profileInterest.textContent = interestInput.value;
    profileName.textContent = nameInput.value;
    closePopup()
}

// Прикрепляем обработчик к отправке форм
saveButton.addEventListener('submit', formSabmitHandler);
openPopup.addEventListener('click', showClick);
closePopup.addEventListener('click', closeClick);


// функция заполнения полей формы данными из профиля
function handleTextInput() {
    const userData = userInfo.getUserInfo();
    popupProfileInputs.forEach(input => {
        input.value = userData[input.name];
    });
}*/