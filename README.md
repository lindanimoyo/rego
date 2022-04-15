# ReGO - Research that moves
<p align="center">
 <img src="src/frontend/Rego/app/assets/images/rego.png">
</p>

### About
A Cross-platform Mobile Application for Reading Research Papers on the Go

### Summary
The availability of biomedical literature has increased in the last decade, PubMed holds about
30 million papers with an additional million papers added annually. However, the enormous
resources being produced make it hard to find relevant documents from databases, without
the right skillset, traditional databases like PubMed might seem difficult to use. The REGO
mobile application is designed to provide research papers to users in real-time, with a
graphical user interface designed with React Native and functionality provided through Node
JS and Mongo DB, it uses GraphQl as the middleware, data is retrieved from NCBI using E-
search and E-summary, from NCBI E-Utilities API. REGO can: recommend papers based on
user’s keywords; run queries; allow the user to save favourite papers; provide abstracts and
produce full-text publications, if they have open access. REGO is also equipped to store user
data information and preferences in the local application state using Redux, this ensures a
more personalised user experience.

## Features and functionality
- User Authentication (Signup & Login)
- Search for papers
- Read papers
- Bookmark the papers (Add to favorites)
- Recommend papers based on user activity

# Frameworks and tools
1. [React](https://reactjs.org/)
2. [React Native](https://reactnative.dev/)
3. [Tensorflow](https://www.tensorflow.org/)
4. [Graphql](https://graphql.org/)
5. [Entrez utils](https://www.ncbi.nlm.nih.gov/books/NBK25501/)
6. [Express](https://expressjs.com/)
7. [MongoDb](https://docs.mongodb.com/manual/)

# Implementation 
1. Frontend (user-interface) built with React and React-Native
2. Backend (web-server) built with Javascript
3. Graphql used as an API to connect the frontend and backend
4. MongoDB used as a Database of choice
5. Prediction models developed with Tensorflow
6. Research papers to be obtained using the NCBI’s e-utilities API.
