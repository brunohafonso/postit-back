const express = require('express');
const load = require('express-load');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

module.exports = () => {
    const app = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(expressValidator());

    load('controllers', {cwd: 'app'})
        .then('model')
        .into(app);

    return app;
}