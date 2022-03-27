/*
* The file contains mongodb schema definitions
*
* */

import mongoose from "mongoose";

const {Schema} = mongoose;

/*
* The user schema creates the user object in the database
* */
const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    joinedAt: {type: Date, default: Date.now()},
    token: String,
    active: {type:Boolean, default:true},
    hold: {type:Boolean, default: false},
});

/*
* The paper schema will hold the papers or publications
* the user has read or shown interest in
*
* */
const publicationSchema = new Schema({
    title: String,
    pmid: String,
    pmc: String,
})

/*
*  The bookmark schema creates a bookmark object for
*  publications or papers that a user bookmarks or adds to favourites
* */
const bookmarkSchema = new Schema({
    userId: String,
    pmid: String,
    pmc: String,
})

export {userSchema, bookmarkSchema, publicationSchema}
