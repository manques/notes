console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
    try{
        var notesString = fs.readFileSync("notes-data.json");
        return JSON.parse(notesString);
    }catch(e){
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

//Add note
var addNote = (title, body) => {
    var notes = fetchNotes();
    var note ={
        title,
        body
    };
  
    var duplicateNotes = notes.filter( (note) => note.title === title);
    if(duplicateNotes.length === 0){
        notes.push(note);  
        saveNotes(notes);
        return note;
    }
    
};

var getAll = () => {
    return fetchNotes();
};

// Get one note
var getNote = (title) => {
    var notes = fetchNotes();

    var getNote = notes.filter( (note) => note.title === title);

    return getNote[0];
};

//Rmove note
var removeNote = (title) => {
    // fetch notes
    var notes = fetchNotes();
    
    var subtractedNotes = notes.filter( (note) => note.title !== title);
    saveNotes(subtractedNotes);
    return notes.length !== subtractedNotes.length;
};

module.exports = {
    addNote,
    getAll,
    removeNote,
    getNote
};