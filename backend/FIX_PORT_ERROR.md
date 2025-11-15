# Fix: Port 3000 Already in Use

## The Problem
Port 3000 is already being used by another process (maybe you started the server twice, or another app is using it).

## Solution 1: Kill the Process Using Port 3000 (Recommended)

### On Mac (which you're using):

**Step 1: Find what's using port 3000**
```bash
lsof -ti:3000
```

This will show the process ID (PID).

**Step 2: Kill that process**
```bash
kill -9 $(lsof -ti:3000)
```

Or if you got a PID number from step 1:
```bash
kill -9 <PID_NUMBER>
```

**Step 3: Try starting server again**
```bash
npm start
```

---

## Solution 2: Use a Different Port

### Change your .env file:

**Edit:** `backend/.env`

Change from:
```env
PORT=3000
```

To:
```env
PORT=3001
```

Then restart:
```bash
npm start
```

Now your server will run on port 3001 instead.

---

## Quick One-Liner (Mac)

Kill port 3000 and restart:
```bash
kill -9 $(lsof -ti:3000) && npm start
```

---

## Check What's Using Port 3000

To see what process is using it:
```bash
lsof -i:3000
```

This shows you the process name and PID.

---

## After Fixing

Once you kill the process or change the port, your server should start:

```
🚀 SafeRoute API Server running on port 3000
```

Then test:
- http://localhost:3000/health (or 3001 if you changed port)

