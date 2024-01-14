// Example JavaScript file (app.js)

// Sample data for demonstration purposes (replace with actual data from your backend)
const busData = [
    { route: 'A', stops: ['Stop 1', 'Stop 2', 'Stop 3'], schedule: { weekdays: ['8:00 AM', '10:00 AM'], weekends: ['9:00 AM', '11:00 AM'] } },
    // Add more bus data as needed
  ];
  
  document.addEventListener('DOMContentLoaded', function () {
    const mapContainer = document.getElementById('map-container');
    const mapToggle = document.getElementById('map-toggle');
    let isMapView = true; // Initial state
  
    // Function to initialize the Leaflet map (replace with your actual map implementation)
    function initializeMap() {
      // Example: Creating a Leaflet map centered on a specific location
      const map = L.map('map-container').setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  
      // Example: Adding a marker to the map
      L.marker([51.505, -0.09]).addTo(map)
        .bindPopup('A sample bus stop marker.');
    }
  
    // Function to switch between map and list view
    function toggleMapView() {
      isMapView = !isMapView;
      if (isMapView) {
        mapContainer.style.display = 'block';
      } else {
        mapContainer.style.display = 'none';
      }
    }
  
    // Function to search for buses (replace with actual logic)
    function searchForBuses() {
      // Example: Logging the input values
      const origin = document.getElementById('originInput').value;
      const destination = document.getElementById('destinationInput').value;
      console.log('Searching for buses from', origin, 'to', destination);
  
      // Implement actual logic to search for buses based on user input
      // Update the map or display results accordingly
    }
  
    // Attach event listeners
    mapToggle.addEventListener('click', toggleMapView);
    document.querySelector('.search-bar button').addEventListener('click', searchForBuses);
  
    // Initialize the map when the page is loaded
    initializeMap();
  });
  