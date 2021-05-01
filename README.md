# lean-node-task

a [Sails v1](https://sailsjs.com) application

### Links

- [Sails framework documentation](https://sailsjs.com/get-started)
- [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
- [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
- [Community support options](https://sailsjs.com/support)
- [Professional / enterprise options](https://sailsjs.com/enterprise)

### Version info

This app was originally generated on Sat May 01 2021 04:40:24 GMT+0200 (Eastern European Standard Time) using Sails v1.4.2.

<!-- Internally, Sails used [`sails-generate@2.0.3`](https://github.com/balderdashy/sails-generate/tree/v2.0.3/lib/core-generators/new). -->

<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

# lean_node_task

Coding Challenge
We need you to create simple APIs for user management which uses to following instructions:
Create new project using SailsJs framework
Store data in Firestore database using firebase admin SDK
Push/Fetch users data to/from Algolia using algoliasearch library
Generate and verify tokens by JTW using jsonwebtoken library
Create postman collection to test your APIs
Create Github or Bitbucket repository and push your code
Note:
Please commit your code while you’re working and add suitable commit messages to each commit

Project requirements:
API for normal user to register
You’ll also need to push the registered user to Algolia to be fetched in the search API -see below-.
Inputs:
Username: should be unique
Email: should be valid email and unique
Password: should be more than 6 characters contains numbers and letters
Age: should be between 18 and 50
Outputs:
Success status

API for normal user to login
Inputs:
Username
Password
Outputs:
JWT token

API for normal user to get his profile
Inputs:
JWT token in headers
Outputs:
Username
Email
Age

API for normal user to update his profile
Inputs:
JWT token in headers
Username: should be unique
Email: should be valid email and unique
Age: should be between 18 and 50
Outputs:
Success status

API for admin to login
Inputs:
Username
Password
Outputs:
JWT token

API for admin to list and search for registered users
This API must fetch and search data from Algolia - mentioned above -
Normal users shouldn’t be able to access this api
Inputs:
JWT in headers
Username (optional)
Email (optional)
Page
Limit
Outputs:
Array of users profiles (username, email, age, id)
