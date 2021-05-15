const fs = require('fs');

function read () {
    return new Promise((resolve, reject) => {
        // Read file
        fs.readFile('./notes.json', 'utf-8', function(err, data) {
            resolve(JSON.parse(data || '[]'));
        })   
    });
}

function write (newNote) {
    return new Promise(async (resolve, reject) => {
        // Get all notes
        const notes = await read();

        // Add note id
        const [lastNote] = notes.slice(-1);
        const lastID = lastNote ? Number(lastNote.id) : 0;
        newNote.id = String(lastID + 1);

        // Push note into notes list
        notes.push(newNote);
        
        // Update file
        updateNotes(notes);
    });
}

async function remove(noteID) {
    // Get all notes
    const notes = await read();

    // Filter the note that should be removed
    const newNotes = notes.filter(note => note.id !== noteID);

    // Update note list without the removed one
    updateNotes(newNotes, () => console.log('Note removed!'));
}

function updateNotes(notes, callback) {
    fs.writeFile('./notes.json', JSON.stringify(notes), function(err, data) {
        console.log(data);

        if (callback) {
            callback();
        }
    });
}

module.exports = {
    read,
    write,
    remove
};