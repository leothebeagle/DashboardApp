// --------------------- Variables ----------------

const workspaceForm = document.querySelector("#new-workspace-form");
const workspacesDeck = document.querySelector(".workspaces-deck");
const quoteButton = document.querySelector("#rndm-quote-btn");
const eventButton = document.querySelector("#create-event-btn");
const randomQuoteCardContent = document.querySelector(".random-quote-card .quote-card-content");
const eventAndResourcesForm = document.querySelector("#event-resources-form");
const workspaceTitleElement = document.querySelector("#workspace-title-display");
let workspaceObjects = [];

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

class Event {
    constructor(eventJSON) {
        this.id = eventJSON.id;
        this.name = eventJSON.event_title;
        this.workspaceId = eventJSON.worksapce_id; 
    };
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
};

// function displayWorkspace(workspaceObject) {
//     // code to create HTML element(s) with workspaces data goes here. 
//     const workspace = workspaceObject;
//     console.log(workspaceObject);
//     return workspace; 
// };

function createWorkspaceObject(workspaceJSON) {
    let newWorkspaceObject = new Workspace(workspaceJSON);
    return newWorkspaceObject;
};  

function createWorkspaceCard(workspaceObject) {
    const workspaceCard = document.createElement('div');
    workspaceCard.className = 'workspace-card';
    workspaceCard.id = `workspace-${workspaceObject.id}`
    
    const workspaceTitleSection = document.createElement('div');
    workspaceTitleSection.className = 'workspace-title-section';
    workspaceTitleSection.id = `workspace-${workspaceObject.id}-title`;
    workspaceTitleSection.innerHTML = `
    <h4>${workspaceObject.name}</h4>
    `
    workspaceCard.append(workspaceTitleSection);

    const workspaceEventsSection = document.createElement('div');
    workspaceEventsSection.className = 'workspace-events-section';
    workspaceEventsSection.id = `workspace-events-${workspaceObject.id}`;
    workspaceEventsSection.innerHTML = `
        <h4>Events:</h4>
        <form class="new-event-form" id="${workspaceObject.id}">
            New Event: <br>
            <input type="hidden" name="workspace" value="${workspaceObject.id}">
            <input type="text" name="name">
            <input type="text" name="time" placeholder="suggested time">
            <button class="create-event-btn" type="submit">Add Event</button>

            <ul class="event-list">
            </ul>
        </form>

    `



    workspaceCard.append(workspaceTitleSection);
    workspaceCard.append(workspaceEventsSection);
    workspacesDeck.append(workspaceCard);

};

function handleWorkspaceJSON(workspaceJSON) {
    // console.log(workspaceJSON)
    const newWorkspaceObject = createWorkspaceObject(workspaceJSON);
    // console.log(newWorkspaceObject);
    const newWorkspaceCard = createWorkspaceCard(newWorkspaceObject);
    // displayWorkspaceCard(newWorkspaceCard);
    workspaceForm.reset();
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
    .then(json => handleWorkspaceJSON(json))
};

function createEventObject(eventJSON) {
    let newEventObject = new Event(eventJSON);
    return newEventObject;
}

function createEventLi(eventObject) {
    const li = document.createElement('li');
    li.id = `${eventObject.id}`;
    return li;
}

function handleEventJSON(eventJSON) {
    // console.log(eventJSON);
    const newEventObject = createEventObject(eventJSON);
    const eventLi = createEventLi(newEventObject);
    // console.log(newEventObject);

}

function postNewEvent(formData) {
    // console.log(formData);
    // console.log(`I bubbled up from ${formData.workspace.value} event form!`);

    fetch(`http://localhost:3000/workspaces/${formData.workspace.value}/events`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
        },
        body: JSON.stringify({
            // we are converting the json below into a string so it can be transported.
            // "workspace": formData.name.value
            // the format below is exactly what will be received in params. 
            event: { 
                name: formData.name.value,
                time: formData.time.value
            },
            workspace: {
                id: formData.workspace.value
            }
        })
        })
    .then(response => response.json())
    .then(json => handleEventJSON(json))
}

// --------------------------- EVENT LISTENERS -----------------------------------------------------------------
        
quoteButton.addEventListener("click", retrieveRandomQuote);

workspaceForm.addEventListener("submit", event => {
    event.preventDefault();
    postWorkspace(event.target);
}); 

workspacesDeck.addEventListener("submit", function(event) {
    if(event.target && event.target.className == "new-event-form"){
        event.preventDefault();
        postNewEvent(event.target);
    }
})

// -----------------------------------------------------------------------------------------------------------------




//  document.addEventListener('DOMContentLoaded', (event) => {
// });

// ------------------------------------------- functions to execute on page load --------------------------------

retrieveRandomQuote();

// useful functions for event forms can be adapted to a single event form using an argument and
// a query selector in the function body

// function hideAllEventForms {
//     for (const form of eventForms) {
//         form.style.display="none"   
//     }
// };

// function displayAllEventForms {
//     for (const form of eventForms) {
//         form.style.display="block"   
//     }
// }