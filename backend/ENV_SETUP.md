# .env File Setup

## Yes, You Need a .env File!

The `server.js` uses `dotenv.config()` to load environment variables from a `.env` file.

---

## Create the File

**Create:** `backend/.env`

### Minimum Required (Server will work with defaults):

```env
PORT=3000
NODE_ENV=development
```

### If Using Gemini AI (Optional):

```env
PORT=3000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## What Each Variable Does

### `PORT=3000`
- Sets the port the server runs on
- If not set, defaults to 3000 (so technically optional)
- But it's good practice to set it

### `NODE_ENV=development`
- Sets the environment mode
- Used for error messages (shows more details in development)
- Optional, but recommended

### `GEMINI_API_KEY=...`
- Only needed if you're using Gemini AI
- Get it from: https://makersuite.google.com/app/apikey
- Optional for now

---

## Quick Setup

### Option 1: Create Manually
1. Create a new file called `.env` in the `backend/` folder
2. Copy the content above
3. Save it

### Option 2: Copy from Example (if you have one)
```bash
cd backend
cp .env.example .env
# Then edit .env and add your actual values
```

---

## Important Notes

### ⚠️ Don't Commit .env to Git!

Make sure `.env` is in your `.gitignore`:

**Create/Update:** `backend/.gitignore`
```
node_modules/
.env
.env.local
*.log
.DS_Store
```

### ✅ Do Commit .env.example

Create `backend/.env.example` (this is safe to commit):
```env
PORT=3000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## Testing

After creating `.env`:

1. **Start server:**
   ```bash
   npm start
   ```

2. **Check if it reads the port:**
   - Should see: `Server running on port 3000`
   - If you change PORT in .env to 3001, it should use 3001

---

## Troubleshooting

### Server still uses port 3000 even with .env?
- Make sure `.env` is in the `backend/` folder (same level as `server.js`)
- Make sure there are no spaces: `PORT=3000` not `PORT = 3000`
- Restart the server after changing .env

### Error: "Cannot find module 'dotenv'"
- Run: `npm install dotenv`

---

## Summary

**Yes, create `.env` file!**

Minimum:
```env
PORT=3000
NODE_ENV=development
```

That's it! Server will work with just these two lines.

