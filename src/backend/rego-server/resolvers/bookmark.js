/**
 * The file contains the resolver functions
 *
 * for the bookmark model
 *
 * */

// create new bookmark
async function createBookmark(parent, args, context){
    return new context.models.Bookmark({...args.input}).save()
}

// delete a bookmark
async function deleteBookmark(parent, args, context){
    return context.models.Bookmark.findByIdAndUpdate(args._id, { new: true });
}

// fetch bookmarks
async function fetchBookmarks(parent, args, context){
    return context.models.Bookmark.find({})
}

// fetch single bookmark
async function fetchBookmark(parent, args, context){
    return context.models.Bookmark.findById(args._id)
}

export {createBookmark, deleteBookmark, fetchBookmark, fetchBookmarks}
