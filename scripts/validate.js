//объекты настроек всеx нужныx функциям классов и селекторов элементов
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
};

// функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, config) => {
    const { inputErrorClass, errorClass, } = config;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

// функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

// управление соощениями об ошибках
const isValid = (formElement, inputElement, config) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, config);
    } else {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    }
}

//Фунукия принимает массив полей ввода и эл-т кнопки,состояние которой нужно поменять
const toggleButtonState = (formElement, buttonElement, inactiveButtonClass) => {
    const isFormValid = formElement.checkValidity();
    buttonElement.classList.toggle(inactiveButtonClass, !isFormValid);
    buttonElement.disabled = !isFormValid;
};

//добавление слушателей для каждого поля ввода
const setEventListeners = (formElement, config) => {

    const {
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        errorClass,
        inputErrorClass
    } = config

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(formElement, buttonElement, inactiveButtonClass);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, { inputErrorClass, errorClass });
            toggleButtonState(formElement, buttonElement, inactiveButtonClass);
        });
    });
};

//запуск валидации
const enableValidation = (config) => {
    const { formSelector, ...props } = config;

    const inputList = Array.from(document.querySelectorAll(formSelector));
    inputList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement, props);
    })
};

enableValidation(validationConfig);