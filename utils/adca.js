const axios = require('axios');

// Replace 'YOUR_API_KEY' with your Google Maps API key
const apiKey = 'AIzaSyAuYYZazxHt-Kl5vWNfLnfffVrYGDBdgeo';

async function getDistance(originLat, originLng, destLat, destLng) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLng}&destination=${destLat},${destLng}&mode=driving&key=${apiKey}`
      );
  
      if (response.status === 200) {
        const route = response.data.routes[0];
        const distanceText = route.legs[0].distance.text;
        const distanceFloat = parseFloat(distanceText.replace(/[^0-9.]/g, ''));
        return distanceFloat;
      } else {
        throw new Error('Error fetching directions');
      }
    } catch (error) {
      throw error;
    }
  }
  
  // Example usage:
  const originLat = 40.712776;
  const originLng = -74.005974;
  const destLat = 34.052235;
  const destLng = -118.243683;
  
  getDistance(originLat, originLng, destLat, destLng)
    .then((distance) => {
      console.log('Distance (in kilometers):', distance);
    })
    .catch((error) => {
      console.error(error.message);
    });