# How to Collect Real Blue Light Locations

## Using the UMD Interactive Map

You found the UMD map: https://maps.umd.edu/map/index.html

### Steps to Collect Blue Light Data:

1. **Open the map** and look for a layer toggle that shows "Blue Lights", "Emergency Phones", or "Safety" features
   - The URL shows `layers=pert` - try different layer combinations
   - Look for checkboxes or layer controls on the map

2. **For each Blue Light you find:**
   - Click on the blue light marker on the map
   - Note the exact location name/description
   - Get the coordinates (latitude, longitude) - you can:
     - Right-click on the marker → "What's here?" in Google Maps
     - Or use the map's coordinate display if available
     - Or use Google Maps to search the building name and get coordinates

3. **Add to `blueLights.json`** in this format:
```json
{
  "id": "BL001",
  "name": "Blue Light Phone - [Exact Location Name]",
  "description": "[Specific location description, e.g., 'Near main entrance', 'Parking lot area']",
  "latitude": 38.XXXXX,
  "longitude": -76.XXXXX,
  "location": "[Building/Area Name], College Park, MD"
}
```

### Alternative Methods:

**Method 1: Google Maps**
- Search for "University of Maryland blue light emergency phone"
- Or walk campus and use Google Maps to drop a pin at each blue light
- Right-click the pin → coordinates

**Method 2: Contact UMD**
- Email UMD Police: police@umd.edu
- Ask for a list/map of blue light locations
- They may have official data you can use

**Method 3: Physical Survey**
- Walk around campus
- Use your phone's GPS to get coordinates at each blue light
- Take photos for reference

### Quick Coordinate Lookup:

To get coordinates for a building:
1. Go to Google Maps
2. Search: "[Building Name] University of Maryland College Park"
3. Right-click the marker → "What's here?"
4. Copy the coordinates (lat, lng)

### Current Status:

The `blueLights.json` file currently has **32 placeholder locations** with approximate coordinates based on building locations. These need to be replaced with actual blue light phone coordinates.

### Priority Locations to Verify:

Start with high-traffic areas:
- McKeldin Library
- Stamp Student Union  
- Residence halls
- Parking garages
- Main campus walkways

