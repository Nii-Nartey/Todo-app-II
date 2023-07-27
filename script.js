// Grabbing INPUTS and creating NEW-LIST elements
let inputBox = document.getElementById('input-box');
let listContainer = document.getElementById('lists');

// Function to update the item count
function updateItemCount() {
  const itemCount = document.querySelectorAll('#lists li').length;
  document.querySelector('.parag').textContent = itemCount + ' items left';
}

// Function to add a new task
function addTask() {
  if (inputBox.value === '') {
    alert('You need to Enter a task');
  } else {
    let li = document.createElement('li');
    li.innerHTML = inputBox.value;
    li.setAttribute('draggable', true);
    li.classList.add('draggable');
    listContainer.appendChild(li);
    var span = document.createElement('img');
    span.setAttribute('src', './images/icon-cross.svg');
    li.appendChild(span);
  }
  inputBox.value = '';
  saveData();
  updateItemCount();
}

// Event listener for the ADD-BUTTON clicks
document.getElementById('add-task').addEventListener('click', addTask);

// Event listener for the Keboard-Enter-Press
document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    if (inputBox.value === '') {
      alert('You need to Enter a task');
    } else {
      let li = document.createElement('li');
      li.innerHTML = inputBox.value;
      li.setAttribute('draggable', true);
      li.classList.add('draggable');
      listContainer.appendChild(li);
      var span = document.createElement('img');
      span.setAttribute('src', './images/icon-cross.svg');
      li.appendChild(span);
      inputBox.value = '';
      saveData();
      updateItemCount();
    }
  }
});

// Cancel finished task and delete finished task
listContainer.addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
    saveData();
    updateItemCount();
  } else if (e.target.tagName === 'IMG') {
    e.target.parentElement.remove();
    saveData();
    updateItemCount();
  }
});

// Function to save data
function saveData() {
  localStorage.setItem('data', listContainer.innerHTML);
}

// Function to show saved data when the page is rendered
function showTask() {
  listContainer.innerHTML = localStorage.getItem('data');
  updateItemCount();
}
//calling the showTask function
showTask();

// Changing Theme
var darkMode = localStorage.getItem('darkMode');
var theme = document.querySelector('#theme');

function darkTheme() {
  document.body.classList.add('dark-theme');
  document.getElementById('theme').src = './images/icon-sun.svg';
  document.querySelector('body').style.backgroundImage =
    "url('./images/bg-desktop-dark.jpg')";
  localStorage.setItem('darkMode', 'enabled');
}

function lightTheme() {
  document.body.classList.remove('dark-theme');
  theme.src = './images/icon-moon.svg';
  document.querySelector('body').style.backgroundImage =
    "url('./images/bg-desktop-light.jpg')";
  localStorage.setItem('darkMode', 'disable');
}

if (darkMode === 'enabled') {
  darkTheme();
}

theme.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode');
  if (darkMode !== 'enabled') {
    darkTheme();
  } else {
    lightTheme();
  }
});

// Get the button element by its class
const button = document.querySelector('.sett');

// Add a click event listener to the button
button.addEventListener('click', function () {
  const liElements = document.querySelectorAll('ul li');
  liElements.forEach((li) => li.classList.toggle('checked'));
  saveData();
});

// Function to update the paragraph content with the current count
/* function updateItemCount() {
  const itemCount = listContainer.children.length;
  document.querySelector('.parag').textContent = itemCount + ' items left';
} */

// Get the <ul> element
const listElement = document.querySelector('ul');

// Call the updateItemCount function on page load
updateItemCount();

// Add event listeners for changes in the list
listElement.addEventListener('DOMNodeInserted', updateItemCount);
listElement.addEventListener('DOMNodeRemoved', updateItemCount);

// Dragging
const draggables = document.querySelectorAll('.draggable');

for (drags of draggables) {
  drags.addEventListener('dragstart', function (e) {
    let selected = e.target;

    listContainer.addEventListener('dragover', function (e) {
      e.preventDefault();
    });

    listContainer.addEventListener('drop', function (e) {
      listContainer.appendChild(selected);
      selected = null;
      updateItemCount();
    });
  });
}
