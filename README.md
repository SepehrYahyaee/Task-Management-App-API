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

Database folder of this project, where all the models and migrations (different versions) of it is defined is prisma folder. inside of it, there is a Schema.prisma file which everything is defined in it and has been explained above, and also there is a migration folder which has the information of all the migrations and stuff. also there's a db.js file in this project which is only a client, a communication between the database and the code, an Object, which we import it whereever we want to work with the database, specially in services since their main job is to contact with the database.    

CONTROLLERs are somewhat functions, or API's, or ENDPOINTs that answer the requests that come to them, each and every one of them has a ROUTE assigned to them and a HTTP method, which the request has those info when approaching that API.

In process of answering the requests, In other words Responding, controllers only have the duty to respond with a proper response object defined for them. any other activity that helps the process of calculating or finding or querying the response, is on PROVIDERS. Providers do this in-between jobs. take Providers as a whole, one child of it is SERVICES, which only has the duty to contact with database and get the needed responses. other providers other than services, has other jobs which can be defined, like a function for hashing passwords, a single function to do this, instead of doing this directly in controllers. the reason behind it is that if you need to hash a password somewhere else you use that function (import it) anywhere you want, not just repeating yourself anywhere needed! (DRY = Don't Repeat Yourself) so it's all good to use providers.

MIDDLEWAREs are also functions, just like controllers but with the next function as a parameter in them. imagine controllers as the last middleware whereas the request object is not going to next function anymore and instead, the response is going to be sent to the user! now before the response, before reaching that final middleware, or controller, you may need to do some stuff or check things, like authenticating or assigning a new property to the request object, or like preventing the request object from including everything that user sends (Guarding). in order to do this, we use middlewares. middlewares do the stuff which is defined in them, and pass the incoming request using the next() function to the next middleware in line, until the last middleware which is our Controller, or ENDPOINT (literally), responds user with the response defined in it.

ROUTEs, as their names shows, is the paths that the Controllers answers on, like the controller is listening only in their defined path or line and only answers that line if anybody request that path, not any other path. each path or ROUTE might have their own controller, or no controller at all. the only catch here is that, to group a bunch of paths together, we use Express Router function, and use it as a global middleware and assign a path to it, meaning that all the routes to a router has a prefix path with them, which is defined as a prefix using app.use('prefix', ROUTER OBJECT). this is the way to group a bunch of related routes that all of them passes through a certain path, together.

finally, App.js is the main file of our project, everything falls into the place here, and at last, server runs, and the app works (hopefully!).

this was all about the structure of the whole app, now let's dive in to the details.

