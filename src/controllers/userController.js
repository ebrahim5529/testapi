const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  deleteUser,
} = require('../services/userService');

function generateToken(userId) {
  const secret = process.env.JWT_SECRET || '';
  const payload = { sub: userId };
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  const exists = await findUserByEmail(email);
  if (exists) {
    return res.status(409).json({ error: 'Email already in use' });
  }
  const user = await createUser({ name, email, password });
  const token = generateToken(user.id);
  res.status(201).json({
    user: { id: user.id, name: user.name, email: user.email },
    token,
  });
}

async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = generateToken(user.id);
  res.json({
    user: { id: user.id, name: user.name, email: user.email },
    token,
  });
}

async function me(req, res) {
  const user = await findUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json({ id: user.id, name: user.name, email: user.email });
}

async function update(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const data = {};
  if (req.body.name) data.name = req.body.name;
  if (req.body.email) data.email = req.body.email;
  if (req.body.password) data.password = req.body.password;
  const user = await updateUser(req.params.id, data);
  if (!user) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json({ id: user.id, name: user.name, email: user.email });
}

async function remove(req, res) {
  const deleted = await deleteUser(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json({ success: true });
}

module.exports = { register, login, me, update, remove };
