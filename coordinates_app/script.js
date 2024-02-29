// Function to initialize the map
function initMap() {
    // Set the coordinates for the center of the map to Jodhpur, India
    var center = [26.2389, 73.0243]; // Coordinates for Jodhpur

    // Create a new map object centered at the specified coordinates
    var map = L.map('map').setView(center, 12); // Centered at 'center', zoom level 12

    // Add a tile layer to the map (OpenStreetMap tiles)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Function to handle click event on the map
    function onMapClick(e) {
        // Add a marker to the clicked location
        L.marker(e.latlng).addTo(map)
            .bindPopup("Coordinates: " + e.latlng.toString()) // Display coordinates as a popup
            .openPopup();
    }

    // Register the click event listener on the map
    map.on('click', onMapClick);
}

// Initialize the map when the DOM content is loaded
document.addEventListener('DOMContentLoaded', initMap);
