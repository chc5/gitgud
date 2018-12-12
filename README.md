# Gitgud - Document Management System

Time Spent: **2** Months

## Technology Stack
1. MongoDB
2. Express
3. React.js
4. Node.js

## Set-up instructions
1. Set up MongoDB
2. Set up Node.js
3. Do npm install on root directory and in client directory

## Terminology
1. SU = Super User
2. OU = Ordinary User
3. GU = Guest User

## Specification Requirements
1. Super User
  - [] Update Membership
  - [] Maintain a list of taboo words
  - [] Unlock any locked document
  - [] Process complaints about OU's
  - [] Have all privileges reserved for OUs inside any group

2. Ordinary User
  - [] create new document(s), the creator of a document is the owner of the document and can 
       invite other OUs to update it, and decide if the document is open to the 
       public (can be seen by everyone),
       restricted (can only be viewed as read-only by GU's and edited by OU's), 
       shared (viewed/edited by OU's who are invited) and private
  - [] an OU can accept or deny the invitation(s) placed by other OUs for their documents
  - [] lock a shared document for updating, only one OU can lock a document successfully, 
       the system should indicate which OU is updating the document
  - [] update a successfully locked document, and then assign a unique version sequence number 
       and remember who and when makes the updates
  - [] unlock a shared document locked by him/herself
  - [] file complaints to the owner of a document about other OUs'updates or 
       to the SU about the owner of the documents
  - [] as the owner of a document deal with complaints filed by other OUs (remove some OUs who were invited before) 
  - [] unlock the locked documents s/he owns that is being updated by others
  - [] search own file(s) based on (partial) keyword
  - [] search information about other OUs based on name and/or interests
  - [] have all privileges for GUs

3. Guest User
  - [] read open document(s), retrieve old version(s) of open document(s) and complains about those documents.
  - [] send suggestions to SU about taboo words
  - [] apply to be an OU that is to be confirmed or rejected by SU, in the application his/her name, technical interests should be submitted.

## Additional Feature
- [] Security

## License

    Copyright [2018] [Michael Li, Melvin Cherian, Chieh-Huang Chen]
