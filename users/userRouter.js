const express = require('express');
const db = require('./userDb')
const postDB = require('../posts/postDb')


const router = express.Router();

router.post('/', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ errorMessage: 'Please provide a name.' })
    }

    db.insert({ name })
        .then(({ id }) => {
            db.getById(id)
                .then(users => {
                    res.status(201).json(users)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ error: 'There was an error while saving the user to the database' })
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })
});

router.post('/:user_id/posts', (req, res) => {
    const { text } = req.body;
    const { user_id } = req.params

    postDB.insert({ text, user_id })  //Used the ID of the user to make sure the data sent didn't need to have userID
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: 'Post was not created' })
        })
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
    const { id } = req.params
    postDB.getById(id)
        .then(post => {
            console.log(post.user_id)
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(404).json({ error: "The User with that ID doesn't exsist" })
        })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params
    db.remove(id)
        .then(removed => {
            if (removed) {
                res.status(204).end()
            } else (
                res.status(404).json({ message: "The User with the specified ID does not exist." })
            )
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The User could not be removed." })
        })
});

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body

    db.update(id, { name })
        .then(updated => {
            console.log('Line 101', updated)
            db.getById(id)
                .then(nameReturned => {
                    console.log('Line 104', nameReturned)
                    if (nameReturned) {
                        res.status(201).json(nameReturned)
                    } else {
                        res.status(404).json({ error: "The name with the specified ID does not exist." })
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ error: "There was an error while saving the name to the database" })
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "There was an error while saving the name to the database." })
        })
});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
