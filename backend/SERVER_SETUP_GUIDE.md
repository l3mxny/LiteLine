# How to Create server.js - Step by Step

## Step 1: Create the File

Create a new file called `server.js` in the `backend/` folder.

---

## Step 2: Install Dependencies First

Before writing code, make sure you have the dependencies:

```bash
cd backend
npm install express cors dotenv
```

This installs:
- `express` - Web framework
- `cors` - Allows frontend to call your API
- `dotenv` - Loads environment variables from .env file

---

## Step 3: Write the Code

I've created `server.js` for you! Here's what each part does:

### Part 1: Imports
```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import safetyRouter from './routes/safety.js';
```
- Import Express framework
- Import CORS (for frontend access)
- Import dotenv (for .env file)
- Import your routes (you'll create this next)

### Part 2: Setup
```javascript
dotenv.config(); // Load .env file
const app = express(); // Create Express app
const PORT = process.env.PORT || 3000; // Use port from .env or default to 3000
```

### Part 3: Middleware
```javascript
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON bodies
```
- CORS: Lets your frontend call this API
- express.json(): Parses JSON request bodies

### Part 4: Routes
```javascript
app.use('/api/safety', safetyRouter); // All /api/safety/* routes
```
- This connects your routes file

### Part 5: Endpoints
```javascript
app.get('/health', ...) // Health check
app.get('/', ...) // Root endpoint
```

### Part 6: Error Handling
```javascript
app.use((req, res) => {...}) // 404 handler
app.use((err, req, res, next) => {...}) // Error handler
```

### Part 7: Start Server
```javascript
app.listen(PORT, () => {...}) // Start listening on port
```

---

## Step 4: Create the Routes File

You need to create `routes/safety.js` for the server to work:

**Create:** `backend/routes/safety.js`

```javascript
import express from 'express';

const router = express.Router();

// Placeholder endpoint
router.post('/nearest', async (req, res) => {
  res.status(503).json({
    error: 'Service not ready',
    message: 'Blue Light service is being set up.'
  });
});

router.post('/recommend', async (req, res) => {
  res.status(503).json({
    error: 'Service not ready',
    message: 'Recommendation service is being set up.'
  });
});

router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'safety' });
});

export default router;
```

---

## Step 5: Create .env File

**Create:** `backend/.env`

```env
PORT=3000
NODE_ENV=development
GEMINI_API_KEY=your_key_here_if_using
```

---

## Step 6: Update package.json

Make sure your `package.json` has:

```json
{
  "type": "module",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  }
}
```

---

## Step 7: Test It!

### 1. Install dependencies:
```bash
cd backend
npm install
```

### 2. Start server:
```bash
npm start
```

You should see:
```
🚀 SafeRoute API Server running on port 3000
📡 Environment: development
🔗 Health check: http://localhost:3000/health
🍽️  API base: http://localhost:3000/api
```

### 3. Test in browser or terminal:

**Browser:**
- Open: http://localhost:3000/health
- Should see: `{"status":"ok","service":"SafeRoute API",...}`

**Terminal:**
```bash
curl http://localhost:3000/health
```

**Test root:**
```bash
curl http://localhost:3000/
```

---

## Troubleshooting

### Error: "Cannot find module 'express'"
**Fix:** Run `npm install`

### Error: "Cannot find module './routes/safety.js'"
**Fix:** Create the `routes/safety.js` file (see Step 4)

### Error: "Port 3000 already in use"
**Fix:** 
- Change PORT in .env to 3001
- Or kill the process using port 3000

### Error: "SyntaxError: Cannot use import statement"
**Fix:** Make sure `package.json` has `"type": "module"`

---

## What's Next?

Once `server.js` is working:

1. ✅ Server runs
2. ✅ Health endpoint works
3. ⏳ Wait for Person 1 to create `services/blueLights.js`
4. ⏳ Then update `routes/safety.js` to use Person 1's service

---

## Quick Checklist

- [ ] Created `server.js`
- [ ] Created `routes/safety.js`
- [ ] Created `.env` file
- [ ] Updated `package.json` with `"type": "module"`
- [ ] Ran `npm install`
- [ ] Ran `npm start`
- [ ] Tested `http://localhost:3000/health`
- [ ] Server shows startup messages

You're done! 🎉

