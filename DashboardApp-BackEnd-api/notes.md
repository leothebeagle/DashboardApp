The first thing im going to build for this dashboard is the quotes feature. The goal is to have a place on my page that displays quotes. There will be a button near the quote, that when you click will make an asynchronous request to the server and display a new quote. 

will be using FETCH to send and receive asynchronous requests.
this will be a get request to quotes/random
this will route to the quotes controller and the random action.
the random action will pull up a random quote, then send it as JSON response
the front end will receive the front end response and then display the quote. (this will be visited in more detail)

