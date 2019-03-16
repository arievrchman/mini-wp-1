require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

var indexRouter = require('./routes/index');
var articlesRouter = require('./routes/articles');

var app = express();

let db_connection = 'mongodb://localhost/zapress';
mongoose.connect(db_connection, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('DB Connected!')).on('error', (error) => console.log('connection error:', error));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/articles', articlesRouter);

module.exports = app;
