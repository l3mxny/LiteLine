/**
 * Test script for Blue Lights service
 * Tests with UMD coordinates
 */

import blueLightsService from './services/blueLights.js';

// UMD (University of Maryland) approximate coordinates
// Main campus center: 38.9869° N, 76.9426° W
const UMD_LAT = 38.9869;
const UMD_LON = -76.9426;

console.log('🧪 Testing Blue Lights Service\n');
console.log(`📍 Test Location: UMD Campus (${UMD_LAT}, ${UMD_LON})\n`);

try {
  // Test 1: Get nearest 5 Blue Lights
  console.log('Test 1: Get nearest 5 Blue Lights');
  console.log('=' .repeat(50));
  const nearest5 = blueLightsService.getNearestBlueLights(UMD_LAT, UMD_LON, 5);
  nearest5.forEach((blueLight, index) => {
    console.log(`\n${index + 1}. ${blueLight.name}`);
    console.log(`   Distance: ${blueLight.distanceFormatted} (${blueLight.distance.toFixed(2)} meters)`);
    console.log(`   Walking Time: ${blueLight.walkingTimeFormatted}`);
    console.log(`   Location: ${blueLight.location}`);
    console.log(`   Coordinates: (${blueLight.latitude}, ${blueLight.longitude})`);
    console.log(`   Map: ${blueLight.googleMapsUrl}`);
  });

  // Test 2: Get nearest 10 Blue Lights
  console.log('\n\nTest 2: Get nearest 10 Blue Lights');
  console.log('=' .repeat(50));
  const nearest10 = blueLightsService.getNearestBlueLights(UMD_LAT, UMD_LON, 10);
  console.log(`Found ${nearest10.length} Blue Lights within range`);
  nearest10.forEach((blueLight, index) => {
    console.log(`${index + 1}. ${blueLight.name} - ${blueLight.distanceFormatted}`);
  });

  // Test 3: Get Blue Lights within 500 meters
  console.log('\n\nTest 3: Get Blue Lights within 500 meters');
  console.log('=' .repeat(50));
  const within500m = blueLightsService.getNearestBlueLights(UMD_LAT, UMD_LON, 10, 500);
  console.log(`Found ${within500m.length} Blue Lights within 500 meters`);
  within500m.forEach((blueLight, index) => {
    console.log(`${index + 1}. ${blueLight.name} - ${blueLight.distanceFormatted}`);
  });

  // Test 4: Get all Blue Lights count
  console.log('\n\nTest 4: Total Blue Lights in database');
  console.log('=' .repeat(50));
  const allBlueLights = blueLightsService.getAllBlueLights();
  console.log(`Total Blue Lights: ${allBlueLights.length}`);

  // Test 5: Test with different location (Stamp Student Union)
  console.log('\n\nTest 5: Test from Stamp Student Union');
  console.log('=' .repeat(50));
  const STAMP_LAT = 38.9885;
  const STAMP_LON = -76.9442;
  const fromStamp = blueLightsService.getNearestBlueLights(STAMP_LAT, STAMP_LON, 3);
  fromStamp.forEach((blueLight, index) => {
    console.log(`${index + 1}. ${blueLight.name} - ${blueLight.distanceFormatted} (${blueLight.walkingTimeFormatted} walk)`);
  });

  console.log('\n✅ All tests completed successfully!\n');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

