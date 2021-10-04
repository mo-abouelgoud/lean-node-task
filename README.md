Dear candidate,

Thanks for your application and the interview - everything looks great! We&#39;d like to take you to the next stage of the process.

As you&#39;d expect, a big part of this role will be software development, so we&#39;ve got a coding-based challenge - see below!

We know you may not be familiar with most of the concepts and technologies in the challenge, but this is a great chance for us to test your ability to learn quickly and show us your amazing work.

You have **3 days** to submit your answers. In case you feel you can&#39;t deliver all of the requirements try to set priorities to show us a small part of every point.
Do your best and if you can&#39;t finish it on time just submit what you have.

It may take us 2 to 5 days to review your answers. We&#39;ll be in touch as early as possible.

Thanks again,

Backend team
Lean Node

**Coding Challenge**

We need you to create simple APIs for user management which uses to following instructions:

- Create new project using [SailsJs framework](https://sailsjs.com/)
- Store data in [Firestore database](https://firebase.google.com/products/firestore) using [firebase admin SDK](https://www.npmjs.com/package/firebase-admin)
- Push/Fetch users data to/from [Algolia](https://www.algolia.com/) using [algoliasearch](https://www.npmjs.com/package/algoliasearch) library
- Generate and verify tokens by [JTW](https://jwt.io/) using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) library
- Create postman collection to test your APIs
- Create Github or Bitbucket repository and push your code

**Note** :

- Please commit your code while you&#39;re working and add suitable commit messages to each commit


**Feature Description**

We need to propose a solution for the problem of ticket reservation in the hospital system where we have limited employees with limited working hours and many provided services and there is a huge number of users, about 10 million .

There some considerations:

- Every user will have an account to be able to access the system.
- The hospital is working at specified time from 9:00 to 5:00 and there is a limited slot time each xMinutes and each slot time serves about only 30 users for each service.

- Every user will have an account to be able to access the system.
- There are api that provide the user with the nearest available days and time slots the nearest 3 days
- Once the user reserves a ticket for a time slot, the system should consider this reservation and decrease the available slot.
- Each user has only one ticket running in each service.
- And only 3 tickets open on all services
- Each employee has a limited number of tickets in one slot time.
- There are admin that review these tickets and change the status once the user arrives at the hospital.

**Project template:**

At the end of this file, you will find the project template which you need to continue on it. That there are many premade API&#39;s that help you only concentrate on the remaining API&#39;s

- (Ready) means that you find this Api&#39;s in the template (YOU CAN CHANGE IT, IF YOU NEED ANY TIME)
- (New) means that you need to build it from scratch.
- (New\_Sub\_Part) means that you need to continue on this task.

**Project requirements:**

1. **User API&#39;s**

- API for normal user to register(New\_Sub\_Part =\&gt; just add algolia feature)
- You&#39;ll also need to push the registered user to Algolia to be fetched in the search API -see below-.
  - **Inputs** :
    - Username: should be unique
    - Email: should be valid email and unique
    - Password: should be more than 6 characters contains numbers and letters
    - Age: should be between 18 and 50
  - **Outputs** :
    - Success status

- API for normal user to login(New)
  - **Inputs** :
    - Username
    - Password
  - **Outputs** :
    - JWT token

- API for normal user to get his profile(Ready)
  - **Inputs** :
    - JWT token in headers
  - **Outputs** :
    - Username
    - Email
    - Age

- API for normal user to get the nearest free appointments (nearest 3 days) (New)
  - **Inputs** :
    - JWT token in headers
  - **Outputs** :
    - service
    - date
    - Time

- API for normal user to add new appointment (New)
  - **Inputs** :
    - service
    - date
    - Time
  - **Outputs** :
    - error
      - If the user has reserved the same service before and it is still running, it has not ended.
      - If the user has reserved more than three running services.
      - The user is not authenticated.
    - Other return success message

1. **Admin API&#39;s**
- API for admin to login(Ready)

- **Inputs** :
  - Username
  - Password
- **Outputs** :
  - JWT token

- API for admin to show settings(Ready) ##
  - **Outputs** :
    - Start working day
    - End working day
    - Slot time

- API for admin to approve the appointment and change status(Ready) ##
  - **Inputs** :
    - Appointment id
  - **Outputs** :
    - success

- API for admin to list and search for registered users(New)
  This API must fetch and search data from Algolia - mentioned above -
  Normal users shouldn&#39;t be able to access this api
  - **Inputs** :
    - JWT in headers
    - Username (optional)
    - Email (optional)
    - Page
    - Limit
  - **Outputs** :
    - Array of users profiles (username, email, age, id)


Once you finish please reply to this email, send us your

- repository link
- postman collection link
- Grant access to view your firebase project and firestore database to
  - [mrdadah@leannode.com](mailto:mrdadah@leannode.com)
  - [mohamedhamed@leannode.com](mailto:mohamedhamed@leannode.com)
  - [alzaid@leannode.com](mailto:alzaid@leannode.com)
  - [ahmed@leannode.com](mailto:ahmed@leannode.com)
  - [mohamed.mostafa@leannode.com](mailto:mohamed.mostafa@leannode.com)
- Project template just fork it and show us the hero .^\_^.
  - [https://bitbucket.org/leannode/backendsenior/src/master/](https://bitbucket.org/leannode/backendsenior/src/master/)
