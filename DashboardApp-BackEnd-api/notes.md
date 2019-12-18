The first thing im going to build for this dashboard is the quotes feature. The goal is to have a place on my page that displays quotes. There will be a button near the quote, that when you click will make an asynchronous request to the server and display a new quote. 

will be using FETCH to send and receive asynchronous requests.
this will be a get request to quotes/random
this will route to the quotes controller and the random action.
the random action will pull up a random quote, then send it as JSON response
the front end will receive the front end response and then display the quote. (this will be visited in more detail)

Steps to stitch this feature together:

Backend:
[x] Quote model 
[x] Quote controller with an action called random
[x] A route for random that directs to the random action in the quotes controller
[x] The random action should make a call to the model
[x] Action should receive a response back from the model and that should be rendered as a json response. 
[x] Quote model has a method that'll actually pull out the random quote

So effectively, just visiting the url quotes/random in your browser should result in a json response with one random quote formatted nicely. 

Frontend:
    objective: a part of the page that displays quotes.

[x] Have a div for a quote container. this is where everything quote related should live. Considering this is a quotes widget afterall.
[x] Write out your HTML for where the quote content will be and give it a class to style later
[x] need a button
[x] JS object for QUOTE. each quote that gets pulled from the DB will be made into a JS object, which you can then use throughout your frontend as an object. 
[x] need to place an event listener on the button in your js file. 
[x] on click, a cascade of events will happen
    [x] FETCH. URL is the local host one for quotes/random.
    [x] will receive back a json response.
    [x] Should create a JS object from the JSON response. (as a test console log. you want fast iterations basically)
    [x] update the inner HTML of the quote content element using what was sent back in the JSON. 
    
    We dont actually have to create any new elements. we're not listing things or displaying many objects. 


Ok, so next up lets build out the part of our app that will implement the CRUD features we want.
This feature is a productivity tool that I designed. you can create three events. each event will also have many resources that belong to it. 

Backend:


[x] Create the necessary rails backend models, controllers for: Event and Resource
[] Create routes and controller actions
    [] create and delete. events/create and events/delete

All data communication is going to happen in JSON. How does a Rails controller action deal with the JSON being sent to it
from the frontend? Basically if the json is formatted with a content-header set to "app/json" rails will automatically
convert the JSON it receives into a params hash, that you can access as you would normally. params etc. https://guides.rubyonrails.org/action_controller_overview.html#json-parameters


[] 
[] 
[] 
[] 

Frontend:
https://learn.co/tracks/full-stack-web-development-v8/module-14-front-end-web-programming-in-javascript/section-4-communication-with-the-server/sending-data-with-fetch-lab

[x] You need a form for creating new events. 
[] Override the form's default behavior and use FETCH instead of native ability to POST.
    [x] Place an event listener on the button.
    [x] Prevent default behavior of the form.
    [] Access the data in the form.
    [] Validate the data that was input.
    [] format the data into JSON
    [] If its all correct, then send that data using fetch to the appropriate url. also with the appropriate headers and json format.
    [] Handle the response that's sent back from the server. was it successfully created? was it successfully deleted?


One way to access the form data after overriding its default behavior:

- identify the form with a queryselector and set it to a variable. 
- once that's done you can now refer to the form as a whole.
- you can access the elements in the form, meaning its input fields, in a similar
  manner to how we access values in objects. by using the [] and the input name that we set when making the form.
- so in our app i selected the form and set it to a variable. then in order to acess the values in the input fields:
    access them this way: form["event-title"].value

Once you get the json back:

[] turn JSON back into objects
[] inject that information into the page. so you'll need to create new HTML elements and append them to the page pretty much. 


Do you just build everything then refactor? or do you incrementally go ahead? one step at a time?
general idea, then details one -> two steps at a time. Ok so just for fun....go ahead and built it in a giant heap then try to refactor. Yoi'll then know for sure which route you prefer. brain dump or baby steps?


The event listener on the add event button will certainly need to be refactored. 

------REORGANIZE----

After some thinking, I would also like to reorganize the associations in the Rails models.
I'd like to add a new model called Workspace. 

The idea is that, when you land on the page you're gonna get asked if you'd like to 
start a new workspace? or just choose from a previous one. This is likely going to be achieved by implementing a pop up form.
https://www.w3schools.com/howto/howto_js_popup_form.asp

 To start a new one all you need to do is name it, and then a blank new workspace will start. So the page you are viewing is the workspace. and anything on it, will be associated to it either directly or indirectly. 

A workspace has_many events.
An event belongs_to a workspace.
An event has_many resources
A resource belongs-to an event. 

can you say that a workspace has_many resources through events? do we need join tables?




