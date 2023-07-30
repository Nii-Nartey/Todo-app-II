// Grabbing INPUTS and creating NEW-LIST elements
let inputBox = document.getElementById('input-box');
let listContainer = document.getElementById('lists');

// Function to update the item count
function updateItemCount() {
  const uncheckedItems = document.querySelectorAll('#lists li:not(.checked)');
  const itemCount = uncheckedItems.length;
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
    setupDragAndDrop();
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
      setupDragAndDrop();
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
  setupDragAndDrop();
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

// Function to set the background image based on the  screen width
function setBackground() {
  const isMobile = window.matchMedia('(max-width: 375px)').matches;
  const darkMode = localStorage.getItem('darkMode');

  if (isMobile) {
    if (darkMode === 'enabled') {
      document.body.style.backgroundImage =
        "url('./images/bg-mobile-dark.jpg')";
    } else {
      document.body.style.backgroundImage =
        "url('./images/bg-mobile-light.jpg')";
    }
  } else {
    if (darkMode === 'enabled') {
      document.body.style.backgroundImage =
        "url('./images/bg-desktop-dark.jpg')";
    } else {
      document.body.style.backgroundImage =
        "url('./images/bg-desktop-light.jpg')";
    }
  }
}
// Call the setBackground function when the page loads, when the theme is toggled, and when the window size changes
window.addEventListener('DOMContentLoaded', setBackground);
theme.addEventListener('click', setBackground);
window.addEventListener('resize', setBackground);

// Get the <ul> element
const listElement = document.querySelector('ul');

// Call the updateItemCount function on page load
updateItemCount();

// Add event listeners for changes in the list
listElement.addEventListener('DOMNodeInserted', updateItemCount);
listElement.addEventListener('DOMNodeRemoved', updateItemCount);

// Function to set up Drag and Drop
function setupDragAndDrop() {
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
}
//Calling the showTask function when the page is loaded
document.addEventListener('DOMContentLoaded', showTask);

// Function to show and hide list items based on the clicked button
function filterListItems(buttonType) {
  const listItems = document.querySelectorAll('ul li');

  listItems.forEach((li) => {
    if (buttonType === 'all') {
      li.style.display = 'block'; // Show all list items
    } else if (buttonType === 'active') {
      li.style.display = li.classList.contains('checked') ? 'none' : 'block'; // Showing list items without checked class name. usin  Tenary Operators
    } else if (buttonType === 'completed') {
      li.style.display = li.classList.contains('checked') ? 'block' : 'none'; // Showing list items with checked class name. Tenary operator
    }
  });
  updateItemCount();
}

// Function to clear completed items
function clearCompleted() {
  const completedItems = document.querySelectorAll('ul li.checked');

  // Removing list items with checked class
  completedItems.forEach((item) => {
    item.remove();
  });
  updateItemCount();
  saveData();
}

// Adding click event listeners to the buttons
const allButton = document.querySelector('.sett');
const activeButton = document.querySelector('.act');
const completedButton = document.querySelector('.ctd');
const clearCompletedButton = document.querySelector('.cc');

allButton.addEventListener('click', () => filterListItems('all'));
activeButton.addEventListener('click', () => filterListItems('active'));
completedButton.addEventListener('click', () => filterListItems('completed'));
clearCompletedButton.addEventListener('click', clearCompleted);
