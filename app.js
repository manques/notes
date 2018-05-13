console.log(' Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions ={ 
    describe: 'Title for note',
    demand: true,
    alias: 't'
};

const bodyOptions ={ 
    describe: 'Body for note',
    demand:true,
    alias: 'b'
}

const argv = yargs
.command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
})
.command('remove', 'Remove a new note', {
    title: titleOptions
})
.command('read', 'Read a note', {
    title: titleOptions
})
.command('list', 'List all notes')
.help()
.argv;
var command = process.argv[2];

console.log('process: ', process.argv);
console.log('yargs: ', argv);

var logNote = (note) => {
    debugger;
    console.log('----------------');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

if(command === 'add'){

   var note = notes.addNote(argv.title, argv.body);
   if(note){
        console.log('Note is created');
        logNote(note);
   }else{
        console.log('Title is already taken');
   } 

}else if(command === 'remove'){

    var noteRemove = notes.removeNote(argv.title);
    var message = noteRemove ? 'Note  was remove' : 'Note not found';
    console.log(message);

}else if(command === 'read'){

    var note = notes.getNote(argv.title);
    if(note){
        console.log(' Get Note');
        logNote(note);
    }else{
        console.log("Note not found");  
    }
}else if(command === 'list'){
   var getAllNote = notes.getAll();
   console.log(`Printing ${getAllNote.length} note(s).`); 
   getAllNote.forEach( (note) => logNote(note) );   
}else{
    console.log('command is not recognized');
}



