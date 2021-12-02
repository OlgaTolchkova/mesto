//объекты настроек всеx нужныx функциям классов и селекторов элементов
const validationObject = {
    editPopupForm: '.popup_type_edit .popup__form',
    addPopupForm: '.popup_type_add-card .popup__form',
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error',
};

//добавление слушателей для каждого поля ввода
const setEventListeners = (formElement) => {
    const formElement = document.querySelector('.popup__form');
    formElement.addEventListener('submit', evt => evt.preventDefault());
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__save-button');

    toggleButtonState(formElement, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(formElement, buttonElement);
        })
    })
}

// управление соощениями об ошибках
const isValid = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement);
    } else {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    }
}

// функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

// функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

//Фунукия принимает массив полей ввода и эл-т кнопки,состояние которой нужно поменять
const toggleButtonState = (formElement, buttonElement) => {
    const isFormValid = formElement.checkValidity();
    buttonElement.classList.toggle('popup__button_inactive', !isFormValid);
    buttonElement.disabled = !isFormValid;
};

//запуск валидации
const enableValidation = () => {
    const forms = document.querySelectorAll('.popup__form');

    forms.forEach(form => {
        setEventListeners(form)
    })
}

enableValidation();