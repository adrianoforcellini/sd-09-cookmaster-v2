const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares/recipes');

const recipesController = require('../controller/recipes');

router.post(
  '/',
  middlewares.validateData,
  middlewares.tokenValidation,
  middlewares.tokenMalformed,
  recipesController.createRecipes,
);

router.get('/', recipesController.getAllRecipes);
router.get('/:id', middlewares.validateId, recipesController.getRecipesById);
module.exports = router;