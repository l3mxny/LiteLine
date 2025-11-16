/**
 * Type definitions for SafeRoute application
 */
export interface Location {
    lat: number;
    lng: number;
}
export interface BlueLight {
    id: string;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    location: string;
    distance: number;
    distanceFormatted: string;
    walkingTime: number;
    walkingTimeFormatted: string;
    googleMapsUrl: string;
}
export interface BlueLightsResponse {
    success: boolean;
    count: number;
    location: Location;
    blueLights: BlueLight[];
}
export interface ApiOptions {
    limit?: number;
    maxDistance?: number | null;
}
export interface RecommendationContext {
    urgency?: string;
    timeOfDay?: string;
    [key: string]: any;
}
export interface HealthResponse {
    status: string;
    service: string;
    timestamp: string;
}
export type StatusType = 'loading' | 'success' | 'error';
declare global {
    interface Window {
        app: App;
        mapService: MapService;
        google: typeof google;
    }
}
export interface App {
    setManualLocation(lat: number, lng: number): void;
    init(): Promise<void>;
}
export interface MapService {
    showRoute(destLat: number, destLng: number, destName: string): void;
}
//# sourceMappingURL=index.d.ts.map