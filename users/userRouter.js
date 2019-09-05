const express = require('express');
const db = require('./userDb')

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    db.get()
        .then(users => res.status(200).json(users))
        .catch(err => {
            console.log('Error inside of get users')
            res.status(500).json({ error: "The users info could not be retrieved." })
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    db.getById(id)
        .then(users => {
            console.log(users.name)
            if (users.name) {
                return res.status(200).json(users)
            }
        })
        .catch(err => {
            res.status(404).json({ error: "The User with that ID doesn't exsist" })
        })
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
