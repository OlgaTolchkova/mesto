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

// открытие попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

//закрытие попапов
function closePopup(popup) {
    popup.classList.remove('popup_opened');
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
    });

    return taskTemplate;
}

const result = initialCards.map((item) => {
    return createDomNode(item);
});

const handleCardFormSubmit = (evt) => {
    evt.preventDefault();
    const inputValueLink = linkInput.value;
    const inputValuePlace = placeInput.value;
    const taskName = createDomNode({ name: inputValuePlace, link: inputValueLink });

    elementList.prepend(taskName);
    closeAddPopup();
    clearCardPopup();
}

elementList.append(...result);

addPopupForm.addEventListener('submit', handleCardFormSubmit);
openEditPopupButton.addEventListener('click', openEditPopup);
closePopupButton.addEventListener('click', closeEditPopup);
editPopupForm.addEventListener('submit', handleEditFormSubmit);
openAddPopupButton.addEventListener('click', openAddPopup);
closeAddPopupButton.addEventListener('click', closeAddPopup);
closeImagePopupButton.addEventListener('click', closeImagePopup);