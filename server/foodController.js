const db = require('./db')

let placeID = 21

module.exports = {
    getPlace: (req, res) => {
        res.status(200).send(db);
    },
    createPlace: (req, res) => {
        let newPlace = req.body;
        newPlace.id = placeID;
        db.push(newPlace);
        placeID++;
        res.status(200).send(db);
    },

    deletePlace: (req, res) => {
        const { id } = req.params
        const index = db.findIndex(place => place.id === +id);
console.log(index)

        db.splice(index, 1);
        res.status(200).send(db);
    },

    voteOnPlace: (req, res) => {
        let { id } = req.params;
        let { type } = req.body;

        for (let i=0; i < db.length; i++) {
            if (db[i].id === +id && type === 'minus') {
                db[i].votes -= 1
            }
            if (db[i].id === +id && type === 'plus') {
                db[i].votes += 1
            }
     }
     res.status(200).send(db);
    }
}