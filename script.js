//Grabbing INPUTS and creating NEW-LIST elements
let inputBox = document.getElementById('input-box');

let listContainer = document.getElementById('lists');
//
//
//adding the event listener for the ADD-BUTTON clicks
document.getElementById('add-task').addEventListener('click', addTask);
function addTask() {
  if (inputBox.value === '') {
    alert('You need to Enter a task');
  } else {
    let li = document.createElement('li');
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    var span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);
  }
  inputBox.value = '';
  saveData();
}
//
//adding the event Listener for the the Keboard-Enter-Press
document.addEventListener('keydown', function (event) {
  if (event.key !== 'Enter') {
  } else if (event.key === 'Enter' && inputBox.value === '') {
    alert('You need to Enter a task');
  } else {
    let li = document.createElement('li');
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    var span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);
    inputBox.value = '';
    saveData();
  }
});

///cancel finished task and delete finsihed task
listContainer.addEventListener(
  'click',
  function (e) {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('checked');
      saveData();
    } else if (e.target.tagName === 'SPAN') {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

///my Save Data function
function saveData() {
  localStorage.setItem('data', listContainer.innerHTML);
}
//function to show saved data when page is rendered
function showTask() {
  listContainer.innerHTML = localStorage.getItem('data');
}
showTask();

//
//
//
//
//Changing Theme
var darkMode = localStorage.getItem('darkMode');
console.log(darkMode);

var theme = document.querySelector('#theme');

function darkTheme() {
  //add the class of dark-theme to the body
  document.body.classList.add('dark-theme');
  //changing theme-icon
  document.getElementById('theme').src = './images/icon-sun.svg';
  //changing background image
  document.querySelector('body').style.backgroundImage =
    "url('./images/bg-desktop-dark.jpg')";
  //update darkmode status in the local Storage
  localStorage.setItem('darkMode', 'enabled');
}
function lightTheme() {
  //remove the class of dark-theme to the body
  document.body.classList.remove('dark-theme');
  //changing theme-icon
  theme.src = './images/icon-moon.svg';
  //changing background image
  document.querySelector('body').style.backgroundImage =
    "url('./images/bg-desktop-light.jpg')";
  //update darkmode status in the local Storage
  localStorage.setItem('darkMode', 'disable');
}
if (darkMode === 'enabled') {
  darkTheme();
}

theme.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode');
  if (darkMode !== 'enabled') {
    darkTheme();
    console.log(darkMode);
  } else {
    lightTheme();
    console.log(darkMode);
  }
});

// Get the button element by its class
const button = document.querySelector('.sett');

// Add a click event listener to the button
button.addEventListener('click', function () {
  // Get all <li> elements within <ul>
  const liElements = document.querySelectorAll('ul li');

  // Loop through all <li> elements and toggle the class "checked"
  liElements.forEach((li) => li.classList.toggle('checked'));
  saveData();
});

document.addEventListener('DOMContentLoaded', function () {
  // Get the <ul> element
  const listElement = document.querySelector('ul');
  // Get the <p> element where we'll display the count
  const paragraphElement = document.querySelector('.parag');

  // Function to update the paragraph content with the current count
  function updateItemCount() {
    const itemCount = listElement.children.length;
    paragraphElement.textContent = itemCount + ' items left';
  }

  // Call the updateItemCount function on page load
  updateItemCount();

  // Add an event listener for changes in the list
  listElement.addEventListener('DOMNodeInserted', updateItemCount);
  listElement.addEventListener('DOMNodeRemoved', updateItemCount);
});
