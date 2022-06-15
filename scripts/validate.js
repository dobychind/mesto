function enableValidation(settings) {
  const formElementsList = Array.from(document.querySelectorAll(settings.formSelector));

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      if (!buttonElement.classList.contains(settings.inactiveButtonClass)) {
        disableButton(buttonElement);
      }
    }
    else {
      enableButton(buttonElement)
    }
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  const showError = (input, errorSpan) => {
    input.classList.add(settings.inputErrorClass);
    errorSpan.classList.add(settings.errorClass);
    errorSpan.textContent = input.validationMessage;
  };

  const hideError = (input, errorSpan) => {
    input.classList.remove(settings.inputErrorClass);
    errorSpan.classList.remove(settings.errorClass);
    errorSpan.textContent = '';
  };

  const IsValid = (input, errorSpan) => {
    if (!input.validity.valid) {
      showError(input, errorSpan);
    }
    else {
      hideError(input, errorSpan);
    }
  };

  const clearElements = (elements, className) => {
    elements.forEach((span) => {
      span.classList.remove(className);
    });
  };

  const cleanErrors = (form, buttonElement) => {
    const activeErrors = form.querySelectorAll(`.${settings.errorClass}`);
    const errorInputs = form.querySelectorAll(`.${settings.inputErrorClass}`);
    clearElements(activeErrors, settings.errorClass);
    clearElements(errorInputs, settings.inputErrorClass);
    disableButton(buttonElement);
  };

  function disableButton(button) {
    button.classList.add(settings.inactiveButtonClass);
    button.setAttribute('disabled', 'disabled');
  }

  function enableButton(button) {
    button.classList.remove(settings.inactiveButtonClass);
    button.removeAttribute('disabled');
  }

  const setupFormValidation = (form) => {
    const formInputsList = Array.from(form.querySelectorAll(settings.inputSelector));
    const submitButton = form.querySelector(settings.submitButtonSelector);
    toggleButtonState(formInputsList, submitButton);
    form.addEventListener('input', ((evt) => {
      const input = evt.target;
      const errorSpan = form.querySelector(`#${input.id}-error`);
      IsValid(input, errorSpan);
      toggleButtonState(formInputsList, submitButton);
    }
    ));
    form.addEventListener('reset', () => cleanErrors(form, submitButton));
  }

  formElementsList.forEach((form) => {
    setupFormValidation(form);
  });
}
