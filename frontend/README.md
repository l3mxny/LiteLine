# SafeRoute Frontend (TypeScript)

Frontend application for SafeRoute - Find your nearest Blue Light emergency station with interactive Google Maps integration.

**Now using TypeScript!** See [TYPESCRIPT_SETUP.md](./TYPESCRIPT_SETUP.md) for setup instructions.

## Features

- ✅ **Automatic Location Detection** - Uses browser geolocation to find your current location
- ✅ **Interactive Google Maps** - Embedded map showing your location and blue light stations
- ✅ **Turn-by-Turn Directions** - Walking directions from your location to nearest blue lights
- ✅ **Multiple Stations** - Shows top 5 nearest blue light stations
- ✅ **Distance & Walking Time** - Displays distance in feet/miles and estimated walking time
- ✅ **Emergency Quick Actions** - One-tap buttons to call 911 or UMD Police
- ✅ **Responsive Design** - Works on desktop and mobile devices

## Setup Instructions

> 📖 **For the most detailed step-by-step guide with troubleshooting, see [API_KEY_GUIDE.md](./API_KEY_GUIDE.md)**

### 1. Get Google Maps API Key

#### Quick Steps:

**Step 1: Go to Google Cloud Console**
- Visit: https://console.cloud.google.com/
- Sign in with your Google account (or create one if needed)

**Step 2: Create or Select a Project**
- Click the project dropdown at the top (next to "Google Cloud")
- Click "New Project" (or select an existing project)
- Enter project name: "SafeRoute" (or any name you prefer)
- Click "Create"
- Wait for project creation, then select it from the dropdown

**Step 3: Enable Required APIs**
- In the left sidebar, click "APIs & Services" → "Library"
- Search for "Maps JavaScript API" and click it
- Click the blue "Enable" button
- Go back to "Library"
- Search for "Directions API" and click it
- Click the blue "Enable" button

**Step 4: Create API Key**
- Go to "APIs & Services" → "Credentials" (in left sidebar)
- Click "+ CREATE CREDENTIALS" at the top
- Select "API key" from the dropdown
- Your API key will be created and displayed in a popup
- **IMPORTANT:** Copy the API key immediately (you won't be able to see it again)
- Click "Close" (don't restrict it yet for testing)

**Step 5: (Optional but Recommended) Restrict API Key**
- In "Credentials", click on your newly created API key
- Under "API restrictions":
  - Select "Restrict key"
  - Check only: "Maps JavaScript API" and "Directions API"
- Under "Application restrictions":
  - For development: Select "None" (allows localhost)
  - For production: Select "HTTP referrers" and add your domain
- Click "Save"

**Step 6: Get Billing Account (Free Tier Available)**
- Google Maps API requires a billing account, BUT:
  - You get **$200 free credit per month**
  - This covers ~40,000 requests/month (plenty for a hackathon!)
  - You won't be charged unless you exceed the free tier
- Go to "Billing" in left sidebar
- Click "Link a billing account" or "Create billing account"
- Add a payment method (won't be charged unless you exceed free tier)
- Your free $200 credit starts immediately

### 2. Configure API Key

Open `index.html` and replace `YOUR_API_KEY` with your actual Google Maps API key:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places,directions"></script>
```

### 3. Start Backend Server

Make sure the backend server is running:

```bash
cd backend
npm start
```

The backend should be running on `http://localhost:3000`

### 4. Serve Frontend

You have several options to serve the frontend:

#### Option A: Using Python (Simple)

```bash
cd frontend
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

#### Option B: Using Node.js http-server

```bash
npm install -g http-server
cd frontend
http-server -p 8000
```

#### Option C: Using VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

#### Option D: Using a Web Server

Deploy to any web server (Apache, Nginx, etc.) or hosting service.

## File Structure

```
frontend/
├── index.html          # Main HTML file
├── css/
│   └── styles.css     # Styling
├── js/
│   ├── app.js         # Main application logic
│   ├── api.js         # Backend API communication
│   └── map.js         # Google Maps integration
└── README.md          # This file
```

## API Integration

The frontend communicates with the backend API:

- **POST** `/api/safety/nearest` - Get nearest blue light stations
- **GET** `/health` - Health check

## Usage

1. Open the application in your browser
2. Allow location access when prompted
3. Click "Find Nearest Blue Light"
4. View the list of nearest stations
5. Click "Show Route on Map" to see walking directions
6. Click "Open in Google Maps" to open in the Google Maps app

## Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Note:** Requires HTTPS for geolocation in production (or localhost for development).

## Troubleshooting

### "Please set your Google Maps API key"
- Make sure you've replaced `YOUR_API_KEY` in `index.html`
- Verify the API key is valid and has the required APIs enabled

### "Unable to get your location"
- Make sure you've allowed location access in your browser
- Check browser settings for location permissions
- HTTPS is required for geolocation (except localhost)

### "Error: Make sure the backend server is running"
- Start the backend server: `cd backend && npm start`
- Check that it's running on `http://localhost:3000`
- Verify CORS is enabled in the backend

### Map not loading
- Check browser console for errors
- Verify Google Maps API key is correct
- Make sure Maps JavaScript API is enabled in Google Cloud Console

## Security Notes

- **Never commit API keys to version control**
- Use environment variables or a config file (excluded from git)
- Restrict API keys to specific domains/IPs in Google Cloud Console
- For production, use HTTPS

## Cost Considerations

Google Maps API has a free tier:
- **$200/month credit** (approximately 40,000 requests)
- For a hackathon/demo, this should be more than enough
- Monitor usage in Google Cloud Console

## Next Steps

- Add AI recommendation feature (when backend `/api/safety/recommend` is ready)
- Add favorites/bookmarks
- Add dark mode
- Add offline support
- Add push notifications for nearby blue lights

