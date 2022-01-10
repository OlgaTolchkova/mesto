//класс, который настраивает валидацию полей формы

export class FormValidator {
    constructor(config, formElement) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitBtnSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
    }

    //метод, который удаляет класс с ошибкой
    _hideInputError(inputElement) {
        /*this._toggleButtonState();

        this._inputList.forEach((inputElement) => {*/
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    //метод, который добавляет класс с ошибкой
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        /* errorElement.textContent = inputElement.validationMessage; */
        errorElement.classList.add(this._errorClass);
    }


    //метод управления сообщениями об ошибках
    _isValid(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement, inputElement.validationMessage);
        }

    }

    //метод проверки на невалидные поля
    _hasInvalidInput(inputList) {
        return inputList.some(inputElement => {
            return !inputElement.validity.valid;
        });
    }

    //метод, который принимает массив полей ввода и эл-т кнопки,состояние которой нужно поменять
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.setAttribute('disabled', true);
            buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(this._inactiveButtonClass);
        }
        /*const isFormValid = this._formElement.checkValidity();
        buttonElement.classList.toggle(this._inactiveButtonClass, !isFormValid);
        buttonElement.disabled = !isFormValid;*/
    };

    //метод добавления слушателей для каждого поля ввода
    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitBtnSelector);
        this._toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);

                this._toggleButtonState(inputList, buttonElement);

            });
        });
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();
    };

    resetValidation() {

        this._toggleButtonState(inputList, buttonElement); //управляем кнопкой

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement); //очищаем ошибки 
            input.value = '';
        });
    }
}