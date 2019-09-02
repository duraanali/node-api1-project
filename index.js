// implement your API here

const express = require('express'); // import the express package

const server = express(); // creates the server
server.use(express.json());

const db = require('./data/db.js');


// GET USERS
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: "Can not get anything bro"
            })
        });

});


// POST USERS

server.post('/api/users', (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    db.insert(newUser)
        .then(users => {
            res.status(201).json(users);
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: "can not create anything bro"
            });
        });

});

// PUT USERS

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db.update(id, changes)
        .then(updated => {
            if (updated) {
                res.json(updated);
            } else {
                res.status(404).json({
                    message: "invalid id"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: "can not update anything bro"
            });
        });

});

// DELETE USERS

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(deletedUser => {
            if (deletedUser) {
                res.json(deletedUser);
            } else {
                res.status(404).json({
                    message: "invalid id"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: "can not update anything bro"
            });
        });

});
// watch for connections on port 5000
server.listen(5000, () =>
    console.log('Server running on http://localhost:5000')
);