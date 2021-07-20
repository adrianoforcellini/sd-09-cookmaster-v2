const express = require('express');
const validateToken = require('../services/validateToken');
const users = require('../controllers/users');
const recipes = require('../controllers/recipes');

const router = express.Router();

router.post('/users', users.createUser);
router.post('/login', users.login);

router.post('/recipes', validateToken, recipes.createRecipe);

module.exports = router;