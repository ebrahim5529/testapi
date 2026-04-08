const { Router } = require('express');
const { body, param } = require('express-validator');
const { register, login, me, update, remove } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const dbReady = require('../middlewares/dbReady');

const router = Router();

router.post(
  '/register',
  [
    dbReady,
    body('name').isString().isLength({ min: 2 }).trim(),
    body('email').isEmail().normalizeEmail(),
    body('password').isString().isLength({ min: 6 })
  ],
  register
);

router.post(
  '/login',
  [dbReady, body('email').isEmail().normalizeEmail(), body('password').isString().isLength({ min: 6 })],
  login
);

router.get('/me', dbReady, auth, me);

router.patch(
  '/:id',
  dbReady,
  auth,
  [
    param('id').isString(),
    body('name').optional().isString().isLength({ min: 2 }).trim(),
    body('email').optional().isEmail().normalizeEmail(),
    body('password').optional().isString().isLength({ min: 6 })
  ],
  update
);

router.delete('/:id', dbReady, auth, [param('id').isString()], remove);

module.exports = router;
