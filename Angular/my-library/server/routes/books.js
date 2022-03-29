var express = require('express');
var router = express.Router();
module.exports = router; 
const sequenceGenerator = require('./sequenceGenerator');
const Book = require('../models/book');

// GET
router.get('/', (req, res, next) => {
  Book.find()
    .then(books => {
      res.status(200).json(books);
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred when loading books',
        error: error
      });
    });
});

// POST
router.post('/', (req, res, next) => {
  const maxBookId = sequenceGenerator.nextId("books");

  const book = new Book({
    id: maxBookId,
    title: req.body.title,
    series: req.body.series,
    first: req.body.first,
    last: req.body.last,
    url: req.body.url,
    read: req.body.read

  });

  book.save()
    .then(createdBook => {
      res.status(201).json({
        message: 'Book added successfully',
        book: createdBook
      });
    })
    .catch(error => {
       res.status(500).json({
          message: 'An error occurred while adding the book',
          error: error
        });
    });
});

// PUT
router.put('/:id', (req, res, next) => {
  Book.findOne({ id: req.params.id })
    .then(book => {
      book.title = req.body.title;
      book.series = req.body.series;
      book.first = req.body.first;
      book.last = req.body.last;
      book.url = req.body.url;
      book.read = req.body.read;

      Book.updateOne({ id: req.params.id }, book)
        .then(result => {
          res.status(204).json({
            message: 'Book updated successfully'
          })
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred while updating book',
           error: error
         });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Book not found.',
        error: { message: 'Book not found'}
      });
    });
});

// DELETE
router.delete("/:id", (req, res, next) => {
  Book.findOne({ id: req.params.id })
    .then(message => {
      Book.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Book deleted successfully"
          });
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred while deleting book',
           error: error
         });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Book not found.',
        error: { message: 'Book not found'}
      });
    });
});