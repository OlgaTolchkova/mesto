const editPopupElement = document.querySelector('.popup_type_edit');
const addPopupButton = document.querySelector('.popup_type_add-card');
const closePopupButton = document.querySelector('.popup_type_edit .popup__close-button');
const openEditPopupButton = document.querySelector('.profile__edit-button');
const openAddPopupButton = document.querySelector('.profile__add-button');
const closeAddPopupButton = document.querySelector('.popup_type_add-card .popup__close-button');
const editPopupForm = document.querySelector('.popup_type_edit .popup__form');
const addPopupForm = document.querySelector('.popup_type_add-card .popup__form');
const profileNameElement = document.querySelector('.profile__name');
const profileInterestElement = document.querySelector('.profile__interest');
const nameInput = document.querySelector('.popup__input_type_name');
const interestInput = document.querySelector('.popup__input_type_interest');
const elementCaption = document.querySelector('.element__caption');
const elementImage = document.querySelector('.element__image');

/*const profileForm = document.querySelector('.popup__form');*/

// открытие попапа
function openEditPopup() {
    editPopupElement.classList.add('popup_opened');
    nameInput.value = profileNameElement.textContent;
    interestInput.value = profileInterestElement.textContent;
}

// закрытие попапа
function closeEditPopup() {
    editPopupElement.classList.remove('popup_opened');
}

// сохранение
function editPopupSubmit(evt) {
    evt.preventDefault();
    profileNameElement.textContent = nameInput.value;
    profileInterestElement.textContent = interestInput.value;
    closeEditPopup();
}

//открытие редактирования фото
function openAddPopup() {
    addPopupButton.classList.add('popup_opened');
}

// закрытие редактора фото
function closeAddPopup() {
    addPopupButton.classList.remove('popup_opened');
}

// сохранение редактора фото
function addPopupFormSubmit(evt) {
    evt.preventDefault();
    elementCaption.textContent = placeInput.value;
    elementImage.src = linkInput.value;
    closeAddPopup();
}


openEditPopupButton.addEventListener('click', openEditPopup);
closePopupButton.addEventListener('click', closeEditPopup);
editPopupForm.addEventListener('submit', editPopupSubmit);
openAddPopupButton.addEventListener('click', openAddPopup);
closeAddPopupButton.addEventListener('click', closeAddPopup);
addPopupForm.addEventListener('submit', addPopupFormSubmit);


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

/*const card = document.querySelector('.popup_type_add-card');*/
const form = document.querySelector('.popup__form');
const placeInput = form.querySelector('.popup__input_add-card_name');
const linkInput = form.querySelector('.popup__input_add-card_link');
const template = document.querySelector('.template');
const elementList = document.querySelector('.elements-grid');

const meaningImg = document.querySelector('.popup__image');
const meaningOpenName = document.querySelector('.element__caption');
const meaningName = document.querySelector('.popup__image-title');
const imageOpenPopup = document.querySelector('.popup_type_image');


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
    const deleteBtn = taskTemplate.querySelector('.element__delete');
    deleteBtn.addEventListener('click', () => {
        taskTemplate.remove();
    });

    // реализуем открытие изображения

    const meaningOpenImg = taskTemplate.querySelector('.element__image');

    //открытие изображения
    meaningOpenImg.addEventListener('click', () => {
        imageOpenPopup.classList.add('.popup__container-image');
        meaningName.value = meaningOpenName.textContent;
        meaningImg.value = meaningOpenImg.src;
    });
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

    addPopupButton.prepend(taskName);
    linkInput.value = '';
    placeInput.value = '';
}

form.addEventListener('submit', submitFormHenderler);

elementList.append(...result);



/* добавила в CreateDomNode
const meaningImg = document.querySelector('.popup__image');
const meaningOpenName = document.querySelector('.element__caption');
const meaningName = document.querySelector('.popup__image-title');
const meaningOpenImg = taskTemplate.querySelector('.element__image');
const imageOpenPopup = document.querySelector('.popup_type_image');


//функция открытия изображения
function openImage(meaningName, meaningImg) {
    imageOpenPopup.classList.add('.popup__container-image');
    meaningName.value = meaningOpenName.textContent;
    meaningImg.value = meaningOpenImg.src;
}

//открытие изображения
meaningOpenImg.addEventListener('click', openImage);*/


/*// Добавление карточки

function postCard(container, post) {
    return container.prepend(post);
}

// Функции попапа добавления изображения
function addImageSubmit(evt) {
    evt.preventDefault();
    const postLink = linkInput.value;
    const postName = placeInput.value;
    postCard(elementList, createDomNode(postName, postLink));
    addImageForm.reset();
    closeEditPopup(popUpAddImage);
    return elementList.prepend(taskTemplate);
}

// Слушатели попапа добавления изображения
openAddPopupButton.addEventListener("click", () => openAddPopup());
addImageCloseButton.addEventListener("click", () => closeAddPopup());
addPopupButton.addEventListener("submit", addImageSubmit);
*/
/* -const popUpAddImage = content.querySelector("#add-image");
+const addPopupButton = document.querySelector('.popup_type_add-card');
/*const addImageTitleEdit = popUpAddImage.querySelector(".pop-up__item_el_title");
const placeInput = form.querySelector('.popup__input_add-card_name');
/*const addImageImageEdit = popUpAddImage.querySelector(".pop-up__item_el_image-link");
const linkInput = form.querySelector('.popup__input_add-card_link');
/*const addImageImageForm = popUpAddImage.querySelector('.pop-up__main-container')
const addImageForm = form.querySelector('.popup__container')
    /*const images = content.querySelector(".elements");
const elementList = document.querySelector('.elements-grid');
/*const addImageButton = content.querySelector(".profile__add-button");
 openAddPopupButton 
const addImageCloseButton = form.querySelector('.popup__close-button');
closeAddPopupButton */