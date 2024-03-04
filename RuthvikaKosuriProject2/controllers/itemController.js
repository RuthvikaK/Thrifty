const model = require('../models/item');

//GET /items: sends all item listings
exports.index = (req, res) =>{
    if(req.query.search == undefined) {
        let items = model.find();
        res.render('./item/items', {items});
    }
    else {
        let items = model.findBySearch(req.query.search);
        res.render('./item/items', {items});
    }
};

//GET /items/new: send html form for creating a new item listing
exports.new = (req, res) =>{
    res.render('./item/new');
};

//POST /items: create a new item listing
exports.create = (req, res) =>{
    // res.send('create a new item');
    let item = req.body;
    if(req.file) {
        item.image = '/images/' + req.file.filename;
    }
    model.save(item);
    res.redirect('/items');
};

//GET /items/:id: sends the details of the item listing identified by the id
exports.show = (req, res, next) =>{
    let id = req.params.id;
    let item = model.findById(id);
    if(item) {
        res.render('./item/item', {item});
    }
    else {
        let err = new Error('Cannot find item with id ' + id);
        err.status = 404;
        next(err);
    }
};

//GET /items/:id/edit: sned html form for editing existing item listing
exports.edit = (req, res, next) =>{
    let id = req.params.id;
    let item = model.findById(id);
    if(item) {
        res.render('./item/edit', {item});
    }
    else {
        let err = new Error('Cannot find item with id ' + id);
        err.status = 404;
        next(err);
    }
};

//PUT /items/:id: update the item listing identified by the id
exports.update = (req, res, next) =>{
    let item = req.body;
    let id = req.params.id;
    if(req.file) {
        item.image = '/images/' + req.file.filename;
    }
    if(model.updateById(id, item)) {
        res.redirect('/items/'+id);
    }
    else {
        let err = new Error('Cannot find item with id ' + id);
        err.status = 404;
        next(err);
    }
};

//DELETE /items/:id: delete the item listing identified by the id
exports.delete = (req, res, next) =>{
    let id = req.params.id;
    if(model.deleteById(id)) {
        res.redirect('/items');
    }
    else {
        let err = new Error('Cannot find item with id ' + id);
        err.status = 404;
        next(err);
    }
};