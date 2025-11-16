# Complete Guide: Getting Your Google Maps API Key

This guide walks you through getting a Google Maps API key step-by-step with detailed instructions.

## Why You Need an API Key

Google Maps API requires an API key to:
- Load interactive maps on your website
- Calculate walking directions
- Display routes and markers

**Good News:** Google gives you **$200/month FREE credit** (about 40,000 requests), which is more than enough for a hackathon project!

---

## Step-by-Step Instructions

### Step 1: Sign In to Google Cloud Console

1. Go to: **https://console.cloud.google.com/**
2. Sign in with your Google account
   - If you don't have one, create it at https://accounts.google.com/signup

### Step 2: Create a New Project

1. At the top of the page, click the **project dropdown** (it may say "Select a project" or show a project name)
2. Click **"New Project"**
3. Enter project details:
   - **Project name:** `SafeRoute` (or any name you like)
   - **Organization:** Leave as default (or select if you have one)
   - **Location:** Leave as default
4. Click **"Create"**
5. Wait 10-20 seconds for the project to be created
6. **Important:** Select your new project from the dropdown at the top

### Step 3: Enable Required APIs

You need to enable two APIs:

#### Enable Maps JavaScript API:
1. In the left sidebar, click **"APIs & Services"** → **"Library"**
2. In the search bar, type: **"Maps JavaScript API"**
3. Click on **"Maps JavaScript API"** (should be the first result)
4. Click the blue **"Enable"** button
5. Wait for it to enable (you'll see a checkmark)

#### Enable Directions API:
1. Go back to **"Library"** (click "APIs & Services" → "Library" again)
2. In the search bar, type: **"Directions API"**
3. Click on **"Directions API"**
4. Click the blue **"Enable"** button
5. Wait for it to enable

### Step 4: Create Your API Key

1. In the left sidebar, go to **"APIs & Services"** → **"Credentials"**
2. At the top of the page, click **"+ CREATE CREDENTIALS"**
3. From the dropdown menu, select **"API key"**
4. **IMPORTANT:** A popup will appear with your API key
   - **Copy the API key immediately!** (It looks like: `AIzaSyC...`)
   - You won't be able to see the full key again after closing this popup
5. Click **"Close"** (don't restrict it yet for testing)

### Step 5: Set Up Billing (Required but Free!)

**Don't worry!** Google requires a billing account, but:
- You get **$200 FREE credit every month**
- You only get charged if you exceed the free tier
- For a hackathon, you'll likely never exceed it

**To set up billing:**
1. In the left sidebar, click **"Billing"**
2. Click **"Link a billing account"** or **"Create billing account"**
3. Fill in your billing information:
   - Country/Region
   - Account name: "SafeRoute" (or any name)
   - Payment method (credit card or bank account)
4. Click **"Start my free trial"** or **"Submit and enable billing"**
5. Your **$200 free credit starts immediately!**

**Note:** You can set up billing alerts to notify you if you approach the limit.

### Step 6: (Recommended) Restrict Your API Key

For security, restrict your API key to only the APIs you need:

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click on your API key (the one you just created)
3. Under **"API restrictions":**
   - Select **"Restrict key"**
   - Check only these two:
     - ✅ Maps JavaScript API
     - ✅ Directions API
4. Under **"Application restrictions":**
   - For **development/testing:** Select **"None"** (allows localhost)
   - For **production:** Select **"HTTP referrers"** and add your website domain
5. Click **"Save"**

---

## Step 7: Add API Key to Your Project

1. Open `frontend/index.html` in a text editor
2. Find this line (around line 7):
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places,directions"></script>
   ```
3. Replace `YOUR_API_KEY` with your actual API key:
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_your_actual_key_here&libraries=places,directions"></script>
   ```
4. Save the file

---

## Testing Your API Key

1. Start your backend: `cd backend && npm start`
2. Serve your frontend: `cd frontend && python -m http.server 8000`
3. Open: `http://localhost:8000`
4. If the map loads, your API key is working! ✅
5. If you see errors, check the browser console (F12) for specific error messages

---

## Common Issues & Solutions

### "This API key is not authorized"
- **Solution:** Make sure you enabled both "Maps JavaScript API" and "Directions API"
- Go back to "APIs & Services" → "Library" and enable them

### "RefererNotAllowedMapError"
- **Solution:** Your API key restrictions are too strict
- Go to "Credentials" → Click your API key → Under "Application restrictions" → Select "None" for development

### "Billing not enabled"
- **Solution:** You need to set up billing (even though it's free)
- Go to "Billing" and link a billing account

### "API key not valid"
- **Solution:** Double-check you copied the entire API key correctly
- Make sure there are no extra spaces before/after the key in index.html

### Map loads but shows "For development purposes only"
- **Solution:** This is normal! It means your API key is working
- The watermark will disappear once you add billing and deploy to a real domain

---

## Cost Information

**Free Tier:**
- **$200 credit per month** (automatically applied)
- Covers approximately:
  - 28,000 map loads
  - 40,000 direction requests
  - More than enough for a hackathon!

**Pricing (if you exceed free tier):**
- Maps JavaScript API: $7 per 1,000 loads
- Directions API: $5 per 1,000 requests

**For a hackathon:** You'll almost certainly stay within the free tier.

---

## Security Best Practices

1. **Restrict your API key** to only the APIs you need
2. **Add HTTP referrer restrictions** for production
3. **Never commit your API key to GitHub** (use environment variables)
4. **Monitor usage** in Google Cloud Console
5. **Set up billing alerts** to notify you of usage

---

## Need Help?

- **Google Cloud Console:** https://console.cloud.google.com/
- **Google Maps Platform Docs:** https://developers.google.com/maps/documentation
- **API Key Help:** https://developers.google.com/maps/api-security-best-practices

---

## Quick Checklist

- [ ] Created Google Cloud project
- [ ] Enabled Maps JavaScript API
- [ ] Enabled Directions API
- [ ] Created API key
- [ ] Set up billing account (free tier)
- [ ] Added API key to `frontend/index.html`
- [ ] Tested the map loads correctly

---

**You're all set!** Your API key should now work with the SafeRoute frontend. 🎉



