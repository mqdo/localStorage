const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const items = JSON.parse(localStorage.getItem("items")) || [];

const form = $("form");
const todoInput = $("input[type=text]");
const todoList = $(".todo-list");
const allDone = $(".all-done");
const reset = $(".reset");

function populateList(items = [], todoList) {
  localStorage.setItem("items", JSON.stringify(items));
  todoList.innerHTML = items
    .map((item, index) => {
      return `
        <li>
          <input type="checkbox" name="todo-${index}" data-key=${index}
          ${item.isDone ? "checked" : ""}>
          <label for="todo-${index}" data-key=${index}>${
        item.value
      }</label>
        </li>
      `;
    })
    .join("");
}

function addItem(e) {
  e.preventDefault();
  if (!todoInput.value) return;
  items.push({
    value: todoInput.value,
    isDone: false,
  });
  populateList(items, todoList);
  this.reset();
}

function handleCheckboxChange(e) {
  const index = e.target.dataset.key;
  items[index].isDone = !items[index].isDone;
  populateList(items, todoList);
}

function checkAllDone(e) {
  items.forEach(item => {
    item.isDone = true;
  });
  console.table(items);
  console.log(localStorage.getItem("items"));
  populateList(items, todoList);
}

function resetAll(e) {
  items.splice(0, items.length);
  populateList(items, todoList);
}

populateList(items, todoList);

form.addEventListener("submit", addItem);

todoList.addEventListener("click", handleCheckboxChange);

allDone.addEventListener("click", checkAllDone);

reset.addEventListener("click", resetAll);