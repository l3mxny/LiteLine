/**
 * Google Maps Service - Handles map initialization and directions
 */
class MapService {
    constructor() {
        this.map = null;
        this.directionsService = null;
        this.directionsRenderer = null;
        this.userMarker = null;
        this.blueLightMarkers = [];
    }
    // private currentRoute: google.maps.DirectionsResult | null = null; // Reserved for future use
    /**
     * Initialize the map
     */
    initMap(lat, lng) {
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            console.error('Map element not found');
            return;
        }
        this.map = new google.maps.Map(mapElement, {
            zoom: 16,
            center: { lat, lng },
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true
        });
        // Initialize directions service
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer({
            map: this.map,
            suppressMarkers: false
        });
        // Add user location marker
        this.addUserMarker(lat, lng);
        // Add click listener to set location by clicking on map
        this.map.addListener('click', (event) => {
            if (!event.latLng)
                return;
            const clickedLat = event.latLng.lat();
            const clickedLng = event.latLng.lng();
            // Ask user if they want to use this location
            if (confirm(`Set your location to:\n${clickedLat.toFixed(9)}, ${clickedLng.toFixed(9)}\n\nUse this location?`)) {
                if (window.app) {
                    window.app.setManualLocation(clickedLat, clickedLng);
                }
            }
        });
    }
    /**
     * Add marker for user's current location
     */
    addUserMarker(lat, lng) {
        if (!this.map)
            return;
        if (this.userMarker) {
            this.userMarker.setMap(null);
        }
        this.userMarker = new google.maps.Marker({
            position: { lat, lng },
            map: this.map,
            title: 'Your Location',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#4285F4',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3
            },
            animation: google.maps.Animation.DROP
        });
    }
    /**
     * Add markers for blue light stations
     */
    addBlueLightMarkers(blueLights) {
        if (!this.map)
            return;
        // Clear existing markers
        this.clearBlueLightMarkers();
        blueLights.forEach((blueLight, index) => {
            const marker = new google.maps.Marker({
                position: {
                    lat: blueLight.latitude,
                    lng: blueLight.longitude
                },
                map: this.map,
                title: blueLight.name,
                label: {
                    text: `${index + 1}`,
                    color: 'white',
                    fontWeight: 'bold'
                },
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 12,
                    fillColor: '#FF0000',
                    fillOpacity: 1,
                    strokeColor: '#ffffff',
                    strokeWeight: 2
                },
                animation: google.maps.Animation.DROP
            });
            // Add info window
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div style="padding: 10px;">
                        <h3 style="margin: 0 0 10px 0; color: #667eea;">${blueLight.name}</h3>
                        <p style="margin: 5px 0;"><strong>Distance:</strong> ${blueLight.distanceFormatted}</p>
                        <p style="margin: 5px 0;"><strong>Walking Time:</strong> ${blueLight.walkingTimeFormatted}</p>
                        <p style="margin: 5px 0; color: #666;">${blueLight.description}</p>
                        <button onclick="window.mapService.showRoute(${blueLight.latitude}, ${blueLight.longitude}, '${blueLight.name.replace(/'/g, "\\'")}')" 
                                style="margin-top: 10px; padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">
                            Get Directions
                        </button>
                    </div>
                `
            });
            marker.addListener('click', () => {
                infoWindow.open(this.map, marker);
            });
            this.blueLightMarkers.push(marker);
        });
        // Fit map to show all markers
        if (blueLights.length > 0) {
            this.fitBounds();
        }
    }
    /**
     * Clear all blue light markers
     */
    clearBlueLightMarkers() {
        this.blueLightMarkers.forEach(marker => marker.setMap(null));
        this.blueLightMarkers = [];
    }
    /**
     * Fit map bounds to show all markers
     */
    fitBounds() {
        if (this.blueLightMarkers.length === 0 || !this.map)
            return;
        const bounds = new google.maps.LatLngBounds();
        // Add user marker
        if (this.userMarker) {
            const pos = this.userMarker.getPosition();
            if (pos)
                bounds.extend(pos);
        }
        // Add all blue light markers
        this.blueLightMarkers.forEach(marker => {
            const pos = marker.getPosition();
            if (pos)
                bounds.extend(pos);
        });
        this.map.fitBounds(bounds);
    }
    /**
     * Show route from user location to destination
     */
    showRoute(destLat, destLng, _destName) {
        if (!this.userMarker || !this.directionsService) {
            console.error('Map not initialized');
            return;
        }
        const userPos = this.userMarker.getPosition();
        if (!userPos) {
            console.error('User position not available');
            return;
        }
        const origin = { lat: userPos.lat(), lng: userPos.lng() };
        const destination = { lat: destLat, lng: destLng };
        this.directionsService.route({
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.WALKING
        }, (result, status) => {
            if (status === 'OK' && result) {
                if (this.directionsRenderer) {
                    this.directionsRenderer.setDirections(result);
                }
                // this.currentRoute = result; // Reserved for future use
                this.displayDirections(result);
            }
            else {
                console.error('Directions request failed:', status);
                alert('Unable to calculate route. Please try again.');
            }
        });
    }
    /**
     * Display turn-by-turn directions
     */
    displayDirections(result) {
        const directionsPanel = document.getElementById('directions-panel');
        const directionsContent = document.getElementById('directions-content');
        if (!directionsPanel || !directionsContent)
            return;
        directionsPanel.style.display = 'block';
        const route = result.routes[0];
        if (!route || !route.legs || route.legs.length === 0)
            return;
        const leg = route.legs[0];
        const destinationAddress = leg.end_address || 'Destination';
        const distance = leg.distance?.text || 'Unknown';
        const duration = leg.duration?.text || 'Unknown';
        let html = `
            <div style="margin-bottom: 15px;">
                <p><strong>From:</strong> Your Location</p>
                <p><strong>To:</strong> ${destinationAddress}</p>
                <p><strong>Distance:</strong> ${distance}</p>
                <p><strong>Estimated Time:</strong> ${duration}</p>
            </div>
            <div style="border-top: 1px solid #ddd; padding-top: 15px;">
                <strong>Turn-by-turn directions:</strong>
                <ol style="margin-top: 10px; padding-left: 20px;">
        `;
        if (leg.steps) {
            leg.steps.forEach((step) => {
                html += `<li style="margin-bottom: 8px;">${step.instructions}</li>`;
            });
        }
        html += `
                </ol>
            </div>
        `;
        directionsContent.innerHTML = html;
        // Scroll to directions panel
        directionsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    /**
     * Clear current route
     */
    clearRoute() {
        if (this.directionsRenderer && this.map) {
            // Clear directions by removing the renderer
            this.directionsRenderer.setMap(null);
            this.directionsRenderer = new google.maps.DirectionsRenderer({
                map: this.map,
                suppressMarkers: false
            });
        }
        // this.currentRoute = null; // Reserved for future use
        const directionsPanel = document.getElementById('directions-panel');
        if (directionsPanel) {
            directionsPanel.style.display = 'none';
        }
    }
    /**
     * Center map on location
     */
    centerMap(lat, lng) {
        if (this.map) {
            this.map.setCenter({ lat, lng });
            this.map.setZoom(16);
        }
    }
    // Getter for map (for external access if needed)
    getMap() {
        return this.map;
    }
}
// Export singleton instance
const mapService = new MapService();
window.mapService = mapService; // Make it globally accessible for onclick handlers
export default mapService;
//# sourceMappingURL=map.js.map