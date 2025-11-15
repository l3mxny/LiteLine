import express from 'express';
import blueLightsService from '../services/blueLights.js';

const router = express.Router();

/**
 * POST /api/safety/nearest
 * Get nearest Blue Light stations
 * 
 * Request body:
 * {
 *   "location": { "lat": 38.991888, "lng": -76.942207 },
 *   "options": { "maxDistance": 1000, "limit": 5 }
 * }
 */
router.post('/nearest', async (req, res) => {
  try {
    const { location, options = {} } = req.body;

    // Validate input
    if (!location || !location.lat || !location.lng) {
      return res.status(400).json({
        error: 'Invalid location',
        message: 'Please provide location with lat and lng'
      });
    }

    // Call Person 1's service
    const { lat, lng } = location;
    const { maxDistance = null, limit = 5 } = options;
    
    const blueLights = blueLightsService.getNearestBlueLights(
      lat,
      lng,
      limit,
      maxDistance
    );
    
    return res.json({
      success: true,
      count: blueLights.length,
      location: { lat, lng },
      blueLights: blueLights
    });

  } catch (error) {
    console.error('Error in /api/safety/nearest:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * POST /api/safety/recommend
 * Get AI-powered recommendation for best Blue Light
 * 
 * Request body:
 * {
 *   "location": { "lat": 38.991888, "lng": -76.942207 },
 *   "context": { "urgency": "high", "timeOfDay": "evening" },
 *   "options": { "maxDistance": 1000, "limit": 5 }
 * }
 */
router.post('/recommend', async (req, res) => {
  try {
    const { location, context = {}, options = {} } = req.body;

    // Validate input
    if (!location || !location.lat || !location.lng) {
      return res.status(400).json({
        error: 'Invalid location',
        message: 'Please provide location with lat and lng'
      });
    }

    // TODO: Call Person 1's service, then Gemini
    // import { getNearestBlueLights } from '../services/blueLights.js';
    // import { geminiService } from '../services/gemini.js';
    // const blueLights = await getNearestBlueLights({ location, options });
    // const recommendation = await geminiService.recommendBlueLight(blueLights, context);
    
    // For now, return placeholder
    return res.status(503).json({
      error: 'Service not ready',
      message: 'Recommendation service is being set up.',
      hint: 'Waiting for Person 1\'s blueLights service and Gemini integration.'
    });

  } catch (error) {
    console.error('Error in /api/safety/recommend:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * GET /api/safety/health
 * Health check for safety service
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'safety',
    timestamp: new Date().toISOString()
  });
});

export default router;

