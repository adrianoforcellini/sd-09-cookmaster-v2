const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const usersController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');
const errorController = require('../controllers/errorController');

app.use(bodyParser.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/', usersController);
app.use('/', recipesController);

app.use(errorController);

module.exports = app;
