class Quote {
    constructor(author, content) {
        this.author = author;
        this.content = content;
    }
}

const quoteButton = document.querySelector("#rndm-quote-btn");
const randomQuoteCardContent = document.querySelector(".random-quote-card .quote-card-content")

quoteButton.addEventListener("click", retrieveRandomQuote)

function retrieveRandomQuote() {
    fetch("http://localhost:3000/quotes/random")
        .then((response) => response.json())
        .then(function(json) {
            let quote = new Quote(json[0].author, json[0].content);
            randomQuoteCardContent.innerHTML =  `"${quote.content} "` + " - " + quote.author
        })
}