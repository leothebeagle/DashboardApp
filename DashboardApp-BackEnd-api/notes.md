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

All data communication is going to happen in JSON (not entirley correct, everything gets converted to JSON right?). How does a Rails controller action deal with the JSON being sent to it
from the frontend? Basically if the json is formatted with a content-header set to "app/json" rails will automatically
convert the JSON it receives into a params hash, that you can access as you would normally. params etc. https://guides.rubyonrails.org/action_controller_overview.html#json-parameters
 
Frontend:
https://learn.co/tracks/full-stack-web-development-v8/module-14-front-end-web-programming-in-javascript/section-4-communication-with-the-server/sending-data-with-fetch-lab


One way to access the form data after overriding its default behavior:

- identify the form with a queryselector and set it to a variable. 
- once that's done you can now refer to the form as a whole.
- you can access the elements in the form, meaning its input fields, in a similar
  manner to how we access values in objects. by using the [] and the input name that we set when making the form.
- so in our app i selected the form and set it to a variable. then in order to acess the values in the input fields:
    access them this way: form["event-title"].value

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


The above is all my attempt to map EVERYTHING out beforehand. eres muy comodo mi hijo. 
Below is me implementing a different approach to code. Think no more than two steps ahead and complete those with integrity.
The next steps will reveal themselves. 

[x] Make sure that associations work. 

Front-End:
[x] Create a form to create a new workspace. 
    [x] stub out the HTML for the form in index.html
    [x] identify the elements you need with query selector.
    [x] add an event listener on the event you need. 
        the event listener is on form submit. 
    [x] Define functions to handle the signalling cascade that's about to happen. the event listener invokes a cb function. 
        [x] post workspace function.
    
        ** At this point you can also start working on the backend controller actions that'll
        receive the POST request and send back a response. you are stitching the two together. 
        ** below is when you come back to the front end to stitch. 

[x] Write a Workspace class.
[x] In fetch response handling area, call function that instantiates a JS workspace object.
[x] The function that instantiates a workspace, should also set the current workspace to it, by calling another function.
** ended here. start off with a new sprint. 


Back-End:
    [x] Write the appropriate controller action and inspect what its receiving. this is a test
        we are posting to http://localhost:3000/workspaces
    [x] use the incoming data to create a new workspace object.
    <!-- # what data do we need from params? 
        # you can access the name in two ways:  params["name"]
        # or params["workspace"]["name"]
        # ill go for the second option. more descriptive and it promises to be more organized.  -->
    [x] render that object as json. (now jump to the frontend to stitch back)


    When you receive a response back from the server you need to convert it into JSON. 
    So that means that data isnt transferred between front and back as JSON. 
    
     

        

The point im working on now is the configuration object and how to set up the body so that its sent in an organized manner to the controller action. 
I also want to make sure that the rendered JSON also looks right.

so basically, in the body of the configuration object, set up the object you're sending in the exact same format that you want it to appear in params. and then your params will be organized how you set it. 

Now look at how this looks when it gets rendered and returned back to the fetch. this is the data structure youre going to be using to create the JS object. 




Future tweaks:

- could give the new workspace form the ability to create events and resources from the get go. Could be a sort of hidden feature?

Front-End:
[x] display the workspace name as a header once a new workspace is created.
    [x] write html to have a specified card for header and a div within it for the title. 
    [x] define a variable that'll grab the specified html title element. 
    [x] JS function that doesnt take in anything as an argument. it simply creates the header based
    on whatever is set as the current workspace.
        [x] create a new header element.
        [x] populate the header element's inner HTML.
        [x] append the newly created element to the header card >  workspace-title-display
    ** at this point i discovered an error. which was that the workspace object that was being created was kind of off. see below for an explanation of the error. but the solution is to now change the class definition for Workspace so that it accepts JSON, parses through it, and then sets attributes accordingly. I want to include id as an attribute in the JS object that reflects the id given in the DB. this is essential to CRUD. 
[x] change the class definition of workspace to accept JSON as its argument.

[x] reset the form. so simple. just call reset on the form and itll reset the form.

Back-End:
[] Chill untill its time to deal with events and resources. 

**something seems to be off with the way the JS workspace object attributes are organized. solved it.
My mistake was that i was trying to create a new workspace object and passing in the entire JSON as an argument. if you look closesly at the class definition, you'll see that whatever you pass in as an argument will be set as a name. 

How about you rewerite the class definition for workspace to accept JSON as an argument and build its object that way. 


-------------------------------------------------------------------------------------------------------------------------------------

What do we have so far?

- the ability to create a new workspace. front to back. complete. 
- the ability to generate random quotes. 
- we have a form for creating a new event and a new resource. its static. not super nice. 
- so far we dont have any functions that deal with events or resources. 
- there's an event listener at the moment that handles the event and resource form, but not in such a nice way. It can certainly be improved. 
- so far there's also no conditional logic....which means that it's not super interactive atm. 

errata:

- currently, if you add a new workspace the title gets added on to the existing title. it doesnt replace it. should be an easy fix. 


For me the question right now, is do i go ahead and build out all of the website even if it is preliminary? 

or do i perfect just one of the forms like workspace. and then know that ill be able to implement them in other resources?

coding sprint

Front-End:
[x] fix the issue with workspaces title. 
    [x] remove child before appending. 

    *would it be better to have a fixed html place and then just change inner HTML instead of the 
    added step of removing a child element before appending a new one to it? I mean...they're both achieving the same thing. 
    Its working now...so dont change it. Just know, that if you wanted to chage the way it was implemented, you could.
    


Back-End:

------------------------------------------------------------------------------------------------------------------------


Change of plans....seems like i'm overcomplicating things and i want to simplify. So im going to get rid of the Resource model.

The app is very simple now. The top of the site will display a random quote. 

The rest of the page will be a variety of cards. meaning you will display every single workspace.
Each card displays the name of the workspace and the first two events you need to complete. 
Each card has a button to delete the workspace. 
each card will have a button that allows you to create a new event that's associated with the workspace. 
Each card will also have a button that'll display a list of all events for the workspace. 
In the list of events you'll be able to delete the individual events. 
the above two should be in the form of a pop up. (youre going to learn how to display a pop up and also make it go away)

first things first...start off a new branch, and then start there.

Back-end:

[x] Delete all traces of Resource model. model, controller, routes, tables, and migrations.
[] 





Front-end:
[x] get rid of workspace header
    [x] keep the new workspace form. This will later be behind a button which will pop up the form.
    [x] get rid of the resources part of the event form.
        ** the forms are all going to be behind a button. they'll pop up. the code for them works for now. 
[] we need the ability to pull up all available workspaces and display them.
    ** on page load we need to invoke a function that calls the db and requests a list of all the workspaces and their related events. the data we get back should look like:
    { workspace: {name: "koshary factory"}, events: {1:{name: "chop onions", suggested_time: "60 min"}}}
    
    1: {
        workspace: {
            name:"koshary factory",
        },
        events: {
            1: {
                name: "chop onions",
                suggested-time: "15 min"
            },
            2: {
                name: "Boil lentils",
                suggested-time: "20 min"
            },
            3: {
                name: "wash rice",
                suggested-time: "7 min"
            }
        }
    }
[] how do we tell the computer we want it to pull up the workspaces?(our interface)
    [] on page load, call a function that:
    [] runs through a FETCH. 
        [] 
[] How do we tell the computer we want to pull up all events for a workspace?    
click a button in the workspace card and a pop up comes up displaying a list of all the events, and gives you the ability to delete or add an event.
    
    