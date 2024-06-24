const library = [];
function addBook() {
    const popupInfo = document.querySelectorAll(".book-info");
    const title = popupInfo[0].value;
    const author = popupInfo[1].value;
    const pages = popupInfo[2].value;
    const read = popupInfo[3].checked;
    popupInfo[0].value = "";
    popupInfo[1].value = "";
    popupInfo[2].value = "";
    popupInfo[3].checked = false;
    console.log(title, author, pages, read);
    library.push(new Book(title, author, pages, read));
}

function displayBooks() {
    const container = document.getElementsByClassName("book-container")[0];
    while (container.lastChild)
        container.removeChild(container.lastChild);
    for (i of library) {
        const book = document.createElement("div");
        book.className = "book";
        const title = document.createElement("p");
        title.textContent = i.title;
        title.className = "book-text";
        const author = document.createElement("p");
        author.textContent = i.author;
        author.className = "book-text";
        const pages = document.createElement("p");
        pages.textContent = i.pages;
        pages.className = "book-text";
        const read = document.createElement("button");
        read.classList.add("book-button");
        read.addEventListener("click", ((book, button) => () => {
            changeRead(book, button);
        })(i, read));
        const remove = document.createElement("button");
        remove.addEventListener("click", (bookToRemove => () => {
            removeBook(bookToRemove, library);
        })(i));
        remove.classList.add("remove-book");
        remove.classList.add("book-button");
        remove.textContent = "Remove";
        if (i.isRead)
            read.textContent = "Read";
        else 
            read.textContent = "Not Read" 
        if (i.isRead)
            read.classList.add("read");
        else
            read.classList.add("not-read");
        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(pages);
        book.appendChild(read);
        book.appendChild(remove);
        container.appendChild(book);
        console.log(container.children);
        console.log(container);
    }
}

function changeRead(book, button) {
    if (!book.isRead) {
        button.textContent = "Read";
        button.classList.remove("not-read");
        button.classList.add("read");
    } else {
        button.textContent = "Not Read";
        button.classList.remove("read");
        button.classList.add("not-read");
        button.className = "not-read";
    }
    book.isRead = !book.isRead;
    // console.log(book.isRead);
}

function removeBook(book, library) {
    library.splice(library.indexOf(book), 1);
    displayBooks();
}

function findBook(bookA, bookB) {
    return bookA.title === bookB.title && 
    bookA.author === bookB.author &&
    bookA.pages === bookB.pages &&
    bookA.isRead === bookB.isRead;
}

class Book {
    constructor (title, author, pages, isRead) {
        this._title = title;
        this._author = author;
        this._pages = pages;
        this._isRead = isRead;

    }
    get info() {
        return this.info;
    }
    #updateInfo() {
        if (isRead)
            this.info = `${this.title} by ${this.author}, ${this.pages} pages, read`;
        else 
            this.info = `${this.title} by ${this.author}, ${this.pages} pages, not read`;
    }
    get title() {
        return this._title;
    }
    get author() {
        return this._author;
    }
    get pages() {
        return this._pages;
    }
    get isRead() {
        return this._isRead;
    }
    set title(val) {
        this._title = val;
        this.#updateInfo();
    }
    set author(val) {
        this._author = val;
        this.#updateInfo();
    }
    set pages(val) {
        this._pages = val;
        this.#updateInfo();
    }
    set isRead(val) {
        this._isRead = val;
        this.#updateInfo();
    }

}