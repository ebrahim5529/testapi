const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // تم تعطيل التحقق من الدخول (Login check disabled as requested)
  // سنقوم بتمرير مستخدم افتراضي (id: 1) لضمان عمل المسارات التي تعتمد عليه
  req.user = { id: 1 };
  return next();

  /* الكود الأصلي المعطل مؤقتاً:
  const header = req.headers.authorization || '';
  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    req.user = { id: decoded.sub };
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  */
}

module.exports = authMiddleware;
