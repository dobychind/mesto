export class FormValidator {
  constructor(validationSelectors, formElement) {
    this._formSelector = validationSelectors.formSelector;
    this._inactiveButtonClass = validationSelectors.inactiveButtonClass;
    this._inputErrorClass = validationSelectors.inputErrorClass;
    this._errorClass = validationSelectors.errorClass;
    this._inputSelector = validationSelectors.inputSelector;
    this._submitButtonSelector = validationSelectors.submitButtonSelector;
    this._formElement = formElement;
  }
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      if (!this._submitButton.classList.contains(this._inactiveButtonClass)) {
        this._disableButton();
      }
    }
    else {
      this._enableButton()
    }
  };
  _hasInvalidInput() {
    return this._formInputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _showError(input, errorSpan) {
    input.classList.add(this._inputErrorClass);
    errorSpan.classList.add(this._errorClass);
    errorSpan.textContent = input.validationMessage;
  };

  _hideError(input, errorSpan) {
    input.classList.remove(this._inputErrorClass);
    errorSpan.classList.remove(this._errorClass);
    errorSpan.textContent = '';
  };

  _IsValid(input, errorSpan) {
    if (!input.validity.valid) {
      this._showError(input, errorSpan);
    }
    else {
      this._hideError(input, errorSpan);
    }
  };

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute('disabled', 'disabled');
  }
  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  }

  cleanErrors() {
    this._formInputsList.forEach(inputElement => {
      const errorSpan = this._formElement.querySelector(`#${inputElement.id}-error`);
      this._hideError(inputElement, errorSpan);
    });
    this._disableButton();
  }
  enableValidation() {
    this._formInputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._formElement.addEventListener('input', ((evt) => {
      const input = evt.target;
      const errorSpan = this._formElement.querySelector(`#${input.id}-error`);
      this._IsValid(input, errorSpan);
      this._toggleButtonState();
    }
    ));
  }
}
