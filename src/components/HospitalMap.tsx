import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Import necessary components from react-leaflet
import L from 'leaflet'; // Import Leaflet for custom icons
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS for the map style

const HospitalMap = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Get the user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error getting user location:', error);
          // Fallback location in case of error
          setUserLocation([51.505, -0.09]); // Example fallback coordinates
        }
      );
    }
  }, []);

  // Custom user location icon
  const userIcon = L.divIcon({
    className: 'custom-user-icon',
    html: `
      <div class="relative">
        <div class="w-4 h-4 rounded-full"></div>
        <div class="w-4 h-4 rounded-full animate-ping"></div>
      </div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

  return (
    <MapContainer center={userLocation || [51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            <div className="w-48">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-500/50 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-blue-500/30 rounded-full animate-pulse"></div>
              </div>
              <div className="font-semibold text-blue-600">Your Current Location</div>
              <div className="text-sm text-gray-600 mt-1">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Live Location
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Coordinates: {userLocation[0].toFixed(6)}, {userLocation[1].toFixed(6)}
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default HospitalMap;
