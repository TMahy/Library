
const myLibrary = [];

const booksContainer = document.getElementById('books-container');
const formBook = document.getElementById('form-book');

formBook.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = new FormData(formBook);
    let values = [...formData.entries()];

    addBookToLibrary(...values.map(val => val[1]));
    displayLibrary();

    formBook.reset();
    closeForm();
})


class Book{
    constructor(title, author, pages, read = false){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function(){
        return `${title} by ${author}, ${pages} pages, ${read ? 'read' : 'not read yet'}`
    }
}}

function addBookToLibrary(title, author, pages, read){
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook);
}

function displayLibrary(){
    //Clears the existing books in the list before adding the library again. 
    while(booksContainer.firstChild){
        booksContainer.firstChild.remove();
    }

    myLibrary.forEach(book => {
        let bookDiv = document.createElement('div');
        let titleDiv = document.createElement('div');
        let authorDiv = document.createElement('div');
        let pagesDiv = document.createElement('div');
        let btnRead = document.createElement('button');
        let btnRemove = document.createElement('button');

        bookDiv.setAttribute('class', 'book');
        bookDiv.dataset.index = myLibrary.indexOf(book);

        titleDiv.setAttribute('class', 'book-title');
        titleDiv.textContent = book.title;

        authorDiv.setAttribute('class', 'book-author');
        authorDiv.textContent = book.author;

        pagesDiv.setAttribute('class', 'book-pages');
        pagesDiv.textContent = book.pages;

        btnRead.setAttribute('class', 'btn btn-read');
        if(book.read){
            btnRead.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
            btnRead.style.color = '#4CAF50';
        }else if(!book.read){
            btnRead.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
            btnRead.style.color = '#f44336';
        }
        btnRead.addEventListener('click', ()=>{
            book.read = !book.read;
            displayLibrary();
        })
        
        btnRemove.setAttribute('class', 'btn btn-remove');
        btnRemove.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        btnRemove.addEventListener('click', ()=>{
            myLibrary.splice(myLibrary.indexOf(book), 1);
            displayLibrary();
        })

        bookDiv.appendChild(titleDiv);
        bookDiv.appendChild(authorDiv);
        bookDiv.appendChild(pagesDiv);
        bookDiv.appendChild(btnRead);
        bookDiv.appendChild(btnRemove);
        booksContainer.appendChild(bookDiv);
})}

function openForm() {
    document.getElementById("form-container").style.display = "inline";
}
      
function closeForm() {
        document.getElementById("form-container").style.display = "none";
}


addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 208, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, true);
addBookToLibrary('The Catcher in the Rye', 'J. D. Salinger', 234, false);
addBookToLibrary('Don Quixote', 'Miguel de Cervantes', 1072, false);
addBookToLibrary('Mr. Tickle', 'Roger Hargreaves', 36, true);

displayLibrary()

