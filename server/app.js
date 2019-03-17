require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const indexRouter = require('./routes/index');
const articlesRouter = require('./routes/articles');
const tagsRouter = require('./routes/tags');

const app = express();

// let db_connection = process.env.DB_URL;
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
app.use('/tags', tagsRouter);

module.exports = app;
