// --------------------- Variables ----------------

const workspaceForm = document.querySelector("#new-workspace-form");
const quoteButton = document.querySelector("#rndm-quote-btn");
const eventButton = document.querySelector("#create-event-btn");
const randomQuoteCardContent = document.querySelector(".random-quote-card .quote-card-content");
const eventAndResourcesForm = document.querySelector("#event-resources-form");
const workspaceTitleElement = document.querySelector("#workspace-title-display")
let workspaceObjects = [];

let currentWorkspace;

// -------------------------- Classes ------------------------
class Quote {
    constructor(author, content) {
        this.author = author;
        this.content = content;
    }
};

class Workspace {
    constructor(workspaceJSON) {
        this.id = workspaceJSON.id;
        this.name = workspaceJSON.name;
        this.events = workspaceJSON.events;
    };
};

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
};

function displayWorkspace(workspaceObject) {
    // code to create HTML element(s) with workspaces data goes here. 
    const workspace = workspaceObject;
    console.log(workspaceObject);
    return workspace; 
};

function createWorkSpaceObject(workspaceJSON) {
    const newWorkspace = new Workspace(workspaceJSON);
    console.log(newWorkspace)
    // workspaceObjects.push(newWorkspace);
    // displayWorkspace(newWorkspace);
    // workspaceForm.reset();
    let workspace = document.createElement('div');
    workspace.className = 'workspace-card';
    workspace.innerHTML = `
    <div id="${newWorkspace.id}">${newWorkspace.name}</div>
    `
    // console.log(workspace);
    let workspaceContainer = document.querySelector('.workspaces-deck-display')
    // console.log(workspaceContainer)
    workspaceContainer.append(workspace);
};  



function postWorkspace(formData) {
        // console.log(formData)
    fetch("http://localhost:3000/workspaces", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
        },
        body: JSON.stringify({
            // we are converting the json below into a string so it can be transported.
            // "workspace": formData.name.value
            // the format below is exactly what will be received in params. 
            workspace: { 
                name: formData.name.value
            }
        })
        })
    .then(response => response.json())
    .then(function(json){
        createWorkSpaceObject(json)
    })
};

function createAllWorkspaceObjects(json) {
   json.forEach(createWorkSpaceObject)
//    json[0] => represents a workspace and its associated events. we want to convert this into an object.
//    json[0].events => the workspace's events array. you can iterate over this.
};

function retrieveWorkspaces() {
    configurationObject = {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
    }

    fetch("http://localhost:3000/workspaces", configurationObject) 
        .then( response => response.json() ) 
        .then(function(json) {
            console.log(json)
            // createAllWorkspaceObjects(json)
        }) 
}

// --------------------------- EVENT LISTENERS -----------------------------------------------------------------

workspaceForm.addEventListener("submit", event => {
    event.preventDefault();
    postWorkspace(event.target);
});         

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

// -----------------------------------------------------------------------------------------------------------------




//  document.addEventListener('DOMContentLoaded', (event) => {
// });


// function postToy(toy_data) {
//     fetch('http://localhost:3000/toys', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: "application/json"
//         },
//         body: JSON.stringify({
//           "name": toy_data.name.value,
//           "image": toy_data.image.value,
//           "likes": 0
  
//         })
//       })
//       .then(res => res.json())
//       .then((obj_toy) => {
//         let new_toy = renderToys(obj_toy)
//         divCollect.append(new_toy)
//       })
//   }


