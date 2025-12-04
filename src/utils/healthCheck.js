import { supabase } from '../config/database.js';

let healthCheckInterval = null;

/**
 * Start periodic health check that runs every 30 seconds
 */
export const startHealthCheck = () => {
  // Clear any existing interval
  if (healthCheckInterval) {
    clearInterval(healthCheckInterval);
  }

  // Run health check immediately
  performHealthCheck();

  // Set up interval to run every 30 seconds (30000ms)
  healthCheckInterval = setInterval(() => {
    performHealthCheck();
  }, 30000); // 30 seconds

  console.log('✅ Health check started (running every 30 seconds)');
};

/**
 * Stop the periodic health check
 */
export const stopHealthCheck = () => {
  if (healthCheckInterval) {
    clearInterval(healthCheckInterval);
    healthCheckInterval = null;
    console.log('⏹️  Health check stopped');
  }
};

/**
 * Perform a single health check
 */
const performHealthCheck = async () => {
  try {
    const { data, error } = await supabase.from('site_config').select('config_key').limit(1);
    
    const timestamp = new Date().toISOString();
    
    if (error) {
      console.error(`❌ [${timestamp}] Health check failed:`, error.message);
    } else {
      console.log(`✅ [${timestamp}] Health check passed`);
    }
  } catch (error) {
    const timestamp = new Date().toISOString();
    console.error(`❌ [${timestamp}] Health check error:`, error.message);
  }
};

