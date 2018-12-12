# Gitgud - Document Sharing System

Time Spent: **2** Months

## Technology Stack
**MongoDB**
MongoDB is used as the data store for our website.

**Express**
We used Express.js for it's many web to server routing tools. 

**React.js**
Our website is built on React.js where we map out all of our functionalities on the website.

**Node.js**
Node.js is used to get our website up and running both locally and in production.

## Design
This project is split into multiple parts, the backend and the frontend. When running our application locally, the back-end and front-end runs on the local machine concurrently. 

## Set-up instructions
1. Set up MongoDB  https://docs.mongodb.com/manual/installation/

2. Set up Node.js  https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages

3. Do npm install on root directory and in client directory

## Terminology
1. SU = Super User
2. OU = Ordinary User
3. GU = Guest User

## Specification Requirements
1. Super User
  - [x] Update Membership
  - [x] Maintain a list of taboo words
  - [x] Unlock any locked document
  - [x] Process complaints about OU's
  - [x] Have all privileges reserved for OUs inside any group

2. Ordinary User
  - [x] create new document(s), the creator of a document is the owner of the document and can 
       invite other OUs to update it, and decide if the document is open to the 
       public (can be seen by everyone),
       restricted (can only be viewed as read-only by GU's and edited by OU's), 
       shared (viewed/edited by OU's who are invited) and private
  - [x] lock a shared document for updating, only one OU can lock a document successfully, 
       the system should indicate which OU is updating the document
  - [x] update a successfully locked document, and then assign a unique version sequence number 
       and remember who and when makes the updates
  - [x] unlock a shared document locked by him/herself
  - [x] file complaints to the owner of a document about other OUs'updates or 
       to the SU about the owner of the documents
  - [x] as the owner of a document deal with complaints filed by other OUs (remove some OUs who were invited before) 
  - [x] unlock the locked documents s/he owns that is being updated by others
  - [x] 1/2: search own file(s) based on (partial) keyword
  - [x] search information about other OUs based on name and/or interests
  - [x] have all privileges for GUs

3. Guest User
  - [x] read open document(s), retrieve old version(s) of open document(s) and complains about those documents.
  - [x] send suggestions to SU about taboo words
  - [x] apply to be an OU that is to be confirmed or rejected by SU, in the application his/her name, technical interests should be submitted.

4. Constraints
  - [x] there is only ONE current version for any document
  - [x] for simplicity there is only one word for each line in all documents  
  - [x] the retrieval of older versions of documents should be done by your system based on the current version and possibly a sequence of history files. 
  - [x] Prevents update if there are any word(s) belonging to the taboo list (maintained by SU) 
  - [x] a creative feature worthy of 15% is required for each system (Refer to Additional feature section directly below)
  - [x] a GUI is required, different users should have their own page populated by his/her picture and 3 most recent documents. For a brand-new user, 
        the 3 most popular (most read and/or updated) files in the system are shown.

## Additional Feature
- [x] **Security**
We focused on creating a robust and secure login and authentication system.
passwords are hashed with 10 salt rounds using bcrypt upon sign up. This is the industry standward way of storing passwords.
Upon login, we use Passport.js to create a new session token which only contain the user id. These sessions tokens are encrypted using a private key on the server. These session tokens are mapped to a document in our database. The session token appears to be a random string to the user and modifying the session token will make it invalid. When the user logs in, we set this token as an http only cookie. This is a good measure against session fixation attacks since we generate a new token everytime a user logs in.
On every request the user sends, the session token is sent along with it decrpyted to verify that it's a valid token. If it is not a valid token, then we reject the request with the appropriate status code and error message. If it's valid then we extract more information from the db using the token, such as role, and store it in our current user object of the request to perform further checks.
Upon logout, we both invalidate and remove the session token from our database. This will help mitigate session hijacking, if someone manages to obtain an old session token.

## Our Workflow
Once you are assigned to something to work on, you must create a new branch and work on it there. Please document what you did as commit comments.

**Pull Requests**
When you finished your code, you can create a pull request. Once everything is in order, the pull request will be accepted and merged into production. In the event that your code review/build fails, please work on what needs to be updated and try again.

## Getting our Code to Work
**Prerequisites**
Make sure you clone the github repository to your computer and have NodeJS along with the Node Package Manager (npm) installed.

**Running the Application**
``npm run-script dev``
This should open a new tab on your default browser window with the Gitgud application loading onto it. You are now able to utilize the application locally on your machine. You could now see how the website works, or test your changes.

## License

    Copyright [2018] [Michael Li, Melvin Cherian, Chieh-Huang Chen]
