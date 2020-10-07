// All the todos should be shown
//const taskUI = document.querySelector("#tasks");



const taskEl$ = $("#tasks");

// Search todos
$("#search-form").on("submit", (e) => {
  e.preventDefault();
  let q = $("#search-todo").val();

  filterTodos(q);
});


function filterTodos(q) {
  let filteredTodos = TodoData.filter(t => {
    if (t.title.toLowerCase().indexOf(q.toLowerCase()) >= 0) {
      return t;
    }
  });

  tasksUI(filteredTodos);
}


// click, mousemove, mousedown, mouseup, keyup,keydown...
$("#btnAdd").on("click", (e) => {
  // let task = document.querySelector("#inputTask").value
  let taskTitle = $("#inputTask").val();

  let todo = {
    id: +new Date(),
    title: taskTitle,
    completed: false
  }
  
  TodoData = [todo, ...TodoData]

  let newTask = taskItemUI(todo);
  taskEl$.prepend(newTask);  

});


// BEST PRACTICE:  Optimized way to attach events to a list of elements
// Delete Todo
$("#tasks").on("click", ".ui-delete", (e) => {
  
  //alert(e.target.parentNode.parentNode.getAttribute("data-task-id"));
  let taskId = $(e.target).closest("button").attr("data-task-id");
  TodoData = TodoData.filter(t => t.id !== taskId);
  
  let response = window.confirm("Do you want to delete this todo?");

  let currentTaskItem$ = $(`#task-${taskId}`);

  if (response) {
    currentTaskItem$.fadeOut("slow", ()=> {
      currentTaskItem$.remove();
    }); 
  }
});

// Feature: Toggle todo state from complete to in-progress and vice-versa
$("#tasks").on("dblclick", "h5", (e) => {
  //alert(e.target.tagName);
  let taskId = $(e.target)
        .closest(".card")
        .attr("id");


  // Get current ui element
  let currentTaskItem$ = $(`#${taskId}`);


  // Get the todo id
  taskId = taskId.split("-")[1];

  // current editoed todo object
  let currentEditedTodo = undefined;

  TodoData = TodoData.map(t => {
    if (t.id == taskId) {
      currentEditedTodo = t;
      t.completed = !t.completed;
    }
    return t;
  });

  // Build the new UI
  let updatedUI = taskItemUI(currentEditedTodo);

  // Replace old task item Ui WITH THE new UI.
  currentTaskItem$.replaceWith(updatedUI);

});



// Render full task 
var tasksUI =  function (todoData) {

  let html = todoData.map(t => {
    return taskItemUI(t);
  });

  taskEl$.html(html.join(""));
}

// Render one task item
var taskItemUI = function (task) {

  let statusClass = task.completed ? "badge badge-success"
                    : "badge badge-warning";

  return (
    `
      <div class="card mt-3" id=task-${task.id} >
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h5 class="card-title todo-title">${task.title}</h5>
            <button data-task-id =${task.id} class="btn btn-outline ui-delete">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
               <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
              </svg>
            </button>
          </div>

          <span class="badge ${statusClass}">
            ${task.completed ? "completed": "in-progress" }
          </span>
        </div>
      </div>
    `
  )
}

tasksUI(TodoData);


