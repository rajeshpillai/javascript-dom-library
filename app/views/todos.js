// All the todos should be shown
//const taskUI = document.querySelector("#tasks");



const taskEl$ = $("#tasks");

// click, mousemove, mousedown, mouseup, keyup,keydown...
$("#btnAdd").on("click", (e) => {
  // let task = document.querySelector("#inputTask").value
  let taskTitle = $("#inputTask").val();

  let todo = {
    id: +new Date(),
    title: taskTitle,
    completed: false
  }
  

  // Old way
  // TodoData.push({
  //   id: +new Date(),
  //   title: task,
  //   completed: false
  // });
  
  TodoData = [todo, ...TodoData]

  // Renders full items
  //tasksUI();

  let newTask = taskItemUI(todo);

  // append adds to end
  //taskEl$.append(newTask);  

  // prepend
  taskEl$.prepend(newTask);  

});


// Render full task 
var tasksUI =  function () {

  let html = TodoData.map(t => {
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
      <div class="card mt-3" >
        <div class="card-body">
          <h5 class="card-title">${task.title}</h5>
          <span class="badge ${statusClass}">
            ${task.completed ? "completed": "in-progress" }
          </span>
        </div>
      </div>
    `
  )
}

tasksUI();


