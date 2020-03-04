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

    display() {
        console.log("I am a method for workspace objects, called display()")
    };
};

class Event {
    constructor(eventJSON) {
        this.id = eventJSON.id;
        this.name = eventJSON.event_title;
        this.suggestedTime = eventJSON.suggested_time
        this.workspaceId = eventJSON.workspace_id; 
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
    workspaceCard.id = `workspace-${workspaceObject.id}`;
    
    const workspaceTitleSection = document.createElement('div');
    let workspaceDeleteBtn = document.createElement('button');

    workspaceTitleSection.className = 'workspace-title-section';
    workspaceTitleSection.id = `workspace-${workspaceObject.id}-title`;
    workspaceTitleSection.innerHTML = `
    <h4>${workspaceObject.name}</h4>
    `
    workspaceDeleteBtn.className = 'workspace-delete-btn';
    workspaceDeleteBtn.id = `${workspaceObject.id}`;
    workspaceDeleteBtn.innerHTML = "Delete Workspace"
    workspaceTitleSection.append(workspaceDeleteBtn);
    
    // let workspaceEditBtn = document.createElement('button');
    // workspaceEditBtn.className = 'workspace-edit-btn';
    // workspaceEditBtn.id = `${workspaceObject.id}`;
    // workspaceEditBtn.innerHTML = "Edit Workspace"
    // workspaceTitleSection.append(workspaceEditBtn);




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
        </form>

        <ul class="event-list" id="list-${workspaceObject.id}">
        </ul>
    `

    workspaceCard.append(workspaceTitleSection);
    workspaceCard.append(workspaceEventsSection);
    return workspaceCard;
};

function displayWorkspaceCard(workspaceCard) {
    workspacesDeck.append(workspaceCard);
};

function handleNewWorkspaceJSON(workspaceJSON) {
    // console.log(workspaceJSON)
    const newWorkspaceObject = createWorkspaceObject(workspaceJSON);
    // console.log(newWorkspaceObject);
    const newWorkspaceCard = createWorkspaceCard(newWorkspaceObject);
    displayWorkspaceCard(newWorkspaceCard);
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
    .then(json => handleNewWorkspaceJSON(json))
};

function removeWorkspaceCard(deletedWorkspaceJSON) {
    let cardToDelete = document.getElementById(`workspace-${deletedWorkspaceJSON["id"]}`)
    cardToDelete.remove();
}


function deleteWorkspace(workspaceId) {
   
    fetch(`http://localhost:3000/workspaces/${workspaceId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
        },
        body: JSON.stringify({
            // we are converting the json below into a string so it can be transported.
            // "workspace": formData.name.value
            // the format below is exactly what will be received in params. 
            workspace: { 
                id: workspaceId
            }
        })
        })
    .then(response => response.json())
    .then(json => removeWorkspaceCard(json));
};

function createEventObject(eventJSON) {
    let newEventObject = new Event(eventJSON);
    return newEventObject;
};

function createEventLi(eventObject) {
    let li = document.createElement('li');
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'event-delete-btn';
    deleteBtn.id = `${eventObject.id}`;
    deleteBtn.innerHTML = 'Delete'

    li.id = `event-${eventObject.id}`;
    li.innerHTML=`${eventObject.name} - ${eventObject.suggestedTime}`;

    li.append(deleteBtn);
    return li;
};

function handleEventJSON(eventJSON) {
    let newEventObject = createEventObject(eventJSON);

    let eventLi = createEventLi(newEventObject);
    let eventList = document.getElementById(`list-${newEventObject.workspaceId}`);

    eventList.append(eventLi);
};

function postNewEvent(formData) {
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
};

function removeEventLi(deletedEventJSON) {
    let cardToDelete = document.getElementById(`event-${deletedEventJSON["id"]}`)
    cardToDelete.remove();
};

function deleteEvent(eventId) {
    fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
        },
        body: JSON.stringify({
            // we are converting the json below into a string so it can be transported.
            // "workspace": formData.name.value
            // the format below is exactly what will be received in params. 
            event: { 
                id: eventId
            }
        })
        })
    .then(response => response.json())
    .then(json => removeEventLi(json));
};

function displayWorkspaces(allWorkspacesJSON) {
    for (const dataSet of allWorkspacesJSON) {
        const newWorkspaceObject = createWorkspaceObject(dataSet);
        const newWorkspaceCard = createWorkspaceCard(newWorkspaceObject);
        displayWorkspaceCard(newWorkspaceCard);

        for(const event of dataSet["events"]) {
            handleEventJSON(event);
        }
    
    };
};

function retrieveWorkspaces() {
    fetch("http://localhost:3000/workspaces", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
        }
        })
    .then((response) => response.json())
    .then(json => displayWorkspaces(json));
};

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
});

workspacesDeck.addEventListener("click", function(event) {
    if(event.target && event.target.className == "workspace-delete-btn") {
        event.preventDefault();
        deleteWorkspace(event.target.id);
    }   
});

workspacesDeck.addEventListener("click", function() {
    if(event.target && event.target.className == "event-delete-btn") {
        event.preventDefault();
        deleteEvent(event.target.id);
    };
});


// -----------------------------------------------------------------------------------------------------------------




//  document.addEventListener('DOMContentLoaded', (event) => {
// });

// ------------------------------------------- functions to execute on page load --------------------------------

retrieveRandomQuote();
retrieveWorkspaces();

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