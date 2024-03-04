const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

app.use(express.static('public')); //allows to show static files like css and images
app.use(express.urlencoded({extended: true})); //allows to parse data in the request body (helps with POST requests)
app.use(morgan('tiny')); //log all requests and resposnes in the terminal
app.use(methodOverride('_method')); //allows to use PUT and DELETE

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/items', itemRoutes);

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error', {error: err});
});

app.listen(port, host, () => {
    console.log('Server running on port', port);
});