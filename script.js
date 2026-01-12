document.addEventListener("DOMContentLoaded", function() {

    const centerLat = (54.8985 + 48.2167) / 2; 
    const centerLng = (23.9036 + 18.6167) / 2; 

    const map = L.map('map', {
        center: [centerLat, centerLng],
        zoom: 4, 
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false
    });

    L.control.zoom({
        position: 'topright'
    }).addTo(map)

    L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg',{
        maxZoom: 10,
        minZoom: 3
    }).addTo(map);

    const otherLocations = [
        {
            coords: [54.8985, 23.9036],
            name: "Lithuania",
            period: "Dec 2023 - Jan 2024",
            description: "Erasmus program in Kaunas, learned new tools, met amazing people, expanded dev skills."
        },
        {
            coords: [48.2167, 18.6167],
            name: "Slovakia",
            period: "Mar 2025 - Apr 2025",
            description: "Erasmus program in Levice, explored programming further, collaborated on international projects."
        }
    ];

    otherLocations.forEach((loc, index) => {
        const outer = L.circleMarker(loc.coords, {
            radius: 12,
            color: 'black',
            fillColor: 'black',
            fillOpacity: 1,
            interactive: false
        }).addTo(map);

        const middle = L.circleMarker(loc.coords, {
            radius: 10,
            color: 'lightseagreen',
            fillColor: 'lightseagreen',
            fillOpacity: 1,
            interactive: false
        }).addTo(map);

        const inner = L.circleMarker(loc.coords, {
            radius: 6,
            color: 'white',
            fillColor: 'white',
            fillOpacity: 1
        }).addTo(map);

        inner.bindTooltip(
            `<span>${loc.name}</span>`,
            { 
                permanent: true, 
                direction: 'top',
                offset: [-10, -15],
                className: 'custom-tooltip',
                interactive: true
            }
        );

        inner.bindPopup(
            `<div id="popup-${index}">
                <h4>${loc.name}</h4>
                <p><strong>${loc.period}</strong></p>
                <p>${loc.description}</p>
            </div>`,
            { className: 'my-popup' }
        );

    });

});
