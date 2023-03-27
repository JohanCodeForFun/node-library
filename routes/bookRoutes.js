const express = require('express');
const bookController = require('../bookControllers/bookControllers');

const router = express.Router();

router.get('/', bookController.book_index)

router.post('/', bookController.book_create_post)
router.get('/create', bookController.book_create_get)
router.get('/:id', bookController.book_details)
router.delete('/:id', bookController.book_delete)

module.exports = router;