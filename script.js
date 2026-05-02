document.addEventListener("DOMContentLoaded", () => {

    let initialZoom = 4;
    const screenWidth = window.innerWidth;

    if (screenWidth >= 601 && screenWidth <= 1024) {
        initialZoom = 3;
    }

    const centerLat = (54.8985 + 48.2167) / 2;
    const centerLng = (23.9036 + 18.6167) / 2;

    const map = L.map("map", {
        center: [centerLat, centerLng],
        zoom: initialZoom,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false
    });

    L.control.zoom({ position: "topright" }).addTo(map);

    // ⭐ Best free tile layer for GitHub Pages (no API key)
    L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
            maxZoom: 18,
            minZoom: 3
        }
    ).addTo(map);

    const locations = [
        {
            coords: [54.8985, 23.9036],
            name: "Lithuania",
            city: "Kaunas",
            period: "Dec 2023 - Jan 2024"
        },
        {
            coords: [48.2167, 18.6167],
            name: "Slovakia",
            city: "Levice",
            period: "Mar 2025 - Apr 2025"
        }
    ];

    locations.forEach((loc, index) => {

        L.circleMarker(loc.coords, {
            radius: 12,
            color: "black",
            fillColor: "black",
            fillOpacity: 1,
            interactive: false
        }).addTo(map);

        L.circleMarker(loc.coords, {
            radius: 10,
            color: "lightseagreen",
            fillColor: "lightseagreen",
            fillOpacity: 1,
            interactive: false
        }).addTo(map);

        const inner = L.circleMarker(loc.coords, {
            radius: 6,
            color: "white",
            fillColor: "white",
            fillOpacity: 1
        }).addTo(map);

        inner.bindTooltip(
            `<span>${loc.name}</span>`,
            {
                permanent: true,
                direction: "top",
                offset: [-10, -15],
                className: "custom-tooltip",
                interactive: true
            }
        );

        inner.bindPopup(
            `<div>
                <h4>${loc.name}, ${loc.city}</h4>
                <p><strong>${loc.period}</strong></p>
            </div>`,
            { className: "my-popup" }
        );
    });
});
