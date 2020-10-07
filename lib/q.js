// Step 1: Create an IIFE and wrap library code here

(function (window) {
  
  // selector -> can be ready function
  // selector -> be a css selector .class, #id 
  // selector -> html

  let domReadyQueue = [];

  document.addEventListener("DOMContentLoaded", function onDOMReady() {
    // Not need as it is already ready
    document.removeEventListener("DOMContentLoaded", onDOMReady);

    while(domReadyQueue.length) {
      domReadyQueue.shift().call(document);
    }
  });

  function handleDOMReady(fn) {
    return document.readyState === "complete"
      ? fn.call(document) 
      : domReadyQueue.push(fn);
  }

  // Q function 
  function Q(selector) {
    this.nodes = [];  // This will store our query result

    if (!(this instanceof Q)) {  // You missed the 'new'
      return new Q(selector);
    }

    if (typeof selector === 'function') {
      return handleDOMReady(selector);
    }

    if (typeof selector === "string") {
      // HTML
      if (selector[0] === "<" && selector[selector.length - 1] === ">") {
        this.nodes = [createNode(selector)];  //[fn1()]
        // let node = createNode(selector);
        // this.nodes.push(node);
      } else {
        // Normal CSS Selector
        this.nodes = [].slice.call(document.querySelectorAll(selector));
      }
    }

    // Let's add all the search result into 'this' instance
    if (this.nodes.length) {
      this.length = this.nodes.length;
      for(let i = 0; i < this.nodes.length; i++) {
        this[i] = this.nodes[i];
      }
    }
    // undefined
  }


  // New node creation
  function createNode(html) {
    let div = document.createElement("div");
    div.innerHTML = html;
    return div.firstChild;  // HTMLElement which 'html' representing
  }


  // This approach jquery uses for plugin
  Q.fn = Q.prototype;

  Q.fn.each = function(callback) {
    for(let i = 0; i < this.length; i++) {
      callback.call(this, i, this[i]);
    }
    return this;  // for method chaining.
  }

  // Only get html
  Q.fn.html = function(val) {
    if (val == undefined) {
      return this[0] && this[0].innerHTML;
    }
    
    this.each((i, e) => {
      console.log(e);
      e.innerHTML = val;
    })

    // So that I can do method chainging
    return this;  // So that I can do method chainging
  }

  window.Q = Q;
}(window));


// User of the library
Q(() => {
  console.log("I am ready 1...");

  let byId =  Q("#tasks");  // Q(".task")
  console.log("byId:", byId);
  console.log("byId: ", byId.nodes[0]);
  console.log("byId: ", byId[0]);


  let byClass =  Q("li.task");  // Q(".task")
  console.log("byClass: ", byClass.nodes.length);

  let byAttribute = Q("[role=admin");
  console.log("byAttribute: ", byAttribute[0]);
  

  let div = Q("<div>New element</div>");
  console.log("div: ", div);

  // Loop through
  let eachEl =  Q("li.task");  
  eachEl.each((index, el) => {
    console.log(index);
  });

  console.log("HTML:");
  console.log(Q("#tasks").html());
  console.log(Q("li").html());

  Q(".notice")
     .html("A new release is scheduled!")

})

// Q(() => {
//   console.log("I am ready 2...");
// })

// Q(() => {
//   console.log("I am ready 3...");
// })








