# DashboardApp

Welcome to DashboardApp, a Single Page Application that'll make your life more efficient and streamlined. 

The application allows you to create workspaces, add events to them, and if you're in need of a little motivation or perspective, there's a quote generator for some wise words. 

The front-end is built in HTML, CSS and JS and implements JS object oriented concepts. 

The back-end is built using Rails as an API, and serves JSON responses to requests made by the front-end. 

This application is a project I built for Flatiron's Online Web Developer Program and the requirements are listed below:


1. The application must be an HTML, CSS, and JavaScript frontend with a Rails API backend. All interactions between the client and the server must be handled asynchronously (AJAX) and use JSON as the communication format.

2. The JavaScript application must use Object Oriented JavaScript (classes) to encapsulate related data and behavior.

3. The domain model served by the Rails backend must include a resource with at least one has-many relationship. For example, if you were building an Instagram clone, you might display a list of photos with associated comments.

4. The backend and frontend must collaborate to demonstrate Client-Server Communication. Your application should have at least 3 AJAX calls, covering at least 2 of Create, Read, Update, and Delete (CRUD). Your client-side JavaScript code must use `fetch` with the appropriate HTTP verb, and your Rails API should use RESTful conventions.

#### JavaScript

- [ ] Use classes and functions to organize your code into reusable pieces.
- [ ] Translate JSON responses into JavaScript model objects using ES6 class or constructor function syntax.
- [ ] Use ES6 features when appropriate (e.g. arrow functions, `let` & `const`, rest and spread syntax).

#### Rails

- [ ] Follow Rails MVC and RESTful conventions. That means, for example, that a request `GET /puppies` ought to be handled by the `PuppiesController`, fetch puppies from the database using a `Puppy` Active Record model, and return a list of puppies as JSON.
- [ ] Well-named variables and methods
- [ ] Short, single-purpose methods

#### Git

- [ ] Aim for a large number of small commits - commit frequently!
- [ ] Add meaningful messages to your commits. When you look back at your commits with `git log`, the messages should describe each change.
- [ ] Don't include changes in a commit that aren't related to the commit message.

