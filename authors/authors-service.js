const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const api = express();

api.use(bodyParser.json());

const authors = [
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
    }
    else {
        res.json(`Author ${authorId} not found` );
    }
});


api.listen(4001, () => {
    console.log('Authors service started on port 4001');
}
);