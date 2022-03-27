/*

* The file creates database models from the defined schema in
* the schema file
*
* */

import mongoose from "mongoose";
import {userSchema, bookmarkSchema, publicationSchema} from "./schema.js";

const User = mongoose.model("User", userSchema.index({'$**': 'text'}))
const Bookmark = mongoose.model("Bookmark", bookmarkSchema.index({'$**': 'text'}))
const Publication = mongoose.model("Publication", publicationSchema.index({'$**': 'text'}))

export {User, Bookmark, Publication}
