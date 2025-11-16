/**
 * API Service - Handles communication with the backend
 */
const API_BASE_URL = 'http://localhost:3000';
class ApiService {
    /**
     * Get nearest blue light stations
     */
    async getNearestBlueLights(lat, lng, options = {}) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/safety/nearest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    location: { lat, lng },
                    options: {
                        limit: options.limit || 5,
                        maxDistance: options.maxDistance || null
                    }
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching blue lights:', error);
            throw error;
        }
    }
    /**
     * Get AI recommendation for best blue light
     */
    async getRecommendation(lat, lng, context = {}) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/safety/recommend`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    location: { lat, lng },
                    context: context,
                    options: {
                        limit: 5
                    }
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error getting recommendation:', error);
            throw error;
        }
    }
    /**
     * Health check
     */
    async healthCheck() {
        try {
            const response = await fetch(`${API_BASE_URL}/health`);
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Health check failed:', error);
            throw error;
        }
    }
}
// Export singleton instance
const apiService = new ApiService();
export default apiService;
//# sourceMappingURL=api.js.map