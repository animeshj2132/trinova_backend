import app from './src/app.js';
import dotenv from 'dotenv';
import { testConnection } from './src/config/database.js';
import bcrypt from 'bcryptjs';
import { supabase } from './src/config/database.js';
import { startHealthCheck } from './src/utils/healthCheck.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialize server
const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('❌ Failed to connect to database. Please check your configuration.');
      process.exit(1);
    }

    // Initialize admin user if it doesn't exist
    await initializeAdmin();

    // Start server
    app.listen(PORT, () => {
      console.log(`\n🚀 Server is running on port ${PORT}`);
      console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 API URL: http://localhost:${PORT}/api`);
      console.log(`\n✅ Backend is ready!\n`);
      
      // Start periodic health check (every 30 seconds)
      startHealthCheck();
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Initialize admin user
const initializeAdmin = async () => {
  try {
    // Check if any admin exists
    const { data: admins, error: checkError } = await supabase
      .from('admins')
      .select('id')
      .limit(1);

    if (checkError) {
      console.warn('⚠️  Could not check for existing admins:', checkError.message);
      return;
    }

    // If no admins exist, create one from environment variables
    if (!admins || admins.length === 0) {
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (!adminEmail || !adminPassword) {
        console.warn('⚠️  No admin credentials found in .env. Please create an admin manually or set ADMIN_EMAIL and ADMIN_PASSWORD.');
        return;
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(adminPassword, salt);

      // Create admin
      const { data: admin, error } = await supabase
        .from('admins')
        .insert([
          {
            email: adminEmail,
            password_hash: passwordHash,
            role: 'super_admin'
          }
        ])
        .select()
        .single();

      if (error) {
        console.warn('⚠️  Could not create initial admin:', error.message);
        return;
      }

      console.log(`✅ Initial admin created: ${adminEmail}`);
      console.log('⚠️  Please change the default password after first login!');
    } else {
      console.log('✅ Admin user(s) already exist');
    }
  } catch (error) {
    console.warn('⚠️  Error initializing admin:', error.message);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// Start the server
startServer();

