# Quick Setup Guide

> 📖 **For detailed step-by-step instructions with screenshots descriptions, see [API_KEY_GUIDE.md](./API_KEY_GUIDE.md)**

## Step 1: Get Google Maps API Key

### Detailed Instructions:

**A. Go to Google Cloud Console**
- Visit: https://console.cloud.google.com/
- Sign in with your Google account

**B. Create a Project**
1. Click the project dropdown at the top (shows "Select a project")
2. Click "New Project"
3. Project name: "SafeRoute" (or any name)
4. Click "Create"
5. Wait a few seconds, then select your new project from the dropdown

**C. Enable Required APIs**
1. In the left sidebar: Click "APIs & Services" → "Library"
2. Search for: **"Maps JavaScript API"**
   - Click on it
   - Click the blue **"Enable"** button
3. Go back to "Library"
4. Search for: **"Directions API"**
   - Click on it
   - Click the blue **"Enable"** button

**D. Create API Key**
1. Go to: "APIs & Services" → "Credentials" (left sidebar)
2. Click: **"+ CREATE CREDENTIALS"** (top of page)
3. Select: **"API key"**
4. **COPY THE API KEY** that appears (you won't see it again!)
5. Click "Close"

**E. Set Up Billing (Free Tier)**
- Google requires billing, but gives you **$200/month FREE credit**
- Go to: "Billing" (left sidebar)
- Click "Link a billing account" or "Create billing account"
- Add payment method (you won't be charged unless you exceed free tier)
- The $200 credit starts immediately

**F. (Optional) Restrict API Key**
- In "Credentials", click your API key
- Under "API restrictions": Select "Restrict key" → Check only "Maps JavaScript API" and "Directions API"
- Click "Save"

## Step 2: Add API Key to index.html

Open `frontend/index.html` and replace `YOUR_API_KEY`:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY&libraries=places,directions"></script>
```

## Step 3: Start Backend

```bash
cd backend
npm start
```

Backend should run on `http://localhost:3000`

## Step 4: Serve Frontend

### Option 1: Python (Easiest)
```bash
cd frontend
python -m http.server 8000
```

### Option 2: Node.js
```bash
npm install -g http-server
cd frontend
http-server -p 8000
```

### Option 3: VS Code Live Server
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

## Step 5: Open in Browser

Go to: `http://localhost:8000`

**Important:** 
- Allow location access when prompted
- Make sure backend is running on port 3000
- Use HTTPS in production (or localhost for development)

## Troubleshooting

**"Please set your Google Maps API key"**
→ Replace `YOUR_API_KEY` in index.html

**"Unable to get your location"**
→ Allow location access in browser settings

**"Error: Make sure the backend server is running"**
→ Start backend: `cd backend && npm start`

**Map not loading**
→ Check browser console for errors
→ Verify API key is correct
→ Make sure Maps JavaScript API is enabled

