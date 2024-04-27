// Function to initialize the map
function initMap() {
    // Set the coordinates for the center of the map
    var center = [26.297671, 72.987441]; // Centered around Jodhpur, Rajasthan, India

    // Create a new map object centered at the specified coordinates
    var map = L.map('map').setView(center, 13); // Centered at 'center', zoom level 13

    // Add a tile layer to the map (OpenStreetMap tiles)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Fetch bus data from JSON file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Function to search for buses and display routes on map
            function searchBuses() {
                var startStop = document.getElementById('startStop').value.trim();
                var endStop = document.getElementById('endStop').value.trim();
                var matchedRouteNames = []; // Array to store matched route names

                // Find all routes that match the provided start and end stops
                var matchingRoutes = data.filter(bus => {
                    return bus.stops.some(stop => stop.name === startStop) &&
                        bus.stops.some(stop => stop.name === endStop);
                });

                // Display the routes on map if found, otherwise show a message
                if (matchingRoutes.length > 0) {
                    // Clear existing markers and polylines from the map
                    map.eachLayer(layer => {
                        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
                            map.removeLayer(layer);
                        }
                    });

                    // Define an array of colors for polylines
                    var colors = ['red', 'blue', 'green', 'orange', 'purple', 'black', 'gray', 'cyan', 'magenta', 'yellow'];

                    // Define an array to store all polylines
                    var allPolylines = [];

                    // Declare polyline variable outside the loop
                    var polyline;

                    // Iterate over each matching route
                    matchingRoutes.forEach((matchingRoute, index) => {
                        // Collect coordinates for the route from start to end including intermediate stops
                        var routeCoordinates = [];
                        var inRoute = false;
                        matchingRoute.stops.forEach(stop => {
                            if (stop.name === startStop || inRoute) {
                                routeCoordinates.push(stop.coordinates);
                                inRoute = true;
                                if (stop.name === endStop) {
                                    inRoute = false;
                                }
                            }
                        });

                        // Draw polyline connecting all coordinates for the current route with a unique color
                        var color = colors[index % colors.length]; // Use modulo operator to cycle through colors if there are more routes than colors
                        polyline = L.polyline(routeCoordinates, { color: color }).addTo(map);

                        // Draw markers for connected stops and bind popups
                        routeCoordinates.forEach(coordinate => {
                            var stop = matchingRoute.stops.find(stop => stop.coordinates[0] === coordinate[0] && stop.coordinates[1] === coordinate[1]);
                            L.marker(coordinate).addTo(map).bindPopup(stop.name);
                        });

                        // Add the polyline to the array of all polylines
                        allPolylines.push(polyline);

                        // Push the route name to the matchedRouteNames array
                        matchedRouteNames.push(matchingRoute.route);
                    });

                    // Fit map bounds to show all markers and polylines
                    var group = new L.featureGroup(allPolylines);
                    map.fitBounds(group.getBounds());
                } else {
                    console.log("No routes found for the provided stops.");
                }
                 // Print matched route names in the div with id "busname"
                document.getElementById('busname').innerHTML = "<strong>Matched Route Names:</strong><br>" + matchedRouteNames.join("<br>");
            }


            // Event listener for search button click
            document.getElementById('searchButton').addEventListener('click', function() {
                searchBuses();
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Initialize the map when the DOM content is loaded
document.addEventListener('DOMContentLoaded', initMap);
