const rescue = require('express-rescue');
const service = require('../services/users');
const { CREATED, OK } = require('../constants/http.json');

const create = rescue(async (request, response, next) => {
  const { name, email, password, role = 'user' } = request.body;
  const newUser = await service.create({ name, email, password, role });
  if (newUser.err) return next(newUser.err);
  response.status(CREATED).json({
    user: {
      _id: newUser,
      name,
      email,
      role,
    },
  });
});

const login = rescue(async (request, response, next) => {
  const { email, password } = request.body;
  console.log(email);
  const token = await service.login({ email, password });
  console.log(token);
  if (token.err) return next(token.err);
  response.status(OK).json({ token });
});

module.exports = { create, login };
