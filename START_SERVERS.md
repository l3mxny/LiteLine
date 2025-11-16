# How to Start the Servers

## Option 1: Use Command Prompt (CMD) Instead of PowerShell

**Easiest solution!** Open **Command Prompt** (not PowerShell):

1. Press `Win + R`
2. Type `cmd` and press Enter
3. Navigate to your project:
   ```cmd
   cd C:\Users\carol\Documents\GitHub\Technica
   ```
4. Start backend:
   ```cmd
   cd backend
   npm start
   ```
5. Open a **new** Command Prompt window for frontend:
   ```cmd
   cd C:\Users\carol\Documents\GitHub\Technica\frontend
   python -m http.server 8000
   ```

## Option 2: Fix PowerShell Execution Policy (Current Session Only)

Run this in PowerShell **as Administrator**:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```

Then try `npm start` again.

## Option 3: Fix PowerShell Execution Policy (Permanently)

Run this in PowerShell **as Administrator**:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

This allows scripts for your user account only (safer than system-wide).

## Option 4: Bypass for Single Command

Run npm with bypass:

```powershell
powershell -ExecutionPolicy Bypass -Command "cd backend; npm start"
```

Or use `node` directly:

```powershell
cd backend
node server.js
```

## Option 5: Use Git Bash

If you have Git installed, use Git Bash instead:
1. Right-click in your project folder
2. Select "Git Bash Here"
3. Run:
   ```bash
   cd backend
   npm start
   ```

## Recommended: Use Command Prompt (CMD)

**For now, just use Command Prompt** - it's the simplest solution and doesn't require changing system settings.

### Quick Start Commands (CMD):

**Terminal 1 (Backend):**
```cmd
cd C:\Users\carol\Documents\GitHub\Technica\backend
npm start
```

**Terminal 2 (Frontend):**
```cmd
cd C:\Users\carol\Documents\GitHub\Technica\frontend
python -m http.server 8000
```

Then open: `http://localhost:8000`



