/**
 * API Service - Handles communication with the backend
 */
import type { BlueLightsResponse, ApiOptions, RecommendationContext, HealthResponse } from './types/index.js';
declare class ApiService {
    /**
     * Get nearest blue light stations
     */
    getNearestBlueLights(lat: number, lng: number, options?: ApiOptions): Promise<BlueLightsResponse>;
    /**
     * Get AI recommendation for best blue light
     */
    getRecommendation(lat: number, lng: number, context?: RecommendationContext): Promise<any>;
    /**
     * Health check
     */
    healthCheck(): Promise<HealthResponse>;
}
declare const apiService: ApiService;
export default apiService;
//# sourceMappingURL=api.d.ts.map