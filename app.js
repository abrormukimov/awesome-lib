const booksCtn = document.querySelector('.books-ctn');
const form = document.getElementById('form');
const myBooks = [{title: 'a', author: 'b'}];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function removeBook(title) {
  for (let i = 0; i < myBooks.length; i++) {
    if (myBooks[i].title === title) {
      myBooks.splice(i, 1);
    }
  }
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

displayBooks()

document.addEventListener('HTMLContentLoaded', displayBooks);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('.title').value;
  const author = document.querySelector('.author').value;
  const book = new Book(title, author);
  myBooks.push(book);
  render(book);
  clearInput();
});

if (myBooks.length > 0) {
  const remove = document.querySelector('.remove');
  booksCtn.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
      e.target.parentElement.remove();
      const title = e.target.getAttribute('data-title');
      removeBook(title);
    }
  });
}

