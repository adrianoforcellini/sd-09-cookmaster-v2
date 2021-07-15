const connection = require('./connection');

const DB_COLLECTION = 'recipes';

const create = async (recipeInfo, user) => {
  const createdUser = await connection()
    .then((db) => db.collection(DB_COLLECTION)
      .insertOne({ ...recipeInfo, userId: user }));

  return { recipe: createdUser.ops[0] };
};

const getAll = async () => (
  connection().then((db) => db.collection(DB_COLLECTION).find().toArray())
);

module.exports = {
  create,
  getAll,
};
