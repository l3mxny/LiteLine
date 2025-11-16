/**
 * Google Maps Service - Handles map initialization and directions
 */
import type { BlueLight } from './types/index.js';
declare class MapService {
    private map;
    private directionsService;
    private directionsRenderer;
    private userMarker;
    private blueLightMarkers;
    /**
     * Initialize the map
     */
    initMap(lat: number, lng: number): void;
    /**
     * Add marker for user's current location
     */
    addUserMarker(lat: number, lng: number): void;
    /**
     * Add markers for blue light stations
     */
    addBlueLightMarkers(blueLights: BlueLight[]): void;
    /**
     * Clear all blue light markers
     */
    clearBlueLightMarkers(): void;
    /**
     * Fit map bounds to show all markers
     */
    fitBounds(): void;
    /**
     * Show route from user location to destination
     */
    showRoute(destLat: number, destLng: number, _destName: string): void;
    /**
     * Display turn-by-turn directions
     */
    displayDirections(result: google.maps.DirectionsResult): void;
    /**
     * Clear current route
     */
    clearRoute(): void;
    /**
     * Center map on location
     */
    centerMap(lat: number, lng: number): void;
    getMap(): google.maps.Map | null;
}
declare const mapService: MapService;
export default mapService;
//# sourceMappingURL=map.d.ts.map