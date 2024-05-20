
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const pendingTasksList = document.getElementById('pending-tasks');
const completedTasksList = document.getElementById('completed-tasks');

function createTask(text) {
  const taskItem = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', completeTask);
  taskItem.appendChild(checkbox);

  const taskText = document.createElement('span');
  taskText.textContent = text;
  taskItem.appendChild(taskText);
  const dateTime = document.createElement('span');
  dateTime.textContent = new Date().toLocaleString(); // Add the current date and time
  dateTime.className = 'datetime';
  taskItem.appendChild(dateTime);


  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', deleteTask);
  taskItem.appendChild(deleteButton);

  return taskItem;
}


function addTask(event) {
  event.preventDefault(); // Prevent form submission
  const taskText = taskInput.value.trim(); // Get task text and remove leading/trailing whitespace

  if (taskText !== '') { // Only add task if it is not empty
    const taskItem = createTask(taskText);
    pendingTasksList.appendChild(taskItem);
    taskInput.value = ''; // Clear the input field
  }
}


function deleteTask(event) {
  const taskItem = event.target.parentNode;
  const parentList = taskItem.parentNode;
  parentList.removeChild(taskItem);
}


function completeTask(event) {
  const taskItem = event.target.parentNode;
  const parentList = taskItem.parentNode;
  const destinationList = parentList === pendingTasksList ? completedTasksList : pendingTasksList;
  taskItem.removeChild(taskItem.firstChild); // Remove the checkbox
  destinationList.appendChild(taskItem);
  taskItem.classList.toggle('completed');
}


taskForm.addEventListener('submit', addTask);

