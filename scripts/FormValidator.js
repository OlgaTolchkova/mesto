//класс, который настраивает валидацию полей формы

export class FormValidator {
    constructor(validationConfig, formElement) {
        this._formSelector = validationConfig.formSelector;
        this._inputSelector = validationConfig.inputSelector;
        this._submitBtnSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;
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
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    //метод, который принимает массив полей ввода и эл-т кнопки,состояние которой нужно поменять
    _toggleButtonState(buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.setAttribute('disabled', true);
            buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(this._inactiveButtonClass);
        }
        /* const isFormValid = this._formElement.checkValidity();
        buttonElement.classList.toggle(this._inactiveButtonClass, !isFormValid);
        buttonElement.disabled = !isFormValid; */
    };

    //метод добавления слушателей для каждого поля ввода
    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitBtnSelector);
        /*this._toggleButtonState(inputList, buttonElement);*/

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState(buttonElement);
            });
        });
    }

    enableValidation() {
        const forms = Array.from(document.querySelectorAll(this._formSelector));
        forms.forEach((form) => {
            this._formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });

            this._setEventListeners(form);
        })
    }

    resetValidation() {

        this._toggleButtonState(buttonElement); //управляем кнопкой

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement); //очищаем ошибки 
            input.value = '';
        });
    }
}