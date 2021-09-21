const booksCtn = document.querySelector('.books-ctn');
const form = document.getElementById('form');
const myBooks = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function removeBook(title) {
  const store = JSON.parse(localStorage.getItem('myBooks'));
  for (let i = 0; i < store.length; i++) {
    if (store[i].title === title) {
      store.splice(i, 1);
    }
  }
  myBooks = store;
  saveToLocalStorage(myBooks);
}

function render(book) {
  const bookSection = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const remove = document.createElement('button');
  const hr = document.createElement('hr');

  bookSection.classList.add('book-section');
  title.classList.add('book-title');
  author.classList.add('book-author');
  remove.classList.add('remove');
  remove.setAttribute('data-title', `${book.title}`);

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
    render(book);
  });
}

function clearInput() {
  const title = document.querySelector('.title');
  const author = document.querySelector('.author');
  title.value = '';
  author.value = '';
}

function getFromLocalStorage() {
  if (localStorage) {
    const books = JSON.parse(localStorage.getItem('myBooks'));
    myBooks = books;
  }
}

function saveToLocalStorage(arr) {
  localStorage.setItem('myBooks', JSON.stringify(arr));
}

displayBooks()

document.addEventListener('HTMLContentLoaded', displayBooks);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('.title').value;
  const author = document.querySelector('.author').value;
  const book = new Book(title, author);
  myBooks.push(book);
  saveToLocalStorage(book);
  render(book);
  clearInput();
});

if (myBooks.length > 0) {
  booksCtn.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
      e.target.parentElement.remove();
      const title = e.target.getAttribute('data-title');
      removeBook(title);
    }
  });
}

