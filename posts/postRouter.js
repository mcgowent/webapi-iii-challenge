const express = require('express');
const db = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
    db.get()
        .then(posts => res.status(200).json(posts))
        .catch(err => {
            console.log('Error inside of get posts')
            res.status(500).json({ error: "The posts info could not be retrieved." })
        })
});

router.get('/:id', validatePostId, (req, res) => {
    const { id } = req.params
    db.getById(id)
        .then(post => {
            console.log(post.text)
            if (post.text) {
                return res.status(200).json(post)
            }
        })
        .catch(err => {
            res.status(404).json({ error: "The User with that ID doesn't exsist" })
        })
});

router.delete('/:id', validatePostId, (req, res) => {
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

router.put('/:id', validatePostId, (req, res) => {
    const { id } = req.params
    const { text } = req.body

    db.update(id, { text })
        .then(updated => {
            console.log('Line 101', updated)
            db.getById(id)
                .then(textReturned => {
                    console.log('Line 104', textReturned)
                    if (textReturned) {
                        res.status(201).json(textReturned)
                    } else {
                        res.status(404).json({ error: "The text with the specified ID does not exist." })
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ error: "There was an error while saving the text to the database" })
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "There was an error while saving the text to the database." })
        })
});

// custom middleware

function validatePostId(req, res, next) {
    db.getById(req.params.id)
        .then(result => {
            if (result) {
                next()
            } else {
                res.status(404).json({ message: "invalid user id" })
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not validate ID' })
        })
};

module.exports = router;