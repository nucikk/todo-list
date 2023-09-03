document.addEventListener("DOMContentLoaded", () => {
  const burgerIcon = document.querySelector("#burgerIcon");
  const closeIcon = document.querySelector("#closeIcon");
  const navList = document.querySelector(".nav_list");

  //* ფუნქცის განსაზღვრა 820px რეზოლუციაზე
  const toggleMenu = () => {
      const isMobile = window.innerWidth <= 820;

      // * Display/hide burger-close icons screen size
      burgerIcon.style.display = isMobile ? "inline-block" : "none";
      closeIcon.style.display = "none";

      navList.classList.toggle("active", !isMobile);
  };

  toggleMenu();

  window.addEventListener("resize", toggleMenu);

  //* Add click event to burger icon for toggling menu
  burgerIcon.addEventListener("click", () => {
      navList.classList.toggle("active");
      burgerIcon.style.display = "none";
      closeIcon.style.display = "block";
  });

  //* Add click event to close icon for closing the menu
  closeIcon.addEventListener("click", () => {
      navList.classList.remove("active");
      burgerIcon.style.display = "block";
      closeIcon.style.display = "none";
  });
});

const input = document.querySelector('.todo_input');
const addButton = document.querySelector('.add_btn');
const deleteAllButton = document.querySelector('.delete_all_btn');
const todoList = document.querySelector('.todo_list');

//* ფუნქცია ახალი li-ს შესაქმნელად
function createListItem(text) {
  const listItem = document.createElement('li');
 
 // Create a checkbox 
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => {
      listItem.classList.toggle('completed', checkbox.checked);
            updateDeleteAllbtnVisibility()
  });

  const taskLabel = document.createElement('label');
  taskLabel.textContent = text;


  const deleteIcon = document.createElement('img');
  deleteIcon.classList.add('delete_icon');
  deleteIcon.src = './image/trash-bin.png';  // delete icone img

  // * წაშლის აიქონზე დაჭერით წაიშლება ლისტის ელემენტები
  deleteIcon.addEventListener('click', () => {
      todoList.removeChild(listItem);
            updateDeleteAllbtnVisibility()
  });

  listItem.appendChild(checkbox);
  listItem.appendChild(taskLabel);
  listItem.appendChild(deleteIcon);

  return listItem;
}
//*ფუნქცია -  ახლი ელემენტების დამატება
function addTodoItem() {
  const text = input.value.trim();

  //* შეამოწმებს ცარელია თუ არა ინფუთი
  if (text !== '') {
      const listItem = createListItem(text); //^ შექმნის ახალ ლისტს
      todoList.appendChild(listItem); //^ დამატება ელემენტის  
      input.value = ''; //^ ინპუთის გასუფთავება ცარიელი სტრინგი არ დაბეჭდოს
            updateDeleteAllbtnVisibility()
  }
}
//*add & enter ღილაკზე დაჭერით დაამატებს ახალ ლისტებს
addButton.addEventListener('click', addTodoItem);

input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
      addTodoItem();
  }
});
//*თუ ერთი ელემენტი მაინც დაემატებს შემდეგ გამოჩნდება ყველა ელემენტის წასაშლელი ღილაკი
function       updateDeleteAllbtnVisibility(){
  deleteAllButton.style.display = todoList.children.length > 0 ? 'block' : 'none';
}

      updateDeleteAllbtnVisibility()
//*წაშლის ყველა ელემენტს 
deleteAllButton.addEventListener('click', () => {
  while (todoList.firstChild) {
      todoList.removeChild(todoList.firstChild);
  }
        updateDeleteAllbtnVisibility()
});