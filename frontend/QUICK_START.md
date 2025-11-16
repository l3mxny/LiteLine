# Quick Start - TypeScript Frontend

## First Time Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Build TypeScript:**
   ```bash
   npm run build
   ```

3. **Add your Google Maps API key** to `index.html` (replace `YOUR_API_KEY`)

4. **Start backend** (in separate terminal):
   ```bash
   cd backend
   npm start
   ```

5. **Serve frontend** (in separate terminal):
   ```bash
   cd frontend
   npm run serve
   # or
   python -m http.server 8000
   ```

6. **Open browser:** `http://localhost:8000`

## Development Workflow

**Terminal 1 - TypeScript Watch:**
```bash
cd frontend
npm run watch
```

**Terminal 2 - Frontend Server:**
```bash
cd frontend
npm run serve
```

**Terminal 3 - Backend:**
```bash
cd backend
npm start
```

Edit files in `src/` and they'll automatically recompile!

## File Structure

- `src/` - TypeScript source files (edit these!)
- `js/` - Compiled JavaScript (auto-generated, don't edit)
- `index.html` - References compiled JS from `js/` folder

## Important Notes

- ✅ Edit TypeScript files in `src/` folder
- ❌ Don't edit files in `js/` folder (they're auto-generated)
- ✅ Run `npm run build` or `npm run watch` to compile
- ✅ The compiled JS files work exactly like before


