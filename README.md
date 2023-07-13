# Pricing Cards

This **README** file contains some of the decisions & limitations I decided to made during the implementation of the assignment
I have decided to create a vanilla js app that contains no packages else than node js applicable and vanilla js for the UI.
Also we will not use any database or complex / ready systems to store the data, we will just try to achieve our purposes using a file to store data

## Tech stack

-   The application was created using NodeJS (v18) and ExpressJS framework

-   Apart from the ExpressJS the following middlewares were used from developed from Express team:

    -   cookie-parser
    -   cors
    -   morgan
    -   helmet

-   For unit testing and endpoint simulation tests we have utilized Jest & supertest

-   To ensure Code Quality and prevent errors we have used:

    -   Typescript for compilation
    -   Eslint
    -   Prettier for the formatting
    -   Husky as git hooks to check the formmating (optional)

-   A simple Dockerfile was created to build and execute the application

## Application execution

To run the application a docker run (after we build the image) can be run as follows:
`docker run -p 5000:5000 --rm -it $(docker build -q .)`

## Structure

.<br />
├── controllers<br />
│   ├── pricing.ts<br />
│   └── redirect.ts<br />
├── domain<br />
│   └── pages-info.ts<br />
├── handlers<br />
│   ├── error-handlers.ts<br />
│   ├── find-pages-handler.ts<br />
│   └── session-handler.ts<br />
├── index.ts<br />
├── pages<br />
│   ├── admin<br />
│   │   └── index.html<br />
│   ├── blog<br />
│   │   ├── 2-column<br />
│   │   │   └── index.html<br />
│   │   ├── 3-column<br />
│   │   │   └── index.html<br />
│   │   └── index.html<br />
│   ├── guides<br />
│   │   └── index.html<br />
│   ├── internal-server-error<br />
│   │   └── internal-server-error.html<br />
│   ├── not-found<br />
│   │   └── not-found.html<br />
│   ├── pricing<br />
│   │   ├── control.html<br />
│   │   └── variant1.html<br />
│   └── select-page<br />
│   └── index.html<br />
├── public<br />
│   ├── images<br />
│   │   ├── check.png<br />
│   │   └── dropdown.png<br />
│   ├── javascripts<br />
│   │   ├── components<br />
│   │   │   ├── features-component.js<br />
│   │   │   ├── features.js<br />
│   │   │   ├── select-component.js<br />
│   │   │   └── selections.js<br />
│   │   └── pages<br />
│   │   ├── control.js<br />
│   │   ├── login.js<br />
│   │   ├── select-page.js<br />
│   │   └── variant1.js<br />
│   └── stylesheets<br />
│   ├── components<br />
│   │   ├── agencies-component.css<br />
│   │   ├── features-component.css<br />
│   │   ├── pricing-component.css<br />
│   │   └── select-component.css<br />
│   ├── pages<br />
│   │   ├── control.css<br />
│   │   ├── login.css<br />
│   │   ├── select-page.css<br />
│   │   └── variant1.css<br />
│   └── styles.css<br />
└── routes<br />
├── index.ts<br />
└── static-routes.ts<br />

## Approach

### General approach

-   Find dynamically the pages inside the `/pages` directory:

    -   In order to serve the html files inside the directories of `pages` we have utilized the bundled nodejs:fs.
    -   We recursively check each directory and sub-directory and we identify directories with an `index.html` file inside.
    -   These directories will be considered valid and the subdirectories will be handled as a route path.
    -   For example in `/blog` directory we have created a folder named `2-column` with an `index.html` file. This path will be served at `SERVER_ROOT/blog/2-column` and the `blog` at `SERVER_ROOT/blog`

-   Create the `control.html` and `variant1.html`. Folowing the design we have created the two variations and try to modularize as much as possible in vanilla js the common components.

-   App rotation between `control.html` and `variant1.html` in `/pricing` ensuring 50% split of the users for each page:

    -   The approach here was rather simple. Our application will store in memory the total number of users visited the application.
    -   If the next user will be of odd number then the `control.html` page will be served else if the number is even the `variant1.html` will be served
    -   The class responsible for session management is a Singleton one so we should ensure that from anywhere this number will be the same
    -   In case of a server restart or deploy, we also store the total users number in a file using the `node:fs` package. At initialization if the file exists we continue the application from the point we have left

-   To ensure that a user will be served the same page even after refreshing the page:

    -   A cookie was created to hold the value of the served page. The cookie does not have an expiration date.
    -   The **Caveat** here is that if the user clears the cookies he will be treated as a new one. The only way I can think of to avoid it is a login process, that we decided not to have with a database and so on

-   For debugging / development purposes we have created an `/admin` endpoint so that an admin user can access whatever page he wants without the 50% split rule. In order to do it:

    -   We have created a simple username password form with the following credentials:
        `username=admin`
        `password=admin`

    -   After the login the user will be redirected to the `/redirect` endpoint with a cookie named as `admin=true` lasting for `1-hour`.

    -   In the redirect page the admin selects the variation he wants and the relative page loads

    -   The `/redirect` endpoint is protected so if a user tries to access it without the cookie he will be seved the `/pricing` endpoint

### Code structure

-   controllers: The controllers contain the code executed when an endpoint is requested
-   domain: We do not have an actual domain on this app but the control / variant values could be stored there
-   handlers: The handlers contain utility functions and middlewares for HTTP requests
-   pages: Contains all the HTML files
-   public: Contains all the JS files run on browser and CSS files
-   routes: Contains the declaration of the endpoints
-   tests: Contains all the Jest tests that we have created to validate the core functions
