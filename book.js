const library = [];
function addBook() {
    const popupInfo = document.querySelectorAll(".book-info");
    const title = popupInfo[0].value;
    const author = popupInfo[1].value;
    const pages = popupInfo[2].value;
    const read = popupInfo[3].checked;
    console.log(title);
    popupInfo[0].value = "";
    popupInfo[1].value = "";
    popupInfo[2].value = "";
    popupInfo[3].checked = false;
    library.push(new Book(title, author, pages, read));
    console.log("added");
    console.log(library);
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
        const author = document.createElement("p");
        author.textContent = i.author;
        const pages = document.createElement("p");
        pages.textContent = i.pages;
        const read = document.createElement("button");
        read.addEventListener("click", () => {
            changeRead(read);
        });
        const remove = document.createElement("button");
        remove.addEventListener("click", (bookToRemove => () => {
            removeBook(bookToRemove, library);
        })(i));
        remove.className = "remove-book";
        remove.textContent = "Remove";
        read.textContent = i.isRead;
        if (i.isRead === "Read")
            read.className = "read";
        else
            read.className = "not-read";
        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(pages);
        book.appendChild(read);
        book.appendChild(remove);
        container.appendChild(book);
    }
}

function changeRead(button) {
    if (button.textContent == "Not Read") {
        button.textContent = "Read";
        button.className = "read";
    } else {
        button.textContent = "Not Read";
        button.className = "not-read";
    }

}

function removeBook(book, library) {
    library.splice(library.indexOf(book), 1);
    displayBooks();
}

function findBook(bookA, bookB) {
    console.log(bookA);
    console.log(bookB);
    console.log(
        bookA.title === bookB.title && 
    bookA.author === bookB.author &&
    bookA.pages === bookB.pages &&
    bookA.isRead === bookB.isRead
    );
    return bookA.title === bookB.title && 
    bookA.author === bookB.author &&
    bookA.pages === bookB.pages &&
    bookA.isRead === bookB.isRead;
}

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    if (isRead)
        this.isRead = "Read";
    else 
        this.isRead = "Not Read"
    // this.isRead = isRead;
    this.info = () => {
        if (isRead)
            return `${this.title} by ${this.author}, ${this.pages} pages, read`;
        return `${this.title} by ${this.author}, ${this.pages} pages, not read`;
    }
}