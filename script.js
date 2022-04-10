const input = document.querySelector('#texto-tarefa');
const buttonCreate = document.querySelector('#criar-tarefa');
const buttonErase = document.querySelector('#apaga-tudo');
const buttonItem = document.querySelector('#remover-finalizados');
const buttonSave = document.querySelector('#salvar-tarefas');
const buttonUp = document.querySelector('#mover-cima');
const buttonDown = document.querySelector('#mover-baixo');
const buttonRemove = document.querySelector('#remover-selecionado');
const list = document.querySelector('#lista-tarefas');

function createItem() {
  const item = document.createElement('li');
  item.className = 'tarefa';
  item.innerHTML = input.value;
  list.appendChild(item);
}

function createInputItem() {
  if (input.value !== '') {
    createItem();
    input.value = '';
  }
}

function colorGray(event) {
  const item = document.getElementsByClassName('tarefa');
  if (item) {
    const selected = document.querySelector('.selected');
    if (selected) {
      selected.classList.remove('selected');
    } event.target.classList.add('selected');
  }
}

function doubleClick(event) {
  const item = document.getElementsByClassName('tarefa');
  if (item) {
    if (event.target.classList.contains('completed')) {
      event.target.classList.remove('completed');
    } else {
      event.target.classList.add('completed');
    }
  }
}

function eraseAll() {
  const item = document.querySelectorAll('.tarefa');
  for (let index = 0; index < item.length; index += 1) {
    item[index].remove();
  }
}

function eraseItem() {
  const item = document.querySelectorAll('.completed');
  if (item.length > 0) {
    for (let index = 0; index < item.length; index += 1) {
      item[index].remove();
    }
  }
}

function saveItems() {
  localStorage.setItem('storagelist', list.innerHTML);
}

function getStorage() {
  const storageList = localStorage.getItem('storagelist');
  if (storageList !== []) {
    list.innerHTML = storageList;
  }
}

function moveUp() {
  const selected = document.querySelector('.selected');
  if (selected && selected.previousSibling !== null) {
    list.insertBefore(selected, selected.previousSibling);
  }
}

function moveDown() {
  const selected = document.querySelector('.selected');
  if (selected && selected.nextSibling !== null) {
    list.insertBefore(selected, selected.nextSibling.nextSibling);
  }
}

function removeItem() {
  const item = document.querySelectorAll('.tarefa');
  for (let index = 0; index < item.length; index += 1) {
    if (item[index].classList.contains('selected')) {
      item[index].remove();
    }
  }
}

function onLoad() {
  getStorage();
  buttonCreate.addEventListener('click', createInputItem);
  list.addEventListener('click', colorGray);
  list.addEventListener('dblclick', doubleClick);
  buttonErase.addEventListener('click', eraseAll);
  buttonItem.addEventListener('click', eraseItem);
  buttonSave.addEventListener('click', saveItems);
  buttonUp.addEventListener('click', moveUp);
  buttonDown.addEventListener('click', moveDown);
  buttonRemove.addEventListener('click', removeItem);
}

window.onload = onLoad;