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






