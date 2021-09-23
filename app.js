const booksCtn = document.querySelector('.books-ctn');
const form = document.getElementById('form');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static myBooks = [];

  static render(book) {
    const bookSection = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const remove = document.createElement('button');

    bookSection.classList.add('book-section');
    title.classList.add('book-title');
    author.classList.add('book-author');
    remove.classList.add('remove');
    remove.setAttribute('data-title', `${book.title}`);

    title.textContent = `${book.title}`;
    author.textContent = `by ${book.author}`;
    remove.textContent = 'Remove';

    booksCtn.appendChild(bookSection);
    bookSection.appendChild(title);
    bookSection.appendChild(author);
    bookSection.appendChild(remove);
  }

  static clearInput() {
    const title = document.querySelector('.title');
    const author = document.querySelector('.author');
    title.value = '';
    author.value = '';
  }

  static getFromLocalStorage() {
    const books = JSON.parse(localStorage.getItem('myBooks')) || [];
    return books;
  }

  static saveToLocalStorage(book) {
    const books = Book.getFromLocalStorage();
    books.push(book);
    Book.myBooks = books;
    localStorage.setItem('myBooks', JSON.stringify(Book.myBooks));
  }

  static displayBooks() {
    Book.myBooks = Book.getFromLocalStorage();
    Book.myBooks.forEach((book) => {
      Book.render(book);
    });
  }

  static removeBook(title) {
    const store = Book.getFromLocalStorage();
    for (let i = 0; i < store.length; i += 1) {
      if (store[i].title === title) {
        store.splice(i, 1);
      }
    }
    Book.myBooks = store;
    localStorage.setItem('myBooks', JSON.stringify(Book.myBooks));
  }
}

Book.displayBooks();

document.addEventListener('HTMLContentLoaded', Book.displayBooks);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('.title').value;
  const author = document.querySelector('.author').value;
  if (title !== '') {
    const book = new Book(title, author);
    Book.render(book);
    Book.saveToLocalStorage(book);
    Book.clearInput();
  } else {
    alert("Please, enter the title and author of the book")
  }
});

if (Book.myBooks) {
  booksCtn.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
      e.target.parentElement.remove();
      const title = e.target.getAttribute('data-title');
      Book.removeBook(title);
    }
  });
}
