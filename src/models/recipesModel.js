const { ObjectId } = require('mongodb');
const connection = require('./connection');
// const response = require('../middlewares/responseCodes');

const postRecipe = async (recipeInfo, userInfo) => {
  const { _id } = userInfo;
  const { name, ingredients, preparation } = recipeInfo;
  const newRecipe = await connection()
    .then((db) => db.collection('recipes').insertOne({
        name,
        ingredients,
        preparation,
        userId: _id,
    }));
    return newRecipe.ops[0];
};

const getAllRecipes = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

const getRecipeById = async (recipeId) => {
  const foundRecipe = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(recipeId) }));
  if (!foundRecipe) return null;
  return foundRecipe;
};

const updateRecipe = async (recipeId, recipeInfo) => {
  const { name, ingredients, preparation } = recipeInfo;
  const updatedRecipe = await connection()
    .then((db) => db.collection('recipes').findOneAndUpdate(
      { _id: ObjectId(recipeId) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
      ));
  return updatedRecipe.value;
};

const deleteRecipe = async (recipeId) => {
  const recipeToDelete = await getRecipeById(recipeId);
  if (!recipeToDelete) return null;
  const deletedRecipe = await connection().then((db) => db.collection('recipes').deleteOne(
    { _id: ObjectId(recipeId) },
  ));
  return deletedRecipe;
};

module.exports = {
  postRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
