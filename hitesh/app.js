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
    let map; // Variable to store the Leaflet map

    // Adding an event listener to the search button
    document.getElementById('searchButton').addEventListener('click', function () {
        console.log('Search button clicked');
        searchForBuses();
    });

    // Function to initialize the Leaflet map (replace with your actual map implementation)
    function initializeMap() {
        // Set the initial location to Jodhpur, Rajasthan, India
        const initialLocation = [26.2389, 73.0243];

        // Creating a Leaflet map centered on the initial location
        map = L.map('map-container').setView(initialLocation, 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        // Adding a marker to the map
        L.marker(initialLocation).addTo(map)
            .bindPopup('Jodhpur - A sample location.');
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
    
    console.log('DOM content loaded');
    const destinationInput = document.getElementById('destinationInput');
    console.log('destinationInput:', destinationInput);
    

    // Function to search for buses
    function searchForBuses() {
        console.log('Inside searchForBuses function');
        // Example: Logging the input values
        const origin = document.getElementById('originInput').value.toLowerCase();
        const destination = document.getElementById('destinationInput').value.toLowerCase();
        console.log('Searching for buses from', origin, 'to', destination);

        // Implement actual logic to search for buses based on user input
        const matchingBuses = busData.filter(bus => {
            const originMatch = bus.stops.includes(origin);
            const destinationMatch = bus.stops.includes(destination);
            return originMatch && destinationMatch;
        });

        // Display the matching buses
        displayMatchingBuses(matchingBuses);
    }

    // Function to display matching buses
    function displayMatchingBuses(matchingBuses) {
        // Clear existing markers on the map
        clearMapMarkers();

        if (matchingBuses.length > 0) {
            // Display matching buses on the map
            matchingBuses.forEach(bus => {
                bus.stops.forEach(stop => {
                    addMarkerToMap(stop);
                });
            });

            // Example: Logging the matching buses to the console
            console.log('Matching Buses:', matchingBuses);

            // Implement your logic to display results on the page (e.g., a list of matching buses)
            // Replace the next line with your actual display logic
            displayResultsOnPage(matchingBuses);
        } else {
            // No matching buses found
            console.log('No matching buses found.');

            // Implement your logic to display a message to the user
            // Replace the next line with your actual display logic
            displayNoResultsMessage();
        }
    }

    // Function to add a marker to the map for a given bus stop
    function addMarkerToMap(stop) {
        // Placeholder logic to get coordinates for a given stop
        const coordinates = getCoordinates(stop);

        // Add a marker to the map
        L.marker(coordinates).addTo(map)
            .bindPopup(`Bus Stop: ${stop}`);
    }

    // Placeholder function to get coordinates for a given bus stop
    function getCoordinates(stop) {
        // For demonstration purposes, you can use a simple mapping or API to get coordinates for a stop
        // Replace this with your actual logic to fetch coordinates based on the stop name
        const coordinates = {
            'Stop 1': [26.2426, 73.0441],
            'Stop 2': [26.2553, 73.0528],
            'Stop 3': [26.2276, 73.0307],
            // Add more coordinates as needed
        };

        return coordinates[stop] || [0, 0]; // Default to [0, 0] if coordinates are not found
    }

    // Function to clear existing markers on the map
    function clearMapMarkers() {
        map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });
    }

    // Placeholder function to display results on the page
    function displayResultsOnPage(matchingBuses) {
        // Replace this with your actual logic to display results on the page
        console.log('Displaying matching buses on the page:', matchingBuses);
    }

    // Placeholder function to display a message when no matching buses are found
    function displayNoResultsMessage() {
        // Replace this with your actual logic to display a message to the user
        console.log('No matching buses found. Please try a different search.');
    }

    // Attach event listeners
    mapToggle.addEventListener('click', toggleMapView);
    document.querySelector('.search-bar button').addEventListener('click', searchForBuses);

    // Initialize the map when the page is loaded
    initializeMap();
});