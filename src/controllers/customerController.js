const { validationResult } = require('express-validator');
const {
  createCustomer,
  findAllCustomers,
  findCustomerById,
  findCustomerByEmail,
  updateCustomer,
  deleteCustomer,
} = require('../services/customerService');

async function getAll(req, res) {
  try {
    const customers = await findAllCustomers();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getById(req, res) {
  try {
    const customer = await findCustomerById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function create(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email } = req.body;
    const exists = await findCustomerByEmail(email);
    if (exists) return res.status(409).json({ error: 'Email already exists' });

    const customer = await createCustomer(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function update(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const customer = await updateCustomer(req.params.id, req.body);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    const deleted = await deleteCustomer(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Customer not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
