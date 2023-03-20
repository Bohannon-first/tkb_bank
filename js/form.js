const form = document.querySelector('#form');
const inputFields = form.querySelectorAll('.main-input');
const modalFormSend = document.querySelector('.modal');
const modalBtnClose = modalFormSend.querySelector('#modal-btn-close');

// Проверка на наличие незаполненных полей с присвоением красной обводки
const isFieldFilled = (evt) => {
  let count = 0;
  inputFields.forEach((input) => {
    if (!input.value) {
      evt.preventDefault();
      count += 1;
      input.classList.add('main-input--error', 'main-input--shake-error');
      setTimeout(() => {
        input.classList.remove('main-input--shake-error');
      }, 400);
    }
  });

  // Показ модалки об отправке формы, если все поля заполнены
  if (count === 0) {
    evt.preventDefault();
    modalFormSend.classList.remove('hidden');

    // Вывод в консоль данных формы в json
    const formData = new FormData(form);
    const jsonDataForm = Object.fromEntries(formData);
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(jsonDataForm));

    fetch('https://bohannon.ru/php/projects/tkb_bank/form.php', {
      method: 'POST',
      body: JSON.stringify(jsonDataForm),
    },
    )
      .then((response) => {
        if (response.ok) {
          // eslint-disable-next-line no-console
          console.log('Форма отправлена');
        } else {
          // eslint-disable-next-line no-console
          console.log('Не удалось отправить форму');
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(`${err} Не удалось отправить форму. Попробуйте еще раз.`);
        throw err;
      });

    form.reset();
  }
};

form.addEventListener('submit', isFieldFilled);

// Удаление красной обводки при наборе текста
inputFields.forEach((input) => {
  input.onchange = () => {
    if (input.classList.contains('main-input--error')) {
      input.classList.remove('main-input--error');
    }
  };
});

// Закрытие модалки
const closeModalForm = () => {
  modalFormSend.style.animation = 'closeModal 0.5s ease 0s 1 normal forwards';
  setTimeout(() => {
    modalFormSend.classList.add('hidden');
    modalFormSend.removeAttribute('style');
  }, 500);
};

modalBtnClose.addEventListener('click', closeModalForm);

// Проверка на нажатую кнопку Esc и клик по оверлею
const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const isOverlayClick = (evt) => {
  return evt.target === modalFormSend;
};

// Проверка на нажатую кнопку Esc и закрытие модалки
const onModalAddEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModalForm();
  }
};

document.addEventListener('keydown', onModalAddEscKeydown);

// Проверка по клику на оверлей и закрытие модалки
const onModalAdOverlayClick = (evt) => {
  if (isOverlayClick(evt)) {
    evt.preventDefault();
    closeModalForm();
  }
};

document.addEventListener('click', onModalAdOverlayClick);

export {form};
