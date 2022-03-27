/**
 * The file contains the resolver functions
 *
 * for the publication model
 *
 * */

// create new publication
async function createPublication(parent, args, context){
    return new context.models.Publication({...args.input}).save()
}

// delete a publication
async function deletePublication(parent, args, context){
    return context.models.Publication.findByIdAndUpdate(args._id, { new: true });
}

// fetch publications
async function fetchPublications(parent, args, context){
    return context.models.Publication.find({})
}

// fetch single publication
async function fetchPublication(parent, args, context){
    return context.models.Publication.findById(args._id)
}

export {createPublication, deletePublication, fetchPublication, fetchPublications}
