const { Router } = require('express');
const { body, param } = require('express-validator');
const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../controllers/customerController');
const auth = require('../middlewares/authMiddleware');
const dbReady = require('../middlewares/dbReady');

const router = Router();

// Apply dbReady to all routes
router.use(dbReady);

router.get('/', auth, getAll);
router.get('/:id', auth, [param('id').isInt()], getById);

router.post(
  '/',
  auth,
  [
    body('name').isString().isLength({ min: 2 }).trim(),
    body('email').isEmail().normalizeEmail(),
    body('phone').optional().isString().trim(),
    body('address').optional().isString().trim(),
  ],
  create
);

router.patch(
  '/:id',
  auth,
  [
    param('id').isInt(),
    body('name').optional().isString().isLength({ min: 2 }).trim(),
    body('email').optional().isEmail().normalizeEmail(),
    body('phone').optional().isString().trim(),
    body('address').optional().isString().trim(),
  ],
  update
);

router.delete('/:id', auth, [param('id').isInt()], remove);

module.exports = router;
