/**
 * Helper script to add a new Blue Light location
 * 
 * Usage: node add-blueLight.js
 * 
 * This will prompt you for the location details and add it to blueLights.json
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function addBlueLight() {
  console.log('\n📍 Add New Blue Light Location\n');
  console.log('Get coordinates from:');
  console.log('  - UMD Map: https://maps.umd.edu/map/');
  console.log('  - Google Maps: Right-click location → "What\'s here?" → Copy coordinates\n');

  const name = await question('Location Name (e.g., "McKeldin Library"): ');
  const description = await question('Description (e.g., "Near main entrance"): ');
  const latitude = parseFloat(await question('Latitude (e.g., 38.9869): '));
  const longitude = parseFloat(await question('Longitude (e.g., -76.9426): '));
  const location = await question('Full Location String (e.g., "McKeldin Library, College Park, MD"): ');

  // Validate coordinates
  if (isNaN(latitude) || isNaN(longitude)) {
    console.error('❌ Invalid coordinates!');
    rl.close();
    return;
  }

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    console.error('❌ Coordinates out of valid range!');
    rl.close();
    return;
  }

  // Read existing data
  const dataPath = path.join(__dirname, 'data', 'blueLights.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  // Generate next ID
  const nextId = `BL${String(data.length + 1).padStart(3, '0')}`;

  // Create new entry
  const newEntry = {
    id: nextId,
    name: `Blue Light Phone - ${name}`,
    description: description,
    latitude: latitude,
    longitude: longitude,
    location: location
  };

  // Add to array
  data.push(newEntry);

  // Save to file
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  console.log(`\n✅ Added ${nextId}: ${newEntry.name}`);
  console.log(`   Total Blue Lights: ${data.length}\n`);

  const addMore = await question('Add another? (y/n): ');
  if (addMore.toLowerCase() === 'y') {
    await addBlueLight();
  } else {
    rl.close();
  }
}

addBlueLight().catch(console.error);

