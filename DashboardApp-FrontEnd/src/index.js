class Quote {
    constructor(author, content) {
        this.author = author;
        this.content = content;
    }
}

const quoteButton = document.querySelector("#rndm-quote-btn");

quoteButton.addEventListener("click", () => console.log("hi, im firing from inside the callback used by the event listener"))