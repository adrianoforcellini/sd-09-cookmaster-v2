const { ObjectId } = require('mongodb');
const connection = require('./connection');

const recipeNotFound = Object.assign(
  new Error('recipe not found'),
  { code: 'notFound' },
);

const getAll = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes')
      .find({}));

  return recipes.toArray();
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw recipeNotFound;
  }

  const recipe = await connection()
    .then((db) => db.collection('recipes')
      .findOne({ _id: ObjectId(id) }));
      
  if (!recipe) {
    throw recipeNotFound;
  }

  return recipe;
};

const create = async (name, ingredients, preparation, userId) => {
  const result = await connection()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }));

  return result.ops[0];
};

const update = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) {
    throw recipeNotFound;
  }

  const result = await connection().then((db) =>
    db
      .collection('recipes')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
      ));

  if (result.modifiedCount) {
    return getById(id);
  }
};

module.exports = {
  getById,
  getAll,
  create,
  update,
};
