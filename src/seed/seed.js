require('dotenv').config();
const bcrypt = require('bcrypt');
const { connectDB, sequelize } = require('../config/db');
const User = require('../models/userModel');
const Customer = require('../models/customerModel');
const logger = require('../utils/logger');

async function seed() {
  try {
    // الاتصال بقاعدة البيانات
    await connectDB();
    
    // مسح البيانات القديمة (اختياري، يفضل استخدامه بحذر)
    // await sequelize.sync({ force: true }); 
    
    logger.info('Starting database seeding...');

    // 1. إضافة مستخدمين تجريبيين
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = await User.bulkCreate([
      { name: 'Admin User', email: 'admin@example.com', password: hashedPassword },
      { name: 'Sales Manager', email: 'sales@example.com', password: hashedPassword }
    ], { ignoreDuplicates: true });
    
    logger.info(`${users.length} Users seeded.`);

    // 2. إضافة عملاء تجريبيين
    const customers = await Customer.bulkCreate([
      { name: 'شركة التقنية العربية', email: 'info@arabtech.com', phone: '0501234567', address: 'الرياض، السعودية' },
      { name: 'مؤسسة النور للتجارة', email: 'contact@alnoor.com', phone: '0559876543', address: 'جدة، السعودية' },
      { name: 'أحمد محمود', email: 'ahmed@gmail.com', phone: '0560001112', address: 'الدمام، السعودية' },
      { name: 'Global Solutions', email: 'sales@globalsolutions.com', phone: '+97150111222', address: 'Dubai, UAE' }
    ], { ignoreDuplicates: true });

    logger.info(`${customers.length} Customers seeded.`);

    logger.info('Database seeded successfully! 🌱');
    process.exit(0);
  } catch (err) {
    logger.error(`Error seeding database: ${err.message}`);
    process.exit(1);
  }
}

seed();
