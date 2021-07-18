const express = require('express');
const bodyParser = require('body-parser');

const usersRouter = require('../routes/usersRoutes');
const errorMiddleware = require('../middlewares/error');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', usersRouter);

app.use(errorMiddleware);

module.exports = app;
