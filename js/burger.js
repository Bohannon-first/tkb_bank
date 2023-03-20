const burgerBtn = document.querySelector('.burger');
const mainNav = document.querySelector('.main-nav');

// Обработчик клика по кнопке-бургер
const burgerBtnClickHandler = () => {
  mainNav.classList.toggle('main-nav--show');
  burgerBtn.classList.toggle('burger--open');
};

burgerBtn.addEventListener('click', burgerBtnClickHandler);
