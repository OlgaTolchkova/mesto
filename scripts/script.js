const popupElement = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add-card');
const closePopup = document.querySelector('.popup_type_edit .popup__close-button');
const openPopup = document.querySelector('.profile__edit-button');
const openAdd = document.querySelector('.profile__add-button');
const closeAdd = document.querySelector('.popup_type_add-card .popup__close-button');
const savePopup = document.querySelector('.popup_type_edit .popup__form');
const saveAdd = document.querySelector('.popup_type_add-card .popup__form');
let profileName = document.querySelector('.profile__name');
let profileInterest = document.querySelector('.profile__interest');
let nameInput = document.querySelector('.popup__input_type_name');
let interestInput = document.querySelector('.popup__input_type_interest');
let elementCaption = document.querySelector('.element__caption');
let elementImage = document.querySelector('.element__image');

const profileForm = document.querySelector('.popup__form');

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

//открытие редактирования фото
function openAddBth() {
    popupAdd.classList.add('popup_opened');
}

// закрытие редактора фото
function closeAddBth() {
    popupAdd.classList.remove('popup_opened');
}

// сохранение редактора фото
function saveAddBth(evt) {
    evt.preventDefault();
    elementCaption.textContent = placeInput.value;
    elementImage.src = linkInput.value;
    closeAddBth();
}


openPopup.addEventListener('click', openClick);
closePopup.addEventListener('click', closeClick);
savePopup.addEventListener('submit', saveClick);
openAdd.addEventListener('click', openAddBth);
closeAdd.addEventListener('click', closeAddBth);
saveAdd.addEventListener('submit', saveAddBth);


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

const card = document.querySelector('.popup_type_add-card');
const form = document.querySelector('.popup__form');
const placeInput = form.querySelector('.popup__input_add-card_name');
const linkInput = form.querySelector('.popup__input_add-card_link');
const template = document.querySelector('.template');
const elementList = document.querySelector('.elements-grid');


/*const valueImage = imagePopup.querySelector('.popup__image');
const valueCaption = imagePopup.querySelector('.popup__image-title');
const imageCloseBtn = imagePopup.querySelector('.popup__close-button');*/


const createDomNode = (item) => {
    // клонируем содержание тега template
    const taskTemplate = template.content.querySelector('.element__item').cloneNode(true);

    //наполняем содержимым
    taskTemplate.querySelector('.element__caption').textContent = item.name;
    taskTemplate.querySelector('.element__image').src = item.link;

    //реализуем кнопку лайк
    const likeBtn = taskTemplate.querySelector('.element__like');
    likeBtn.addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
    });

    //реализуем кнопку удаления
    const deleteBtn = taskTemplate.querySelector('.element__delete')
    deleteBtn.addEventListener('click', () => {
        taskTemplate.remove();
    });

    /*const imagePopup = taskTemplate.querySelector('.popup_type_image');
    imagePopup.addEventListener('click', function(name, link) {
        openImg.classList.add('popup__container-image');
        openImg.querySelector('.popup__image').src = link;
        openImg.querySelector('.popup__image-title').textContent = name;
    });*/

    return taskTemplate;
}


const result = initialCards.map((item) => {
    return createDomNode(item);
});

const submitFormHenderler = (evt) => {
    evt.preventDefault();
    const inputValueLink = linkInput.value;
    const inputValuePlace = placeInput.value;
    const taskName = createDomNode({ name: inputValuePlace, link: inputValueLink });

    card.prepend(taskName);
    linkInput.value = '';
    placeInput.value = '';
}

form.addEventListener('submit', submitFormHenderler);

elementList.append(...result);



formSaveAdd


/*function openImagePopup(evt) {
    openPopup(imagePopup);
    valueImage.src = evt.target.src;
    valueImage.alt = evt.target.alt;
    valueTitle.textContent = evt.target.closest('.element__item').querySelector('.element__caption').textContent;
}

function closeImagePopup() {
    closePopup(imagePopup);
}

taskTemplate.querySelector('.element__open').addEventListener('click', openImagePopup);

imageCloseBtn.addEventListener('click', closeImagePopup);*/