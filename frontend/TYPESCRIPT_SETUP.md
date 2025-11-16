# TypeScript Setup Guide

The frontend has been converted to TypeScript! Here's how to use it.

## Project Structure

```
frontend/
├── src/              # TypeScript source files
│   ├── app.ts       # Main application
│   ├── api.ts       # API service
│   ├── map.ts       # Google Maps service
│   └── types/       # Type definitions
│       └── index.ts
├── js/              # Compiled JavaScript (generated)
├── tsconfig.json    # TypeScript configuration
├── package.json     # Dependencies and scripts
└── index.html       # HTML file (references compiled JS)
```

## Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

This installs:
- `typescript` - TypeScript compiler
- `@types/google.maps` - Google Maps type definitions

### 2. Build TypeScript

```bash
npm run build
```

This compiles all `.ts` files in `src/` to `.js` files in `js/`.

### 3. Development Mode (Watch Mode)

For automatic recompilation during development:

```bash
npm run watch
```

This watches for changes and recompiles automatically.

### 4. Serve the Frontend

In a separate terminal:

```bash
npm run serve
# or
python -m http.server 8000
```

Then open: `http://localhost:8000`

## Available Scripts

- `npm run build` - Compile TypeScript once
- `npm run watch` - Watch for changes and recompile
- `npm run dev` - Alias for watch
- `npm run serve` - Serve the frontend (Python HTTP server)

## Type Safety Features

✅ **Full type checking** - All functions, variables, and objects are typed
✅ **Google Maps types** - Full IntelliSense for Google Maps API
✅ **Strict mode** - Catches errors at compile time
✅ **Interface definitions** - Shared types in `src/types/index.ts`

## Development Workflow

1. **Edit TypeScript files** in `src/`
2. **Run watch mode**: `npm run watch` (in one terminal)
3. **Serve frontend**: `npm run serve` (in another terminal)
4. **Refresh browser** to see changes

## Type Definitions

All types are defined in `src/types/index.ts`:

- `Location` - Latitude/longitude pair
- `BlueLight` - Blue light station data
- `BlueLightsResponse` - API response format
- `StatusType` - Status message types

## Troubleshooting

### "Cannot find module"
- Make sure you've run `npm install`
- Check that `tsconfig.json` is correct
- Verify file paths use `.js` extension in imports (TypeScript requirement)

### "Google Maps types not found"
- Install types: `npm install --save-dev @types/google.maps`
- Make sure Google Maps script loads before your code

### "Build errors"
- Check `tsconfig.json` settings
- Ensure all imports use `.js` extension
- Run `npm run build` to see detailed error messages

## Notes

- **Import extensions**: TypeScript requires `.js` extensions in imports even though source files are `.ts`
- **Compiled output**: The `js/` folder contains compiled JavaScript - don't edit these files directly
- **Source maps**: Generated `.js.map` files help with debugging

## Migration from JavaScript

The old JavaScript files in `js/` have been moved to `src/` and converted to TypeScript:
- `js/app.js` → `src/app.ts`
- `js/api.js` → `src/api.ts`
- `js/map.js` → `src/map.ts`

After building, the compiled JavaScript will be in `js/` and will work exactly as before!


