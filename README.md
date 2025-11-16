## LiteLine

**LiteLine** is a campus safety companion that helps students quickly find the nearest blue light, contact campus police, and get safety guidance when walking alone.

## Features

- **Live SafeRoute Map**: Uses Google Maps to show your current location and draw a walking route to the nearest blue light.
- **One‑Tap Contacts**: Quick call buttons for campus police emergency and walking escort lines.
- **Safety “LiteBot” Chat**: Rule‑based chatbot that provides curated safety guidance for common situations (feeling unsafe, helping a friend, car accidents, etc.).

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Google Maps JavaScript API
- **Backend**: Node.js, Express.js, JSON data (`backend/data/blueLights.json`)
- **Infra**: Docker (containerized backend)

## Running the App Locally

### Backend (without Docker)

```bash
cd backend
npm install
node server.js          # API at http://localhost:3000
```

### Frontend (opening page + map + chat + contacts)

```bash
cd frontend/opening-page
npm install
npm run dev -- --port 5174
# Open http://localhost:5174 in your browser
```

Make sure the API base URL in `frontend/opening-page/src/MapPage.tsx` is:

```ts
const API_BASE_URL = 'http://localhost:3000'
```

## Backend with Docker (Optional)

```bash
cd backend
docker build -t liteline-backend:latest .
docker run -d --name liteline-backend -p 3000:3000 --env-file .env liteline-backend:latest
# API available at http://localhost:3000
```