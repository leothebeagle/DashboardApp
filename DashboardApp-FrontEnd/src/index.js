//  document.addEventListener('DOMContentLoaded', (event) => {
   
class Quote {
    constructor(author, content) {
        this.author = author;
        this.content = content;
    }
}

const quoteButton = document.querySelector("#rndm-quote-btn");
const eventButton = document.querySelector("#create-event-btn");
const randomQuoteCardContent = document.querySelector(".random-quote-card .quote-card-content")


function retrieveRandomQuote() {
    fetch("http://localhost:3000/quotes/random")
        .then((response) => response.json())
        .then(function(json) {
            let quote = new Quote(json[0].author, json[0].content);
            randomQuoteCardContent.innerHTML =  `"${quote.content} "` + " - " + quote.author
        })
}

quoteButton.addEventListener("click", retrieveRandomQuote)

eventButton.addEventListener("click", function(event) {
    event.preventDefault();
    console.log("i fired because the button was clicked!")
})


// });


// Could the problem be in the way the form and the button are set up? because its a submit button? or is it got something to
// with the form's default behavior that we should override?
