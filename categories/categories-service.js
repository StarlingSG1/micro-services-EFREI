const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const api = express();

api.use(bodyParser.json());

const categories = [
    {
        id: 1,
        name: 'Category 1',
    },
    {
        id: 2,
        name: 'Category 2',
    },
    {
        id: 3,
        name: 'Category 3',
    },
    {
        id: 4,
        name: 'Category 4',
    },
];


api.get('/categories', (req, res) => {
    res.json(categories);
});

api.get('/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const category = categories.find((category) => category.id === categoryId);

    if (category) {
        res.json(category);
    }
    else {
        res.json({ message: `Categorie ${categoryId} not found` });
    }
});


api.listen(5001, () => {
    console.log('Categories service started on port 5001');
}
);