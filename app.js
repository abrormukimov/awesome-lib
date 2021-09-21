const booksCtn = document.querySelector('.books-ctn');
const form = document.getElementById('form');
const myBooks = [{title: 'a', author: 'b'}];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function removeBook(title) {
  myBooks.filter(book => book.title !== title);
}

function addBook(book) {
  const bookSection = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const remove = document.createElement('button');
  const hr = document.createElement('hr');

  bookSection.classList.add('book-section');
  title.classList.add('book-title');
  author.classList.add('book-author');
  remove.classList.add('remove');
  remove.classList.add(`${book.title}`);

  title.textContent = `${book.title}`;
  author.textContent = `${book.author}`;
  remove.textContent = 'Remove';

  booksCtn.appendChild(bookSection);
  bookSection.appendChild(title);
  bookSection.appendChild(author);
  bookSection.appendChild(remove);
  bookSection.appendChild(hr);
}

function displayBooks() {
  myBooks.forEach((book) => {
    addBook(book);
  });
}

displayBooks()

document.addEventListener('HTMLContentLoaded', displayBooks);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('.title').value;
  const author = document.querySelector('.author').value;
  const book = new Book(title, author);
  myBooks.push(book);
  addBook(book);
});

if (myBooks.length !== 0) {
  const remove = document.querySelector('.remove');
  remove.addEventListener('click', removeBook);
}

