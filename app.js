/* eslint-disable no-unused-vars */
require("dotenv").config();

const express = require("express");

const cors = require("cors");

const morgan = require('morgan');

const jwt = require("jsonwebtoken");

const app = express();

const bcrypt = require("bcrypt");

// app.use(cors({
//     origin: 'http://localhost:3002'
// }));

// Setup your Middleware and API Router here

app.use(morgan('dev'));

app.use(express.json())

const router = require('./api');
app.use('/api', router);

app.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
    next();
});


module.exports = app;
