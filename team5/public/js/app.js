
    // Function to handle dragging of tasks
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

// Function to allow dropping of tasks
function allowDrop(ev) {
  ev.preventDefault();
}

// Function to handle dropping of tasks
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.currentTarget.appendChild(document.getElementById(data));
}

// Function to toggle visibility of task creation and progress sections
function createTask() {
  var inProgress = document.getElementById("inprogress");
  var done = document.getElementById("done");
  var newTask = document.getElementById("new-task");
  if (inProgress.style.display === "none") {
    inProgress.style.display = "block";
    done.style.display = "block";
    newTask.style.display = "none";
  } else {
    inProgress.style.display = "none";
    done.style.display = "none";
    newTask.style.display = "flex";
  }
}

// Function to save new tasks
function saveTask() {
  var todo = document.getElementById("wish");
  var taskName = document.getElementById("form-row-name").value;
  todo.innerHTML += `
    <div class="task" id="${taskName.toLowerCase().split(" ").join("")}" draggable="true" ondragstart="drag(event)">
      <span>${taskName}</span>
    </div>`;
}

// Function to toggle visibility of save and edit buttons
function editTask() {
  var saveButton = document.getElementById("save-btn");
  var editButton = document.getElementById("edit-btn");
  if (saveButton.style.display === "none") {
    saveButton.style.display = "block";
    editButton.style.display = "none";
  } else {
    saveButton.style.display = "none";
    editButton.style.display = "block";
  }
}
