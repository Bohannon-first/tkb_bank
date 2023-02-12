import {form} from './form.js';

const btnAddRow = form.querySelector('#add-row');
const btnRemoveRow = document.querySelector('#delete-row');
const NUMBER_CELLS = 4;

// Обработчик клика на кнопку "Добавить строку"
const btnAddRowClickHandler = () => {
  const myTable = form.querySelector('#table');
  const newRow = myTable.insertRow(-1);
  newRow.classList.add('form__table-row');

  // Счётчик-цикл для добавления ячеек в ряд
  for (let i = 1; i <= NUMBER_CELLS; i++) {
    newRow.insertCell().classList.add('form__table-cell');
  }
};

btnAddRow.addEventListener('click', btnAddRowClickHandler);

// Обработчик клика на кнопку "Удалить строку"
const btnRemoveRowClickHandler = () => {
  const myTable = form.querySelector('#table');
  const numbersRows = myTable.querySelectorAll('.form__table-row');

  if (numbersRows.length > 2) {
    myTable.deleteRow(-1);
  }
  return false;
};

btnRemoveRow.addEventListener('click', btnRemoveRowClickHandler);
