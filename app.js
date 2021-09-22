const booksCtn = document.querySelector('.books-ctn');
const form = document.getElementById('form');
let myBooks = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

const render = (book) => {
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
};

const clearInput = () => {
  const title = document.querySelector('.title');
  const author = document.querySelector('.author');
  title.value = '';
  author.value = '';
};

const getFromLocalStorage = () => {
  const books = JSON.parse(localStorage.getItem('myBooks')) || [];
  return books;
};

const saveToLocalStorage = (book) => {
  const books = getFromLocalStorage();
  books.push(book);
  myBooks = books;
  localStorage.setItem('myBooks', JSON.stringify(myBooks));
};

const displayBooks = () => {
  myBooks = getFromLocalStorage();
  myBooks.forEach((book) => {
    render(book);
  });
};

displayBooks();

const removeBook = (title) => {
  const store = getFromLocalStorage();
  for (let i = 0; i < store.length; i += 1) {
    if (store[i].title === title) {
      store.splice(i, 1);
    }
  }
  myBooks = store;
  localStorage.setItem('myBooks', JSON.stringify(myBooks));
};

document.addEventListener('HTMLContentLoaded', displayBooks);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('.title').value;
  const author = document.querySelector('.author').value;
  const book = new Book(title, author);
  render(book);
  saveToLocalStorage(book);
  clearInput();
});

if (myBooks) {
  booksCtn.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
      e.target.parentElement.remove();
      const title = e.target.getAttribute('data-title');
      removeBook(title);
    }
  });
}
