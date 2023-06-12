
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

booksContainer.addEventListener('click', (e)=>{
    if(e.target.classList.contains('btn-read')){
        console.log(`read: ${myLibrary[e.target.parentElement.dataset.index].title}`)
        e.target.textContent = myLibrary[e.target.parentElement.dataset.index].toggleRead()

    }

    if(e.target.classList.contains('btn-remove')){
        console.log(`remove: ${myLibrary[e.target.parentElement.dataset.index].title}`)
        myLibrary.splice(e.target.parentElement.dataset.index, 1);
        displayLibrary()
    }
})


function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function(){
        return `${title} by ${author}, ${pages} pages, ${read ? 'read' : 'not read yet'}`
    }
    this.toggleRead = function(){
        read = read ? false : true;
        console.log(read)
        return read
    }
}

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
        let btnRead = document.createElement('button');
        let btnRemove = document.createElement('button');

        bookDiv.setAttribute('class', 'book');
        bookDiv.textContent = book.info();
        bookDiv.dataset.index = myLibrary.indexOf(book);

        btnRead.setAttribute('class', 'btn btn-read');
        btnRead.textContent = book.read;
        
        btnRemove.setAttribute('class', 'btn btn-remove');
        btnRemove.textContent = 'X';

        bookDiv.appendChild(btnRead);
        bookDiv.appendChild(btnRemove);
        booksContainer.appendChild(bookDiv);
})}

function openForm() {
    document.getElementById("form-container").style.display = "inline";
    document.getElementById('btn-add-book').style.display = 'none';
}
      
function closeForm() {
        document.getElementById("form-container").style.display = "none";
        document.getElementById('btn-add-book').style.display = 'inline';
}

addBookToLibrary('Book1', 'Author1', 100, true);
addBookToLibrary('Book2', 'Author2', 100, true);
addBookToLibrary('Book3', 'Author3', 100, false);
addBookToLibrary('Book4', 'Author4', 100, false);
displayLibrary()

