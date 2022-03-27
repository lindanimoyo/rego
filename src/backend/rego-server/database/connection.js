/*
*
* The file contains a function that initiates a connection to mongodb
*
* */

import mongoose from "mongoose";

// define the connect function

function connectToDB(){
    mongoose.connect('mongodb://localhost/rego',
        {})
        .then(() => {console.log('Initial db connection successful')},
            err => {console.error('A terrible error occurred in the initial connection',err)});
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'db connection error:'));
    db.once('open', function () {
        console.log("db connection successful!")
    });
    return db
}

export {connectToDB}
