const emailRegex = /\S+@\S+\.\S+/;
const userModels = require('../models/userModels');
const errors = require('../utils/errors');

const postUserServices = async (data) => {
  const { email, password, name } = data;

    if (!name) return errors.emptyValuesErr;

    if (!email) return errors.emptyValuesErr;

    if (!emailRegex.test(email)) return errors.emptyValuesErr;

    if (!password) return errors.emptyValuesErr;

  return { response: await userModels.postUserModel(data), status: 201 };
};

const loginService = async (data) => {
  const { email, password } = data;
  const findUserByEmail = await userModels.findUserByEmail(email);
  
  if (!email) return errors.emptyFieldsErr;

  if (!password) return errors.emptyFieldsErr;

  if (!emailRegex.test(email)) return errors.incorrectField;

  if (password !== findUserByEmail.password) return errors.incorrectField;

  return { response: await userModels.loginModel(data), status: 200 };
};

module.exports = {
  postUserServices,
  loginService,
};