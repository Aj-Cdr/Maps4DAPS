// TOKEN = 'pk.eyJ1IjoiYXBvb3J2ZWxvdXMiLCJhIjoiY2ttZnlyMDgzMzlwNTJ4a240cmEzcG0xNyJ9.-nSyL0Gy2nifDibXJg4fTA';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXBvb3J2ZWxvdXMiLCJhIjoiY2ttZnlyMDgzMzlwNTJ4a240cmEzcG0xNyJ9.-nSyL0Gy2nifDibXJg4fTA';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [-117.8265, 33.6846], // starting position [lng, lat]
    zoom: 11.5, // starting zoom to view the bounding box clearly
    pitch: 0, // starting pitch
    bearing: 0, // starting bearing
    cooperativeGestures: true
});

map.on('style.load', () => {
    // Add the line source and layer
    map.addSource('line', {
        type: 'geojson',
        lineMetrics: true,
        data: {
            type: 'LineString',
            coordinates: [
                [-117.8265, 33.6846],
                [-117.8245, 33.6856]
            ]
        }
    });

    // map.addLayer({
    //     id: 'line',
    //     source: 'line',
    //     type: 'line',
    //     paint: {
    //         'line-width': 12,
    //         'line-emissive-strength': 0.8,
    //         'line-gradient': [
    //             'interpolate',
    //             ['linear'],
    //             ['line-progress'],
    //             0,
    //             'red',
    //             1,
    //             'blue'
    //         ]
    //     }
    // });

    // Add the bounding box source and layer using LineString
    map.addSource('boundingBox', {
        type: 'geojson',
        data: {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [
                    [-117.887, 33.728], // top-left corner
                    [-117.887, 33.628], // bottom-left corner
                    [-117.718, 33.628], // bottom-right corner
                    [-117.718, 33.728], // top-right corner
                    [-117.887, 33.728]  // closing the box
                ]
            }
        }
    });

    // Initialize the geocoder control.
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: true, 
        color: "red"
    });

    // Add the geocoder to the map.
    map.addControl(geocoder);

    let coordinates;
    let placeName;
    // Add an event listener to handle the search results.
    geocoder.on('result', function(event) {
        const result = event.result;
        console.log('Geocoder result:', result);

        // Extract the coordinates and place name.
        coordinates = result.geometry.coordinates;
        placeName = result.place_name;

        console.log(`Coordinates: ${coordinates}`);
        console.log(`Place name: ${placeName}`);
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());

    map.addLayer({
        id: 'boundingBox',
        source: 'boundingBox',
        type: 'line',
        paint: {
            'line-color': 'red',
            'line-width': 5
        }
    });

    let markerData = []
    let num = 0

    let popup;

    // Event listener for the 'submit' button
    document.getElementById('submit').addEventListener("click", () => {
        let vision = parseFloat(document.getElementById("vision").value) || 0;
        let mobility = parseFloat(document.getElementById("mobility").value) || 0;
        let hearing = parseFloat(document.getElementById("hearing").value) || 0;
    
        console.log(vision, mobility, hearing);

        popup = new mapboxgl.Popup({ offset: 25 }).setText(
            `
             Vision: ${vision}
             Mobility: ${mobility}
             Hearing: ${hearing}`
        );
    
        let ratings = (vision + mobility + hearing) / 3;
        ratings = Math.round(ratings); // Round the ratings to the nearest whole number
        console.log(ratings);
    
        if (coordinates) { // Ensure coordinates are defined
            markerData.push({ coords: coordinates, image: `images/${ratings}.png` });
            console.log('Marker Data:', markerData);
            num += 1;
            addMarkers(); // Call the function to add markers to the map
        } else {
            console.error('Coordinates are not defined');
        }
    });

    const el = document.createElement('div');
    el.id = 'marker';

// Function to add markers to the map
function addMarkers() {
    markerData.forEach(marker => {
        new mapboxgl.Marker({
            // Set the marker's icon image
            element: createMarkerElement(`${marker.image}`)
        })
        .setLngLat(marker.coords)
        .setPopup(popup)
        .addTo(map);
    });
}

// Function to create a marker element with a specific icon
function createMarkerElement(iconImage) {
    const markerElement = document.createElement('div');
    markerElement.className = 'marker';
    markerElement.style.backgroundImage = `url(${iconImage})`;
    markerElement.style.backgroundSize = 'contain';
    markerElement.style.width = '30px'; // Adjust size as needed
    markerElement.style.height = '30px'; // Adjust size as needed
    return markerElement;
}
    
});


popup1 = new mapboxgl.Popup({ offset: 25 }).setText(
    `
     Vision: 1
     Mobility: 2
     Hearing: 3`
);

var img1 = document.querySelector("#loc1")

	var marker1 = new mapboxgl.Marker({
		element: img1,
        
	})
		.setLngLat([-117.812857,33.685447])
		.addTo(map)
        .setPopup(popup1)

var img2 = document.querySelector("#loc2")

popup2 = new mapboxgl.Popup({ offset: 25 }).setText(
    `
     Vision: 2
     Mobility: 1
     Hearing: 3`
);

	var marker2 = new mapboxgl.Marker({
		element: img2
	})
		.setLngLat([-117.80642950000001, 33.6783785])
		.addTo(map)
        .setPopup(popup2)

var img3 = document.querySelector("#loc3")
popup3 = new mapboxgl.Popup({ offset: 25 }).setText(
    `
     Vision: 4
     Mobility: 2
     Hearing: 3`
);

	var marker3 = new mapboxgl.Marker({
		element: img3
	})
		.setLngLat([-117.762665,33.71265])
		.addTo(map)
        .setPopup(popup3)

var img4 = document.querySelector("#loc4")
popup4 = new mapboxgl.Popup({ offset: 25 }).setText(
    `
     Vision: 4
     Mobility: 3
     Hearing: 3`
);

	var marker4 = new mapboxgl.Marker({
		element: img4
	})
		.setLngLat([-117.81319,33.639465])
		.addTo(map)
        .setPopup(popup4)


document
    .getElementById('lightPreset')
    .addEventListener('change', function () {
        map.setConfigProperty('basemap', 'lightPreset', this.value);
    });

document
    .querySelectorAll('.map-overlay-inner input[type="checkbox"]')
    .forEach((checkbox) => {
        checkbox.addEventListener('change', function () {
            map.setConfigProperty('basemap', this.id, this.checked);
        });
    });