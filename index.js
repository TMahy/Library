
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

// booksContainer.addEventListener('click', (e)=>{
//     if(e.target.classList.contains('btn-read')){
//         console.log(`read: ${myLibrary[e.target.parentElement.dataset.index].title}, ${myLibrary[e.target.parentElement.dataset.index].read}`)
//         e.target.innerHTML.replace(myLibrary[e.target.parentElement.dataset.index].toggleRead() ? `<i class="fa-solid fa-circle-check"></i>` : `<i class="fa-solid fa-circle-xmark"></i>`);
//         console.log(`${myLibrary[e.target.parentElement.dataset.index].read}`);
//     }

//     if(e.target.classList.contains('btn-remove')){
//         console.log(`remove: ${myLibrary[e.target.parentElement.dataset.index].title}`)
//         myLibrary.splice(e.target.parentElement.dataset.index, 1);
//         displayLibrary();
//     }
// })


class Book{
    constructor(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function(){
        return `${title} by ${author}, ${pages} pages, ${read ? 'read' : 'not read yet'}`
    }
    // this.toggleRead = function(){
    //     read = read ? false : true;
    //     console.log(read);
    //     return read;
    // }
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
    document.getElementById('btn-add-book').style.display = 'none';
}
      
function closeForm() {
        document.getElementById("form-container").style.display = "none";
        document.getElementById('btn-add-book').style.display = 'inline';
}

addBookToLibrary('Book 1', 'Author1', 100, true);
addBookToLibrary('Book 2', 'Author2', 200, true);
addBookToLibrary('A third book', 'Author Third', 300, false);
addBookToLibrary('Book: Fourth time', 'Fourth Author', 400, false);
addBookToLibrary('Book: Five times a charm, Book: Five times a charm', 'Fourth Author', 500, true);

displayLibrary()

