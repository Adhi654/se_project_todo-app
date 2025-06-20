class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._formSelector = settings.formSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );
  }
  _checkInputValidity(inputElement) {
    const isInputValid = inputElement.validity.valid;
    if (isInputValid) {
      this._hideInputError(inputElement);
    } else {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorMessage);
    }
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  _hideInputError(inputElement) {
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleButtonState() {
    const hasInvalid = this._hasInvalidInput();
    this._buttonElement.classList.toggle(this._inactiveButtonClass, hasInvalid);
    this._buttonElement.disabled = hasInvalid;
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  isValid() {
    return !this._hasInvalidInput();
  }
  resetValidation() {
    this._formEl.reset();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState();
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    this._toggleButtonState();
  }
}
export default FormValidator;
