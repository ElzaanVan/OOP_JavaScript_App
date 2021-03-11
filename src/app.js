//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
function UI() {}

//Add book to list step 2 - function
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  //Create a tr element
  const row = document.createElement("tr");
  //Inser Columns
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">x</a></td>
  `;

  list.appendChild(row);
};
//Clear Input Fields step 2 function
UI.prototype.clearInputFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

UI.prototype.showAlert = function (message, className) {
  //Create a div
  const div = document.createElement("div");

  //Add classes
  div.className = `alert ${className}`;

  //Add text
  div.appendChild(document.createTextNode(message));

  //Get Parent
  const container = document.querySelector(".container");

  //Get Form
  const form = document.querySelector("#book-form");

  //Inser Alert
  container.insertBefore(div, form);

  //Set time-out
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 2000);
};

//Event listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  //Get Title, Author and ISBN values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  //Instantiate Book
  const book = new Book(title, author, isbn);

  //Instantiate UI
  const ui = new UI();

  //Validate
  if (title === "" || author === "" || isbn === "") {
    //Error Alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    //Add book to list step one -call
    ui.addBookToList(book);

    //Show Success alert
    ui.showAlert("Book added", "success");

    //Clear input fiels step one -call
    ui.clearInputFields();
  }

  e.preventDefault();
});
