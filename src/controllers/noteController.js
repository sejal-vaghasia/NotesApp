// controllers/noteController.js
const Note = require('../models/Notes');
const User = require('../models/Users');
const SharedNotes = require('../models/SharedNotes');
// @description    Get all notes
// @route   GET /api/notes
exports.getAllNotes = async (req, res) => {
  const notes = await Note.find({ userId: req.user._id });
  var allNotes = []
  if (notes) {
    notes.forEach(notesElement => {
      allNotes.push({
        "notesId": notesElement._id ? notesElement._id : "",
        "title": notesElement.title ? notesElement.title : "",
        "content": notesElement.content ? notesElement.content : "",
        "userId": notesElement.userId ? notesElement.userId : "",
        "createdAt": notesElement.created ? notesElement.created : ""
      })
    });
    res.status(200).json({ status: 200, message: 'Notes found', data: allNotes });
  }
  else {
    res.status(200).json({ status: 404, message: 'Notes not found', data: [] });
  }

};

//@description     Fetch single Note
//@route           GET /api/notes/:id
exports.getNoteById = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    var notesElement = {
      "notesId": note._id ? note._id : "",
      "title": note.title ? note.title : "",
      "content": note.content ? note.content : "",
      "userId": note.userId ? note.userId : "",
      "createdAt": note.created ? note.created : ""
    }
    res.status(200).json({ status: 200, message: 'Note found', data: notesElement });
  } else {
    res.status(200).json({ status: 404, message: "Note not found", data: {} });
  }
};

//@description     Create single Note
//@route           GET /api/notes/create
exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(404).json({ message: 'Please Fill all the feilds' });
  } else {
    const note = new Note({ userId: req.user._id, title, content });
    const createdNote = await note.save();
    if (createdNote) {
      var notesElement = {
        "notesId": createdNote._id ? createdNote._id : "",
        "title": createdNote.title ? createdNote.title : "",
        "content": createdNote.content ? createdNote.content : "",
        "userId": createdNote.userId ? createdNote.userId : "",
        "createdAt": createdNote.created ? createdNote.created : ""
      }
      res.status(200).json({ status: 201, message: 'Note Created', data: notesElement });
    } else {
      res.status(200).json({ status: 204, message: "Could not create note", data: {} });
    }
  }
};

// @description    Update a note
// @route   PUT /api/notes/:id
exports.updateNote = async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.findById(req.params.id);
  if (note && note.userId.toString() !== req.user._id.toString()) {
    res.status(200).json({ status: 403, message: "You can't perform this action" });
  } else {
    if (note) {
      if (title) { note.title = title; }
      if (content) { note.content = content; }
      const updatedNote = await note.save();
      if (updatedNote) {
        var notesElement = {
          "notesId": updatedNote._id ? updatedNote._id : "",
          "title": updatedNote.title ? updatedNote.title : "",
          "content": updatedNote.content ? updatedNote.content : "",
          "userId": updatedNote.userId ? updatedNote.userId : "",
          "createdAt": updatedNote.created ? updatedNote.created : ""
        }
        res.status(200).json({ status: 200, message: 'Note Updated', data: notesElement });
      } else {
        res.status(200).json({ status: 204, message: "Note not Updated" });
      }
    } else {
      res.status(200).json({ status: 404, message: "Note not found" });
    }
  }
};

//@description     Delete single Note
//@route           GET /api/notes/:id
exports.deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    if (note.userId.toString() !== req.user._id.toString()) {
      res.status(200).json({ status: 403, message: "You can't perform this action" });
    } else {
      var deleteQuery = { _id: note._id };
      var deletedNote = await note.deleteOne(deleteQuery);
      if (deletedNote.deletedCount == 1) {
        res.status(200).json({ status: 200, message: "Note Removed" });
      } else {
        res.status(200).json({ status: 204, message: "Something went wrong. Plase try again" });
      }
    }
  } else {
    res.status(200).json({ status: 404, message: "Note not found" });
  }
};

//@description     Share Note
//@route           POST /api/notes/:id/share
exports.shareNote = async (req, res) => {
  const { userIds } = req.body;
  if (!userIds || userIds.length == 0) {
    res.status(200).json({ status: 204, message: 'Please select atleast one user to share the note' });
  } else {
    const note = new Note({ userId: req.user._id });
    if (!note) {
      res.status(200).json({ status: 204, message: 'You are not authorized to share this note' });
    } else {
      var isAuthor = 0
      if (userIds.length == 1) {
        isAuthor = userIds.includes(note.userId);
        res.status(200).json({ status: 204, message: 'You are the auther of this note so you can not share it to yourself' });
      }
      else {
        var sharedToUsers = [];
        var noteAuther = [];
        var alreadyShared = [];
        var sharingFailed = [];
        var userCount = 0
        userIds.forEach(async (singleUser) => {
          if (note.userId == singleUser) {
            noteAuther.push(singleUser)
          } else {
            shareQuery = { userId: singleUser, noteId: req.params.id }
            const isAlreadyShared = await SharedNotes.findOne(shareQuery);
            if (!isAlreadyShared) {
              const sharedNotesSchema = new SharedNotes(shareQuery);
              const sharedNote = await sharedNotesSchema.save();
              if (sharedNote) {
                var sharedNotesElement = {
                  "noteId": req.params.id,
                  "userId": singleUser,
                }
                sharedToUsers.push(sharedNotesElement)
              } else {
                sharingFailed.push(singleUser)
              }
            } else {
              alreadyShared.push(singleUser)
            }
          }
          userCount++;
          if (userCount == userIds.length) {
            res.status(200).json({ status: 200, message: 'Note Shared', data: { "sharedToUsers": sharedToUsers, "noteAuther": noteAuther, "alreadyShared": alreadyShared, "sharingFailed": sharingFailed } });
          }
        });
      }

    }
  }
}

//@description     Notes shared with current user
//@route           GET /api/notes/shared
exports.sharedWithMe = async (req, res) => {
  const userId = req.user._id;
  const sharedNotes = await SharedNotes.aggregate([
    {
      $match: { userId: userId }
    },
    {
      $lookup: {
        from: 'notes',
        localField: 'noteId',
        foreignField: '_id',
        as: 'note'
      }
    },
    {
      $unwind: '$note'
    },
    {
      $replaceRoot: { newRoot: '$note' }
    }
  ]);
  res.json(sharedNotes);
};


//@description     Share Note
//@route           GET /api/search?q=:Query:
exports.searchNotes = async (req, res) => {
  const searchQuery = req.query.q
  if (!searchQuery || searchQuery.length < 2) {
    res.status(200).json({ status: 404, message: 'Please enter 2 or more charachter to search!' });
    return
  }
  const queryString = req.query.q;
  const userId = req.user._id

  const notes = await Note.find({
    userId: userId,
    $and: [
      {
        $or: [
          { $text: { $search: `"${queryString}"`, $caseSensitive: false } },
          {
            $or: queryString.split(' ').map(term => (
              {
                $or: [
                  { title: { $regex: new RegExp(term, 'i') } },
                  { content: { $regex: new RegExp(term, 'i') } },
                ]
              }
            ))
          },
        ],
      },
    ],
  });

  res.status(200).json({ status: 200, message: 'Note found', data: notes });

}
