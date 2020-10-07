// All the todos should be shown
//const taskUI = document.querySelector("#tasks");

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

  taskUI();

});

var taskUI =  function () {
  const taskUI$ = $("#tasks");

  let html = TodoData.map(t => {
    return (
      `
        <div class="card mt-3" >
          <div class="card-body">
            <h5 class="card-title">${t.title}</h5>
            <span>
              ${t.completed ? "completed": "in-progress" }
            </span>
          </div>
        </div>
      `
    )
  });

  taskUI$.html(html.join(""));
}

taskUI();


