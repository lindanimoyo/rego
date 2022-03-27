/**
 * The file contains the resolver functions
 *
 * for the user model
 *
 * */


import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {APP_SECRET} from "../utils/utils.js";

// create user / Signup function
async function createUser(parent, args, context){
    let password = await bcrypt.hash(args.input.password, 10)
    let user = await new context.models.User({...args.input, password})
    user.save()
    let token = jwt.sign({userId: user.id},APP_SECRET)
    return {token, user}
}

// user login
async function login(parent, args, context) {
    let user = await context.models.User.findOne({email: args.email})
    if (!user){
        throw new Error("No such user found")
    }
    let valid = await bcrypt.compare(args.password, user.password)
    if (!valid){
        throw new Error("Invalid password")
    }
    let token = jwt.sign({userId: user.id}, APP_SECRET)
    return {token, user}
}

// Delete User
async function deleteUser(parent, args, context){
    return context.models.User.findByIdAndDelete(args._id)
}

// Update user
async function updateUser(parent, args, context){
    return context.models.User.findByIdAndUpdate(args._id, {...args.input}, {new: true})
}

// Fetch a single user
async function fetchUser(parent, args, context){
    return context.models.User.find({_id: args._id})
}

// Fetch a batch of users
async function fetchUsers(parent, args, context){
    return context.models.User.find()
}

// export the resolvers
export {
    createUser,
    deleteUser,
    fetchUser,
    fetchUsers,
    login,
    updateUser
}
