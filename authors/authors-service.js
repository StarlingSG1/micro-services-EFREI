const express = require('express');
const bodyParser = require('body-parser');
const api = express();

api.use(bodyParser.json());

let authors = [
    {
        id: 1,
        name: 'Auteur 1',
    },
    {
        id: 2,
        name: 'Auteur 2',
    },
    {
        id: 3,
        name: 'Auteur 3',
    },
    {
        id: 4,
        name: 'Auteur 4',
    },
];

api.get('/authors', (req, res) => {
    res.json(authors);
});

api.get('/authors/:id', (req, res) => {
    const authorId = parseInt(req.params.id);
    const author = authors.find((author) => author.id === authorId);

    if (author) {
        res.json(author);
    } else {
        res.json(`Author ${authorId} not found`);
    }
});

api.post('/authors', (req, res) => {
    const { id, name } = req.body;

    if (id && name) {
        const author = { id, name };
        authors.push(author);
        res.json(author);
    } else {
        res.status(400).json({ message: 'Invalid author data' });
    }
});

api.delete('/authors/:id', (req, res) => {
    const authorId = parseInt(req.params.id);
    const index = authors.findIndex((author) => author.id === authorId);

    if (index !== -1) {
        authors.splice(index, 1);
        res.json({ message: `Author ${authorId} deleted successfully` });
    } else {
        res.status(404).json({ message: `Author ${authorId} not found` });
    }
});

api.listen(4001, () => {
    console.log('Authors service started on port 4001');
});
