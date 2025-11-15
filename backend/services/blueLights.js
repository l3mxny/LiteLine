import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const blueLightsData = require('../data/blueLights.json');

/**
 * Blue Light Phone Service
 * Finds nearest Blue Light phones based on user location
 */
class BlueLightsService {
  constructor() {
    this.blueLights = blueLightsData;
  }

  /**
   * Calculate distance between two coordinates using Haversine formula
   * @param {number} lat1 - Latitude of first point
   * @param {number} lon1 - Longitude of first point
   * @param {number} lat2 - Latitude of second point
   * @param {number} lon2 - Longitude of second point
   * @returns {number} Distance in meters
   */
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Earth's radius in meters
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  }

  /**
   * Convert degrees to radians
   * @param {number} degrees
   * @returns {number} Radians
   */
  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * Format distance in a human-readable format
   * @param {number} distanceInMeters - Distance in meters
   * @returns {string} Formatted distance string
   */
  formatDistance(distanceInMeters) {
    // Convert to feet for US audience (1 meter = 3.28084 feet)
    const feet = distanceInMeters * 3.28084;
    
    if (feet < 528) { // Less than 0.1 miles (528 feet)
      return `${Math.round(feet)} feet`;
    } else {
      const miles = (feet / 5280).toFixed(2);
      return `${miles} miles`;
    }
  }

  /**
   * Calculate estimated walking time in minutes
   * Assumes average walking speed of 3.1 mph (1.38 m/s or 4.55 ft/s)
   * @param {number} distanceInMeters - Distance in meters
   * @returns {number} Walking time in minutes
   */
  calculateWalkingTime(distanceInMeters) {
    const walkingSpeedMps = 1.38; // meters per second (3.1 mph)
    const timeInSeconds = distanceInMeters / walkingSpeedMps;
    const timeInMinutes = timeInSeconds / 60;
    return Math.round(timeInMinutes * 10) / 10; // Round to 1 decimal place
  }

  /**
   * Format walking time in a human-readable format
   * @param {number} timeInMinutes - Walking time in minutes
   * @returns {string} Formatted time string
   */
  formatWalkingTime(timeInMinutes) {
    if (timeInMinutes < 1) {
      return 'Less than 1 minute';
    } else if (timeInMinutes === 1) {
      return '1 minute';
    } else {
      return `${timeInMinutes} minutes`;
    }
  }

  /**
   * Generate Google Maps URL for directions to a location
   * @param {number} latitude - Latitude of destination
   * @param {number} longitude - Longitude of destination
   * @param {string} name - Location name (optional)
   * @param {number} userLat - User's latitude (optional, for directions)
   * @param {number} userLon - User's longitude (optional, for directions)
   * @returns {string} Google Maps URL for directions or location
   */
  generateGoogleMapsUrl(latitude, longitude, name = '', userLat = null, userLon = null) {
    // If user location is provided, create directions URL
    if (userLat !== null && userLon !== null) {
      const encodedName = encodeURIComponent(name || 'Blue Light Station');
      // Google Maps directions URL format
      return `https://www.google.com/maps/dir/${userLat},${userLon}/${latitude},${longitude}/@${latitude},${longitude},15z?entry=ttu`;
    }
    
    // Otherwise, just link to the location
    const encodedName = encodeURIComponent(name);
    return `https://www.google.com/maps?q=${latitude},${longitude}${name ? `&query=${encodedName}` : ''}`;
  }

  /**
   * Get nearest Blue Light phones to a given location
   * @param {number} userLat - User's latitude
   * @param {number} userLon - User's longitude
   * @param {number} limit - Maximum number of results (default: 5)
   * @param {number} maxDistance - Maximum distance in meters (optional, no limit if not provided)
   * @returns {Array} Array of nearest Blue Light phones with distance, walking time, and map URL
   */
  getNearestBlueLights(userLat, userLon, limit = 5, maxDistance = null) {
    // Validate coordinates
    if (
      typeof userLat !== 'number' ||
      typeof userLon !== 'number' ||
      isNaN(userLat) ||
      isNaN(userLon)
    ) {
      throw new Error('Invalid coordinates. Latitude and longitude must be valid numbers.');
    }

    if (userLat < -90 || userLat > 90) {
      throw new Error('Invalid latitude. Must be between -90 and 90.');
    }

    if (userLon < -180 || userLon > 180) {
      throw new Error('Invalid longitude. Must be between -180 and 180.');
    }

    // Calculate distance and walking time for each Blue Light
    const blueLightsWithDistance = this.blueLights.map((blueLight) => {
      const distance = this.calculateDistance(
        userLat,
        userLon,
        blueLight.latitude,
        blueLight.longitude
      );
      
      const walkingTime = this.calculateWalkingTime(distance);

      return {
        ...blueLight,
        distance: distance, // Distance in meters
        distanceFormatted: this.formatDistance(distance), // Formatted as feet/miles
        walkingTime: walkingTime, // Walking time in minutes
        walkingTimeFormatted: this.formatWalkingTime(walkingTime), // Formatted time string
        googleMapsUrl: this.generateGoogleMapsUrl(
          blueLight.latitude,
          blueLight.longitude,
          blueLight.name,
          userLat,
          userLon
        )
      };
    });

    // Filter by max distance if provided
    let filteredBlueLights = blueLightsWithDistance;
    if (maxDistance !== null && maxDistance > 0) {
      filteredBlueLights = blueLightsWithDistance.filter(
        (blueLight) => blueLight.distance <= maxDistance
      );
    }

    // Sort by distance (nearest first)
    filteredBlueLights.sort((a, b) => a.distance - b.distance);

    // Return top N results
    return filteredBlueLights.slice(0, limit);
  }

  /**
   * Get all Blue Light phones (for reference)
   * @returns {Array} All Blue Light phones
   */
  getAllBlueLights() {
    return this.blueLights;
  }

  /**
   * Get Blue Light by ID
   * @param {string} id - Blue Light ID
   * @returns {Object|null} Blue Light object or null if not found
   */
  getBlueLightById(id) {
    return this.blueLights.find((blueLight) => blueLight.id === id) || null;
  }
}

// Export singleton instance
const blueLightsService = new BlueLightsService();
export default blueLightsService;

