const bcrypt = require('bcrypt');
const User = require('../models/userModel');

async function createUser({ name, email, password }) {
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  return user;
}

async function findUserByEmail(email) {
  return User.findOne({ where: { email } });
}

async function findUserById(id) {
  return User.findByPk(id);
}

async function updateUser(id, data) {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  const [updatedRows] = await User.update(data, {
    where: { id },
  });
  if (updatedRows === 0) {
    return null; // User not found
  }
  return User.findByPk(id);
}

async function deleteUser(id) {
  const deletedRows = await User.destroy({
    where: { id },
  });
  return deletedRows > 0; // Return true if user was deleted, false otherwise
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  deleteUser,
};
