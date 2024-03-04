const express = require('express');
const controller = require('../controllers/itemController');
const router = express.Router();
const {fileUpload} = require('../middleware/upload');

//GET /items: sends all item listings
router.get('/', controller.index);

//GET /items/new: send html form for creating a new item listing
router.get('/new', controller.new);

//POST /items: create a new item listing
router.post('/', fileUpload, controller.create);

//GET /items/:id: sends the details of the item listing identified by the id
router.get('/:id', controller.show);

//GET /items/:id/edit: send html form for editing existing item listing
router.get('/:id/edit', controller.edit);

//PUT /items/:id: update the item listing identified by the id
router.put('/:id', fileUpload, controller.update);

//DELETE /items/:id: delete the item listing identified by the id
router.delete('/:id', controller.delete);

module.exports = router;