import { supabase } from '../config/database.js';

// Get site configuration (public)
export const getSiteConfig = async (req, res, next) => {
  try {
    const { data: configs, error } = await supabase
      .from('site_config')
      .select('*');

    if (error) throw error;

    // Convert array to object
    const config = {};
    configs.forEach(item => {
      if (item.config_type === 'json') {
        try {
          config[item.config_key] = JSON.parse(item.config_value);
        } catch {
          config[item.config_key] = item.config_value;
        }
      } else {
        config[item.config_key] = item.config_value;
      }
    });

    res.json({
      success: true,
      data: { config }
    });
  } catch (error) {
    next(error);
  }
};

// Update site configuration (admin)
export const updateSiteConfig = async (req, res, next) => {
  try {
    const { config } = req.body; // Object with config_key: config_value pairs

    if (!config || typeof config !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Config must be an object'
      });
    }

    const updates = Object.entries(config).map(async ([key, value]) => {
      const configType = typeof value === 'object' ? 'json' : 'text';
      const configValue = configType === 'json' ? JSON.stringify(value) : value;

      const { error } = await supabase
        .from('site_config')
        .upsert({
          config_key: key,
          config_value: configValue,
          config_type: configType,
          updated_by: req.admin.id
        }, {
          onConflict: 'config_key'
        });

      if (error) throw error;
    });

    await Promise.all(updates);

    res.json({
      success: true,
      message: 'Site configuration updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

