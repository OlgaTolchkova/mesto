const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupCloseEditProfile = document.querySelector('.popup__close_edit-profile');
const popupCloseAddPlace = document.querySelector('.popup__close_add-place');
const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add')
const editForm = document.querySelector('.popup__form_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__desc');
const popupEditPerson = document.querySelector('.popup__form-field_name_person');
const popupEditDesc = document.querySelector('.popup__form-field_name_desc');

const popupAddNamePlace = document.querySelector('.popup__form-field_place_name');
const popupAddLinkPlace = document.querySelector('.popup__form-field_place_link');
const addForm = document.querySelector('.popup__form_add-place');

const popupCloseImage = document.querySelector('.popup__close_image');
const popupImage = document.querySelector('.popup_image');

const popupList = document.querySelectorAll('.popup');

function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_open');
        closePopup(popupOpened);
        console.log('yes');
    }
}

function fix() {

}

function openPopup(popup) {
    popup.classList.add('popup_open');
    window.addEventListener('keydown', closePopupByEsc);
}

function fillInEditProfilePopupFields() {
    popupEditPerson.value = profileName.textContent;
    popupEditDesc.value = profileDesc.textContent;
}

function fillInAddCardPopupFields() {
    popupAddNamePlace.value = '';
    popupAddLinkPlace.value = '';
}

function closePopup(popup) {
    popup.classList.remove('popup_open');
    window.removeEventListener('keydown', closePopupByEsc);
}

function submitFormEditPopup(event) {
    event.preventDefault();

    profileName.textContent = popupEditPerson.value;
    profileDesc.textContent = popupEditDesc.value;

    closePopup(popupEdit);
}

function submitFormAddPopup(event) {
    event.preventDefault();
    const name = popupAddNamePlace.value;
    const link = popupAddLinkPlace.value;
    const item = {
        name,
        link
    }
    prependCard(item);
    event.target.reset();

    closePopup(popupAdd);
}

editButton.addEventListener('click', function() {
    openPopup(popupEdit);
    fillInEditProfilePopupFields();

    /* Функция для очистки полей??? подумаю потом  const editFields = [...editForm.querySelectorAll('.popup__form-field')];
    editFields.forEach((editField) => { handleFieldValidation(editField, editForm, config); }) */

    setSubmitButtonState(editForm, config);
})

addButton.addEventListener('click', () => {
    openPopup(popupAdd);
    fillInAddCardPopupFields();

    setSubmitButtonState(addForm, config);
});

popupCloseEditProfile.addEventListener('click', () => {
    closePopup(popupEdit);
});

popupCloseAddPlace.addEventListener('click', () => closePopup(popupAdd));

popupCloseImage.addEventListener('click', () => closePopup(popupImage));

editForm.addEventListener('submit', submitFormEditPopup);

addForm.addEventListener('submit', submitFormAddPopup);

popupList.forEach((element) => element.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
        evt.target.classList.remove('popup_open');
    }
}));

const cardsElement = document.querySelector('.cards');
const templateItem = document.querySelector('.template').content;
const popupImg = document.querySelector('.popup__img');
const popupSign = document.querySelector('.popup__sign');

initialCards.forEach(appendCard)

function createCard(item) {
    const element = templateItem.querySelector('.card').cloneNode(true);
    const cardImage = element.querySelector('.card__image');

    element.querySelector('.card__title').textContent = item.name;
    cardImage.style.backgroundImage = `url(${item.link})`;
    element.querySelector('.card__delete').addEventListener('mouseup', (event) => { event.target.closest(".card").remove() });
    element.querySelector('.card__like').addEventListener('click', (event) => { event.target.classList.toggle('card__like_active') });
    cardImage.addEventListener('click', () => {
        openPopup(popupImage);
        popupImg.src = item.link;
        popupImg.alt = item.name;
        popupSign.textContent = item.name;
    })
    return element;
};

function appendCard(item) {
    const element = createCard(item);
    cardsElement.append(element);
}

function prependCard(item) {
    const element = createCard(item);
    cardsElement.prepend(element);
}