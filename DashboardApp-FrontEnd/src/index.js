// --------------------- Variables ----------------
const workspaceButton = document.querySelector("#create-workspace-btn")
const workspaceForm = document.querySelector("#new-workspace-form")
const quoteButton = document.querySelector("#rndm-quote-btn");
const eventButton = document.querySelector("#create-event-btn");
const randomQuoteCardContent = document.querySelector(".random-quote-card .quote-card-content")
const eventAndResourcesForm = document.querySelector("#event-resources-form") 
// -------------------------- Classes ------------------------
class Quote {
    constructor(author, content) {
        this.author = author;
        this.content = content;
    }
}

// ------------------------- Functions -----------------------------

function retrieveRandomQuote() {
    fetch("http://localhost:3000/quotes/random")
        .then((response) => response.json())
        .then(function(json) {
            let quote = new Quote(json[0].author, json[0].content);
            randomQuoteCardContent.innerHTML =  `"${quote.content} "` + " - " + quote.author
            // what you could do here to refactor is actually keep this functions job to strictly retrieving the data and setting it
            // to a variable
            // you can then call another function whose job it is to inject HTML into the specified area.
        })
}

function createWorkspace(formData) {
    // I want this to be an assembler function that'll invoke the appropriate functions.
}


// --------------------------- EVENT LISTENERS -----------------------------------------------------------------

workspaceButton.addEventListener("click", function(event){
    console.log("hi")
})

quoteButton.addEventListener("click", retrieveRandomQuote)

eventButton.addEventListener("click", function(event) {
    event.preventDefault();
    
    configurationObject = {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify({
            "event-title":eventAndResourcesForm["event-title"].value,
            "suggested-time":eventAndResourcesForm["suggested-time"].value,
            "url":eventAndResourcesForm["url"].value,
            "resource-name":eventAndResourcesForm["resource-name"].value,
            "resource-description":eventAndResourcesForm["resource-description"].value
        })
    };

    fetch("http://localhost:3000/events", configurationObject)
        .then(response => response.json())
        .then(json => console.log(json))
})




//  document.addEventListener('DOMContentLoaded', (event) => {
// });