/**
 * Main Application Logic
 */
import apiService from './api.js';
import mapService from './map.js';
class App {
    constructor() {
        this.userLocation = null;
        this.blueLights = [];
        // Reserved for future use
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this._selectedBlueLight = null;
        // Reserved for future use
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this._locationAccuracy = null;
    }
    /**
     * Initialize the application
     */
    async init() {
        // Check if Google Maps API key is set
        if (window.google && window.google.maps) {
            console.log('✅ Google Maps API loaded');
        }
        else {
            this.updateStatus('⚠️ Please set your Google Maps API key in index.html', 'error');
            return;
        }
        // Get user's location
        await this.getUserLocation();
        // Set up event listeners
        this.setupEventListeners();
    }
    /**
     * Get user's current location using browser geolocation
     */
    async getUserLocation() {
        this.updateStatus('📍 Getting your location...', 'loading');
        if (!navigator.geolocation) {
            this.updateStatus('❌ Geolocation is not supported by your browser', 'error');
            return;
        }
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const accuracy = position.coords.accuracy; // in meters
                this.userLocation = { lat, lng };
                this._locationAccuracy = accuracy;
                // Display location info
                this.displayLocationInfo(lat, lng, accuracy);
                this.updateStatus(`✅ Location found: ${lat.toFixed(9)}, ${lng.toFixed(9)} (Accuracy: ±${Math.round(accuracy)}m)`, 'success');
                // Initialize map with user location
                mapService.initMap(lat, lng);
                // Enable find button
                const findBtn = document.getElementById('findNearestBtn');
                if (findBtn) {
                    findBtn.disabled = false;
                }
                resolve({ lat, lng });
            }, (error) => {
                let errorMessage = '❌ Unable to get your location. ';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage += 'Please allow location access.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage += 'Location information unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage += 'Location request timed out.';
                        break;
                    default:
                        errorMessage += 'An unknown error occurred.';
                        break;
                }
                this.updateStatus(errorMessage, 'error');
                reject(error);
            }, {
                enableHighAccuracy: true,
                timeout: 15000, // Increased timeout for better accuracy
                maximumAge: 0 // Don't use cached location
            });
        });
    }
    /**
     * Find nearest blue lights
     */
    async findNearestBlueLights() {
        if (!this.userLocation) {
            this.updateStatus('❌ Please get your location first', 'error');
            return;
        }
        const btn = document.getElementById('findNearestBtn');
        if (!btn)
            return;
        btn.disabled = true;
        btn.innerHTML = '<span class="loading"></span> Finding...';
        try {
            // Check backend health
            await apiService.healthCheck();
            // Get nearest blue lights
            const data = await apiService.getNearestBlueLights(this.userLocation.lat, this.userLocation.lng, { limit: 5 });
            this.blueLights = data.blueLights;
            this.displayBlueLights(this.blueLights);
            // Add markers to map
            mapService.addBlueLightMarkers(this.blueLights);
            this.updateStatus(`✅ Found ${data.count} nearest blue light station(s)`, 'success');
        }
        catch (error) {
            console.error('Error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.updateStatus(`❌ Error: ${errorMessage}. Make sure the backend server is running on http://localhost:3000`, 'error');
        }
        finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = 'Find Nearest Blue Light';
            }
        }
    }
    /**
     * Display blue lights in the results list
     */
    displayBlueLights(blueLights) {
        const resultsContainer = document.getElementById('results');
        const blueLightsList = document.getElementById('blueLightsList');
        if (!resultsContainer || !blueLightsList)
            return;
        resultsContainer.style.display = 'block';
        blueLightsList.innerHTML = '';
        blueLights.forEach((blueLight, index) => {
            const card = document.createElement('div');
            card.className = 'blue-light-card';
            card.dataset.index = index.toString();
            card.innerHTML = `
                <h3>${index + 1}. ${blueLight.name}</h3>
                <div class="info">
                    <div class="info-item">
                        <strong>📍</strong>
                        <span>${blueLight.distanceFormatted}</span>
                    </div>
                    <div class="info-item">
                        <strong>🚶</strong>
                        <span>${blueLight.walkingTimeFormatted}</span>
                    </div>
                    <div class="info-item">
                        <strong>📝</strong>
                        <span>${blueLight.description}</span>
                    </div>
                </div>
                <div class="actions">
                    <button class="btn-small btn-route" onclick="window.app.showRoute(${index})">
                        Show Route on Map
                    </button>
                    <button class="btn-small btn-maps" onclick="window.open('${blueLight.googleMapsUrl}', '_blank')">
                        Open in Google Maps
                    </button>
                </div>
            `;
            // Add click handler to select card
            card.addEventListener('click', (e) => {
                if (e.target.tagName !== 'BUTTON') {
                    this.selectBlueLight(index);
                }
            });
            blueLightsList.appendChild(card);
        });
    }
    /**
     * Select a blue light and show its route
     */
    selectBlueLight(index) {
        // Update card selection
        document.querySelectorAll('.blue-light-card').forEach((card, i) => {
            if (i === index) {
                card.classList.add('selected');
            }
            else {
                card.classList.remove('selected');
            }
        });
        const blueLight = this.blueLights[index];
        this._selectedBlueLight = blueLight;
        // Show route on map
        mapService.showRoute(blueLight.latitude, blueLight.longitude, blueLight.name);
    }
    /**
     * Show route for a specific blue light
     */
    showRoute(index) {
        this.selectBlueLight(index);
    }
    /**
     * Update status message
     */
    updateStatus(message, type = 'loading') {
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = `status-card ${type}`;
        }
    }
    /**
     * Display location information
     */
    displayLocationInfo(lat, lng, accuracy) {
        const locationInfo = document.getElementById('locationInfo');
        const currentCoords = document.getElementById('currentCoords');
        const locationAccuracy = document.getElementById('locationAccuracy');
        if (!locationInfo || !currentCoords || !locationAccuracy)
            return;
        locationInfo.style.display = 'block';
        currentCoords.textContent = `${lat.toFixed(9)}, ${lng.toFixed(9)}`;
        let accuracyText = `±${Math.round(accuracy)} meters`;
        if (accuracy > 100) {
            accuracyText += ' ⚠️ Low accuracy - try refreshing or enter manually';
        }
        else if (accuracy > 50) {
            accuracyText += ' ⚠️ Moderate accuracy';
        }
        else {
            accuracyText += ' ✅ Good accuracy';
        }
        locationAccuracy.textContent = accuracyText;
    }
    /**
     * Set location manually
     */
    setManualLocation(lat, lng) {
        if (isNaN(lat) || isNaN(lng)) {
            this.updateStatus('❌ Invalid coordinates. Please enter valid numbers.', 'error');
            return;
        }
        if (lat < -90 || lat > 90) {
            this.updateStatus('❌ Latitude must be between -90 and 90', 'error');
            return;
        }
        if (lng < -180 || lng > 180) {
            this.updateStatus('❌ Longitude must be between -180 and 180', 'error');
            return;
        }
        this.userLocation = { lat, lng };
        this._locationAccuracy = null; // Manual entry, no accuracy data
        // Display location info
        const locationInfo = document.getElementById('locationInfo');
        const currentCoords = document.getElementById('currentCoords');
        const locationAccuracy = document.getElementById('locationAccuracy');
        if (locationInfo && currentCoords && locationAccuracy) {
            locationInfo.style.display = 'block';
            currentCoords.textContent = `${lat.toFixed(9)}, ${lng.toFixed(9)}`;
            locationAccuracy.textContent = 'Manual entry';
        }
        this.updateStatus(`✅ Location set manually: ${lat.toFixed(9)}, ${lng.toFixed(9)}`, 'success');
        // Initialize or update map
        const map = mapService.getMap();
        if (map) {
            mapService.centerMap(lat, lng);
            mapService.addUserMarker(lat, lng);
        }
        else {
            mapService.initMap(lat, lng);
        }
        // Enable find button
        const findBtn = document.getElementById('findNearestBtn');
        if (findBtn) {
            findBtn.disabled = false;
        }
        // Hide manual location form
        const manualLocation = document.getElementById('manualLocation');
        if (manualLocation) {
            manualLocation.style.display = 'none';
        }
    }
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Find nearest button
        const findBtn = document.getElementById('findNearestBtn');
        if (findBtn) {
            findBtn.addEventListener('click', () => {
                this.findNearestBlueLights();
            });
        }
        // Refresh location button
        const refreshBtn = document.getElementById('refreshLocationBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.getUserLocation();
            });
        }
        // Manual location button
        const manualBtn = document.getElementById('manualLocationBtn');
        if (manualBtn) {
            manualBtn.addEventListener('click', () => {
                const manualLocationDiv = document.getElementById('manualLocation');
                if (manualLocationDiv) {
                    if (manualLocationDiv.style.display === 'none') {
                        manualLocationDiv.style.display = 'block';
                    }
                    else {
                        manualLocationDiv.style.display = 'none';
                    }
                }
            });
        }
        // Use manual location button
        const useManualBtn = document.getElementById('useManualLocationBtn');
        if (useManualBtn) {
            useManualBtn.addEventListener('click', () => {
                const latInput = document.getElementById('manualLat');
                const lngInput = document.getElementById('manualLng');
                if (latInput && lngInput) {
                    const lat = parseFloat(latInput.value);
                    const lng = parseFloat(lngInput.value);
                    this.setManualLocation(lat, lng);
                }
            });
        }
        // Allow Enter key in manual location inputs
        const latInput = document.getElementById('manualLat');
        const lngInput = document.getElementById('manualLng');
        const useManualBtn2 = document.getElementById('useManualLocationBtn');
        if (latInput) {
            latInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && useManualBtn2) {
                    useManualBtn2.click();
                }
            });
        }
        if (lngInput) {
            lngInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && useManualBtn2) {
                    useManualBtn2.click();
                }
            });
        }
    }
}
// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    window.app.init();
});
//# sourceMappingURL=app.js.map