//ES6

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
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
  }

  clearInputFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }

  showAlert(message, className) {
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
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
}

// Local Storage Class
class Store {
  static getBook() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBook() {
    const books = Store.getBook();

    books.forEach(function (book) {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBook();

    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBook();

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

//Event listener for DOM
document.addEventListener("DOMContentLoaded", Store.displayBook);

//Event listeners to add book
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
    ui.showAlert("Please fill in all the fields", "error");
  } else {
    //Add book to list step one -call
    ui.addBookToList(book);

    //Add book LS
    Store.addBook(book);

    //Show Success alert
    ui.showAlert("Book added", "success");

    //Clear input fiels step one -call
    ui.clearInputFields();
  }

  e.preventDefault();
});

//Event listener to remove book
document.getElementById("book-list").addEventListener("click", function (e) {
  //Instantiate UI
  const ui = new UI();
  //Add book to list step one -call
  ui.deleteBook(e.target);

  //Remove book on LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  //Show Success alert
  ui.showAlert("Book Removed", "success");

  e.preventDefault();
});
