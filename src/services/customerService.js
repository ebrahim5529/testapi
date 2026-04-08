const Customer = require('../models/customerModel');

async function createCustomer(data) {
  return Customer.create(data);
}

async function findAllCustomers() {
  return Customer.findAll();
}

async function findCustomerById(id) {
  return Customer.findByPk(id);
}

async function findCustomerByEmail(email) {
  return Customer.findOne({ where: { email } });
}

async function updateCustomer(id, data) {
  const [updatedRows] = await Customer.update(data, {
    where: { id },
  });
  if (updatedRows === 0) return null;
  return Customer.findByPk(id);
}

async function deleteCustomer(id) {
  const deletedRows = await Customer.destroy({
    where: { id },
  });
  return deletedRows > 0;
}

module.exports = {
  createCustomer,
  findAllCustomers,
  findCustomerById,
  findCustomerByEmail,
  updateCustomer,
  deleteCustomer,
};
