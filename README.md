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

### Workflow and Implementation
<p align="center">
 <img src="workflow/rego_workflow.png">
</p>

1. Frontend (user-interface) built with  [React](https://reactjs.org/) and [React Native](https://reactnative.dev/)
2. Backend (web-server) built with Javascript
3. [Graphql](https://graphql.org/) used as an API to connect the frontend and backend
4. [MongoDb](https://docs.mongodb.com/manual/) used as a Database of choice
5. Research papers to be obtained using the NCBI’s [Entrez utils](https://www.ncbi.nlm.nih.gov/books/NBK25501/) API.

### ReGO in Action
<div align="center"  style="display: flex">
    <img  width="300" style="margin: 10px" src="output/Screenshot_2022-04-15-11-08-04-29_a9a56b8cc64bdde91c17db58bee4351f.jpg">
    <img width="300" style="margin: 10px"  src="output/Screenshot_2022-04-15-11-08-19-23_a9a56b8cc64bdde91c17db58bee4351f.jpg">
    <img width="300" style="margin: 10px" src="output/Screenshot_2022-04-15-11-08-47-02_a9a56b8cc64bdde91c17db58bee4351f.jpg">
</div>
