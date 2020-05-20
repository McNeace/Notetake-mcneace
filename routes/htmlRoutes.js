const db = require("../db/db.json");
const fs = require("fs");
const uuid = require("uuid/v4");

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        res.json(db);
    });

    app.post("/api/notes", function (req, res) {


        const newNoteID = uuid();

        console.log(req.body);
        let newNote =
        {
            id: newNoteID,
            title: req.body.title,
            text: req.body.text
        };


        fs.readFile("./db/db.json", (err, data) => {
            if (err) throw err;
            console.log(data);
            var notesArr = JSON.parse(data);
            notesArr.push(newNote)



            fs.writeFile("./db/db.json", JSON.stringify(notesArr), function (err) {
                if (err) throw err;
                console.log('Saved!');
                res.send(db);
            });
        });
    });
    app.delete("/api/notes/:id", (req, res) => {
        //read the db.json file
        var idChosen = req.params.id;
        fs.readFile("./db/db.json", (err, data) => {
            if (err) throw err;
            console.log(data);
            var notesArr = JSON.parse(data);
            var newNotesArr = notesArr.filter(note => note.id != idChosen);
            fs.writeFile("./db/db.json", JSON.stringify(newNotesArr), function (err) {
                if (err) throw err;
                console.log('Deleted!');
                res.send(db);
            });
        })

    })

}