This is merely a documentation for my future self, when one day I'll come back and see this shit pile of code, and I don't even recognize what the actual fuck was it all about. So this is only a documentation for my own self, if you happen to see it or find mistakes in it or anything worth noting, please, If you'd care, let me know. I'll be so glad to know my flaws, although I already know some of them but I am too lazy to fix them so I postponed implementing them in my newer projects.

Here we go, The Explanation of the whole project, The Task Management App using postgreSQL and ExpressJS:

1) DATABASE and MODELS

first of all, it is a task management app, a simple one of course, so the models of data I imagined before I coded them was only about USER, TASK, and TAG. since the project is using RDBMS, so each of these models is a single 'on their own' table in postgreSQL, and yeah they've got RELATIONSHIPS with each other as well.

    - each user of this app can have many tasks, but each task is only for one user! so the relationship between USER and TASK is 1-to-many relationship in terms of Database definitions.
    - each user of this app also can have many tags, but each tag is only for one user! so the relationship between USER and TAG is also a 1-to-many relationship.
    - each task of any user can have many tags which that same user created, and each tag which a user created can be assigned to many tasks of that same user! so the relationship between TASK and TAG is a many-to-many relationship.

after thinking it through, it is now time to implement it using Prisma ORM. now I don't want to explain the queries and everything else here about prisma and stuff, but only the way the models are designed is all that matters. everything else about the queries can be found in prisma's documentation as well and no need to talk about them here. dear future self, If you forgot them and you are reading this line, please get your ass to the prisma's documentation and stop being lazy. here goes the TABLE DETAILS. there are 5 tables instead of 3 in my models. each of the models have their tables as well meaning that there is a table for each USER, TASK, and TAG models. but there are 2 extra: TaskToTag table and Profile table. the Profile table is a table consisting of extra details about the user which is overally optional and user can fill it but whenever a new user is created, their profile is created with themselves too and also they both have same ID's (I coded like this, not neccesarily because there is only 1 profile assigned to a user and their 1-to-1 relationship.) on the other hand, the TaskToTag table is the intermediary between Task and Tag tables because they have many-to-many relationship and in RDBMS's you have to have these kind of tables to show this kind of relationships. you can learn about them in SQL courses if you happen to forget about them (although I don't think I'll forget about this!)

    - USER TABLE DETAILS:
        ~ id
        ~ userName
        ~ password
        ~ email
        * relationships

    - PROFILE TABLE DETAILS:
        ~ id (same as the user's ID assigned to this profile)
        ~ image
        ~ dateOfBirth
        ~ firstName
        ~ lastName
        * relationship with user

    - TASK TABLE DETAILS:
        ~ id
        ~ title
        ~ description
        ~ dueDate
        ~ status
        ~ byUser
        * relationships

    - TAG TABLE DETAILS:
        ~ id
        ~ name
        ~ byUser
        * relationships

    - TaskToTag TABLE DETAILS:
        ~ taskId
        ~ tagId
        * relationships between task and tag (make both taskId and tagId unique and "id" together with @@id([taskId, tagId]))

    besides profile table, others have 2 more rows in them named as createdAt and updatedAt which saves the time of creation and the time of any update occured to a that record. profile has only updatedAt, since the creation of it is always when the user is created and it it unnecceary to save that information.

now I think it's enough for this part, database and models are now taken care of, let's move on to the next part.

2) STRUCTURE 

this app has different parts of it's own (or folders) which do their own job and as a whole make this app work. different parts are:

    - Database
    - Controllers
    - Services
    - Providers
    - Middlewares
    - Routes
    - Public
    - App

Database folder of this project, where all the models and migrations (different versions) of it is defined is prisma folder. inside of it, there is a Schema.prisma file which everything is defined in it and has been explained above, and also there is a migration folder which has the information of all the migrations and stuff. also there's a db.js file in this project which is only a client, a communication between the database and the code, an Object, which we import it whereever we want to work with the database, specially in services since their main job is to contact with database.    

CONTROLLERs are somewhat functions, or API's, or ENDPOINTs that answer the requests that come to them, each and every one of them has a ROUTE assigned to them and a HTTP method, which the request has those info when approaching that API.

In process of answering the requests, In other words Responding, controllers only have the duty to respond with a proper response object defined for them. any other activity that helps the process of calculating or finding or querying the response, is on PROVIDERS. Providers do this in-between jobs. take Providers as a whole, one child of it is SERVICES, which only has the duty to contact with database and get the needed responses. other providers other than services, has other jobs which can be defined, like a function for hashing passwords, a single function to do this, instead of doing this directly in controllers. the reason behind it is that if you need to hash a password somewhere else you use that function (import it) anywhere you want, not just repeating yourself anywhere needed! (DRY = Don't Repeat Yourself) so it's all good to use providers.

MIDDLEWAREs are also functions, just like controllers but with the next function as a parameter in them. imagine controllers as the last middleware whereas the request object is not going to the next function anymore and instead, the response is going to be sent to the user! now before the response, before reaching that final middleware, or controller, you may need to do some stuff or check things, like authenticating or assigning a new property to the request object, or like preventing the request object from including everything that user sends (Guarding). in order to do this, we use middlewares. middlewares do the stuff which is defined in them and pass the incoming request using the next() function to the next middleware in line, until the last middleware which is our Controller, or ENDPOINT (literally), responds user with the response defined in it.

ROUTEs, as their names shows, is the paths that the Controllers answers on, like the controller is listening only in their defined path or line and only answers that line if anybody request that path, not any other path. each path or ROUTE might have their own controller, or no controller at all. the only catch here is that, to group a bunch of paths together, we use Express Router function, and use it as a global middleware and assign a path to it, meaning that all the routes to a router has a prefix path with them, which is defined as a prefix using app.use('prefix', ROUTER OBJECT). this is the way to group a bunch of related routes that all of them passes through a certain path, together.

finally, App.js is the main file of our project, everything falls into the place here, and at last, server runs, and the app works (hopefully!).

this was all about the structure of the whole app, now let's dive in to the details, starting from the first folder moving forward, but before starting, because we don't want to import/export all needed modules or other things manually from their file, every folder has an index.js file in them, which it's purpose is to gather all exportable stuff in that folder and maybe rename them or use them as they are, in other words, re-exporting them. this is for more clean procedure of importing or exporting and has nothing to do with the logic of the code. now why index? why not somethingElse.js ? because by default when you import a folder, node's going to see it's index.js by default and import everything needed from there. this can be changed by changing the "main": "index.js" in the package.json file of the project. so let's dive in:

3) DETAILS

CONTROLLERs+ROUTEs FOLDERS:

    - there are 3 files, named as User/Task/Tag Controllers here which is the API's (ENDPOINTS) of our app. these functions use neccessary services or providers from their own folder whenever they need them. now each of these API's, as I talked about before, are answering on a specific path, or ROUTE. connecting these two together happens in the routes folder. there are also 3 files, named as User/Task/Tag Routes which use Express Router object as an app, and use it's .route method to define a path for them, and use different http methods like .get or .post or .put or .patch or .delete or ... and assign the needed controller to it's designed path. in the position to add controllers, you can add like a thousand controllers to that list of parameters of that method, and they all are going to run one by one, in order! that's where the middlewares come in the scene, if a controller have the next() function in them as a parameter and uses it to pass the entire request to the next function in line, it is a middleware. so you gotta be careful, if a path needs some kind of functionality that makes us to use middlewares like authentication, we got to list them before the endpoint or the final controller in that parameter list. finally they gather together in app.js and we use the app.use() method to define these router objects as a global middleware and we can now pass a prefix to them to group all of those api's addresses together. now let's list all API's and their purposes and their methods: (yes I'm geek and I don't use postman or anything else for this project)

        * API's:

            Controller          Route                       Method          Purpose
        ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
        ‣   Register            api/user/register           /POST           a user can register themselves.
        ‣   Login               api/user/login              /POST           a user can login themselves.
    U   ‣   MyProfile           api/user/myProfile          /GET            a user can see their profile.
    S   ‣   UpdateMyProfile     api/user/myProfile          /PUT            a user can update the profile info.         
    E   ‣   UpdateUser          api/user/myProfile          /PATCH          a user can update their singup info.
    R   ‣   DeleteUser          api/user/myProfile          /DELETE         a user can delete their account here.
        ‣   GetUsers            api/user                    /GET            see all users.
        ‣   GetUserById         apu/user/:id                /GET            see a specific user.
        ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
        ‣   CreateTask          api/task/createTask         /POST           a user can create task for themselves.
    T   ‣   GetAllMyTasks       api/task/myTasks            /GET            a user can see all their created tasks.
    A   ‣   GetMySpecificTask   api/task/myTasks/:id        /GET            a user can see a specific task of their own.
    S   ‣   UpdateTask          api/task/myTasks/:id        /PUT            a user can update a specific task of their own.
    K   ‣   DeleteTask          api/task/myTasks/:id        /DELETE         a user can delete a specific task of their own.
        ‣   AddTagToTask        api/task/myTasks/:id/addTag /POST           a user can assign a tag to their own tasks.
        ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
        ‣   CreateTag           api/tag/createTag           /POST           a user can create tag for themselves.
    T   ‣   GetAllMyTags        api/tag/myTags              /GET            a user can see all their created tags.
    A   ‣   GetMySpecificTag    api/tag/myTags/:id          /GET            a user can see a specific tag of their own.
    G   ‣   UpdateTag           api/tag/myTags/:id          /PUT            a user can update their own tag name.
        ‣   DeleteTag           api/tag/myTags/:id          /DELETE         a user can delete their own tag.
        ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――

SERVICEs+PROVIDERs FOLDERS:

now let's talk about the purpose of the services folder and the providers folder. both of them, are providing something that some of the controllers need, in other words they all are Providers, but services are only for contacting database. it's worthless to talk about them in details just take a look at services, they use prisma instance in the db.js folder and all of them contains a Class, the only part of this project which is a class and uses OOP paradigm, is here in the services. those classes have methods for read/write/update/delete information in database using prisma syntax, it's all clear what they do. and finally they can be exported whenever they are needed, and there need to be an instance of them (using the new keyword) and at last, using any methods of them is possible. just take a look it's not a big deal.

Providers are for the same purpose too. there are a bunch of them in this project and they have been used in different api's and situations. I list them here below:

    - loginChecker ~ a function to check if the given userName and password in the login API is correct or not, since the password is hashed, it needs to hash again the password using the SECRET_KEY and check if they are the same or not. if not, it returns error and also returns error if the userName and password don't match or even the userName doesn't even exist.
    
    - passwordHasher - a function just to hash the password given in register API, using the bcrypt package. the reason for this is that we need to store the user's passwords encrypted in database, and not as a plain text! security reasons obviously.

    - tag/taskOwnerChecker - functions that get task/tag Id and a userId and checks if the given tag/task is created by the user with the given userId, to allow only the creator of a task/tag to edit/delete/... the task/tag of their own. not just accepting any request from anywhere.

    - tokenGenerator - generates token for authentication purposes and login API, using JWT package.

    - tokenVerifer - verify the given token to check if the token is correct or not.

the purpose of having providers is that whenever we need their functionalities, we use them from their files and import them from their own place, not just repeating their entire function anywhere we need. as I said before, Don't Repeat Yourself.

after writing all the CRUD's for all the endpoints, it's time to complete the project with 3 compeletion parts: VALIDATING, ERROR HANDLING, and LOGGING.

MIDDLEWAREs+PUBLIC FOLDERS:

the remaining folder, middlewares, contains of the functions that we need, to use them in the routes that requires them. there is a middleware function called authentication, which uses token providers and JWT, to generate token whenever a user logs in to the app and pass a token to them, also saving the whole user object as a property inside the request object, to pass it through the next function. using this method, once a user logs in, we always know who it is requesting our API's as long as their token in valid and not expired, and also as long as they send their token as a Bearer Token to the API. otherwise they can't access certain functions. that's about the authentication middleware, a middleware that checks the token and returns an error if it's not valid or not exists, and lets the request pass if it's all okay and valid.

now for validating, the definition is that we can't just let anybody sends anything, any data to our API's! we need to validate them. for example, we need to check for XSS Attacks through the body of the requests, we need to check for the Strong Password when a user is signing up. all of these stuff are called validation. we do Validation using express-validator package. check it's file to see what's going on, but briefly, there is a error handler function just for validators, that if at anytime, any of the validators reach the error, the next function in line should be their own error handler and handles that error (I guess I can change this situation). the rest is, an array of chained methods which you will understand if you take a look at them, and a checkExact() function at the end to check exactly given parameters and ignore anything else. finally we can use them in routes folder using the rest (...) paramter and use their error handler there as well.

next in line, Error Handling. in this point, if you handle no errors, anything that happens anywhere that causes an error in your application is going to crash the whole app down. we need a global error Handler to fix this stuff, and also we need a custom error Class to know what kind of errors happened and to be able to discern different errors from each other. our custom error class, is located in the public Folder and is a Class, that extends the original Error class provided by JavaScript. this custom class just adds statusCode, status, isOperational and and stackTrace capturing ability to the error handling feature of our app. take a look at that class. now in the middlewares section, we define a global Middleware, which is a global error handler. in Express, whenever a function has 4 parameters and the first one of them is named error, it is a global error handler and by default, in the process of passing the request through the middlewares to the endpoint, whenever an error occures, it automatically passes that error to the global error handler, so to handle it there. as you can see in that middleware function, there is a custom Map for Prisma Errors that might happen, and in that function, if the error that happened is an instance of PrismaClientKnownRequestError or an instance of our CustomError class which we made (and we use it from now on whereever we need to throw an error, not the original Error class anymore), we define a message and an error object suitable for their situation and show them. also depending on the "dev" or "production" environment of the app, the message might differ! since I coded like this and it should be like that too. at last we use this global error handler in our app.js, main file, as app.use(GlobalErrorHandler or whatever the name is) and it's all good.

now one thing remains, we need to write try/catch blocks inside all of our API's in order to catch the errors when they happen in order to pass them to the global error handler, what should we do ? we don't want to repeat ourselves just casually writing try/catch blocks! the solution to this is that, since all our controllers are asynchronous (because they have to contact through database which is an async job), they return promises. promises have a .then and also a .catch method. so if we figure out a way to use this .catch method of promises on these controllers and just next(error) in them, it's all good.
for this purpose, we have an asyncErrorHandler in our middleware, take a look at it. it's a function that returns a function that invokes the actual controller, because if it was only a function that invokes the controller not through a different function, it would invoke it anytime it calls. so the structure of it should be like this. it's a wrapper function around controllers. so we can wrap our controllers, in controllers folder manually, or we can wrap them in routes folder inside router object methods which is a better and cleaner way. anytime we want to change anything in controllers it's all good and okay and we don't have to change the errors too! that's why all the controllers in the routes folder are wrapped by another function, named asyncErrorHander, which only uses the .catch method of the promises to return the error if happened, and passes that to the global error handler. this way we don't need to manually write try/catch blocks inside all of our API's.

enough of Error Handling, on to the last part, Logging. we need loggers in our program, because we need to know when, and by who, somebody logged in our app, or somebody updated their task, or many other things. all requests must be logged somewhere and the developer have to be able to track down what happened, if anything bad goes on. it's like the history of the usage of the app and it's necessary. I can think of many ways to log things in our app, like defining decorators to just log the info, or manually just use console.log() command whereever needed and try to write the logs maybe in another file using fs module. or you can use packages made for this job, like Winston and Morgan or many others ... .

in this project I just used a simple morgan logger package, and copied what was necessary from their documents, to just write and stream the logs, all the requests that happen in a file named logFile.log in the project directory. it's nothing special but we can make it much more better. take a look at different loggers, or make your own. for now, in this example project, it's all good to have this simple morgan logger. maybe later I give a shot for more advanced stuff.

finally, all folders are explained alongside with their codes, mostly I guess. you know about prisma folder too since I explained different parts of it before this part of the document. I guess it's finally done, lesson learned, start writing the document from the beginning of the project not at the end of it.

4) Final Words:

to run the project on your local machine, clone this project and use "npm run dev" to run it but before you can use it entirely you have to setup a .env file for yourself which includes:
    DB_URL = "YOUR postgreSQL Database URL"
    PORT = "YOUR DESIRED PORT FOR THE APP"
    SECRET_KEY = "YOUR SECRET KEY FOR TOKEN GENERATING AND AUTHENTICATION, SHOULD BE RANDOM"
    EXPIRE_TIME = "JWT TOKEN EXPIRY TIME"                   *mine is '1d' meaning 1 day
    ENVIRONMENT = "production" or "development"             *I guess node itself had some command for this but anyway.

Please, If you happen to use any part of this project, or any part of it is somehow being helpful to you, let me know because I really am curious which part of this could be helpful to anyone, let me know of it. and if you found any bugs or any problems here, also let me know, I would be glad. contact me if needed, or wanted. let's move on to the next project.