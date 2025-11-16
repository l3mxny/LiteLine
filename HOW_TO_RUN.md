# How to Run SafeRoute - Step by Step

## Understanding: The Backend Server is Running! ✅

When you see this output:
```
🚀 SafeRoute API Server running on port 3000
📡 Environment: development
🔗 Health check: http://localhost:3000/health
🍽️  API base: http://localhost:3000/api
```

**This means your backend is working perfectly!** The command prompt appears "stuck" because the server is actively running and waiting for requests. This is **normal behavior**.

---

## Step-by-Step Instructions

### Step 1: Backend Server (Terminal 1) ✅ DONE!

Your backend is already running! **Keep this terminal window open.**

- ✅ Server is running on `http://localhost:3000`
- ✅ Don't close this terminal - the server needs to keep running
- ✅ If you need to stop it, press `Ctrl + C`

### Step 2: Frontend Server (Terminal 2) - NEW WINDOW

**Open a NEW Command Prompt window:**

1. Press `Win + R`
2. Type `cmd` and press Enter
3. Navigate to your frontend folder:
   ```cmd
   cd C:\Users\carol\Documents\GitHub\Technica\frontend
   ```
4. Start the frontend server:
   ```cmd
   python -m http.server 8000
   ```

You should see:
```
Serving HTTP on 0.0.0.0 port 8000 ...
```

**Keep this terminal open too!**

### Step 3: Open in Browser

1. Open your web browser (Chrome, Edge, Firefox, etc.)
2. Go to: `http://localhost:8000`
3. You should see the SafeRoute app!

### Step 4: Test It

1. **Allow location access** when your browser asks
2. Click **"Find Nearest Blue Light"**
3. The app will:
   - Get your current location
   - Call your backend API
   - Display nearest blue lights on the map

---

## Visual Guide

```
┌─────────────────────────────────────┐
│  Terminal 1 (Backend)               │
│  ✅ Backend running on :3000       │
│  (Keep this open!)                   │
│  [Press Ctrl+C to stop]             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Terminal 2 (Frontend)              │
│  ✅ Frontend running on :8000       │
│  (Keep this open too!)               │
│  [Press Ctrl+C to stop]              │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Browser                            │
│  http://localhost:8000              │
│  ✅ Your app is here!               │
└─────────────────────────────────────┘
```

---

## Troubleshooting

### "The command prompt is stuck"
- **This is normal!** The server is running. It's not stuck, it's waiting for requests.
- You need **TWO terminal windows** - one for backend, one for frontend

### "Can't connect to backend"
- Make sure Terminal 1 (backend) is still running
- Check that you see the "🚀 SafeRoute API Server running" message
- Try: `http://localhost:3000/health` in your browser

### "Frontend not loading"
- Make sure Terminal 2 (frontend) is running
- Check that you see "Serving HTTP on port 8000"
- Make sure you added your Google Maps API key to `frontend/index.html`

### "Python not found"
- Install Python from https://www.python.org/downloads/
- Or use Node.js: `npx http-server -p 8000`

---

## Quick Commands Reference

**Stop Backend:** In Terminal 1, press `Ctrl + C`
**Stop Frontend:** In Terminal 2, press `Ctrl + C`

**Restart Backend:**
```cmd
cd backend
npm start
```

**Restart Frontend:**
```cmd
cd frontend
python -m http.server 8000
```

---

## Summary

✅ **Backend is running** - Keep Terminal 1 open
✅ **Open Terminal 2** - Run frontend server
✅ **Open browser** - Go to http://localhost:8000
✅ **Test the app!**

The "stuck" terminal is actually your server working perfectly! 🎉


