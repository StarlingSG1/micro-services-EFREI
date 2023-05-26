const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const api = express();

api.use(bodyParser.json());

const books = [
    {
        id: 1,
        title: 'Harry Potter and the Sorcerer\'s stone',
        authorId: 1,
        categoryId: 1
    },
    {
        id: 2,
        title: 'Harry Potter and the Sorcerer\'s stone',
        authorId: 1,
        categoryId: 1
    },
    {
        id: 3,
        title: 'Harry Potter and the Sorcerer\'s stone',
        authorId: 1,
        categoryId: 1
    },
    {
        id: 4,
        title: 'Harry Potter and the Sorcerer\'s stone',
        authorId: 1,
        categoryId: 1
    },
];


api.get('/books', (req, res) => {
    res.send(books);
});

api.get('/books/:id', async (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find((book) => book.id === bookId);

    if (book) {
        try {
            const authorResponse = await axios.get(`http://localhost:4001/authors/${book.authorId}`);
            const categoryResponse = await axios.get(`http://localhost:5001/categories/${book.categoryId}`);
            const author = authorResponse.data;
            const category = categoryResponse.data;

            const bookDetail = {
                id: book.id,
                title: book.title,
                author: author.name,
                category: category.name
            };
            res.json(bookDetail);
        }
        catch (error) {
            console.log(error);
        }
    }
});

api.post('/books', (req, res) => {
    const book = req.body;
    books.push(book);
    res.json(book);
});

api.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex((book) => book.id === bookId);

    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1);
        res.json(deletedBook);
    } else {
        res.status(404).json({ message: `Book ${bookId} not found` });
    }
});



api.listen(3001, () => {
    console.log('Books service started on port 3001');
}
);