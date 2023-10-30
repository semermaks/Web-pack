const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');

const authRouter = require('./routes/auth.js');
const categoryRouter = require('./routes/category.js');
const keys = require('./config/keys');

const app = express();

app.use(passport.initialize());
require('./middleware/passport')(passport);

mongoose.connect(keys.mongoUrl)
    .then( () => console.log('MongoDB connected!!!'))
    .catch( err => {console.log("Error, no connected to MongoDB", err)});

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

/* app.get('/login', (req, res) => {
    res.end('Hello!!!');
});
app.get('/register', (req, res) => {
    res.end('Hello!!!');
}); */

/* app.get('/register2', (req, res) => {
    res.end('Hello!!!');
}); */

app.use('/api/auth/', authRouter);
app.use('/api/category/', categoryRouter);

app.listen(5000, () => console.log('Server started on 5000'));