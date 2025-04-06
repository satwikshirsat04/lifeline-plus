// Map.tsx

import React from 'react';
import HospitalMap from './HospitalMap';  // Correct import

const Map = () => {
  return (
    <section id="map" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Real-Time Medical Resources</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Locate nearby hospitals, ambulances, and medical facilities for immediate assistance.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <HospitalMap />
          </div>

          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">How to Use the Map</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">Your Location</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    The blue marker shows your current location. Make sure to allow location access when prompted.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="font-medium">Nearby Hospitals</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Red markers indicate nearby hospitals. Click on any marker to see the hospital name and distance.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Distance Information</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    The distance to each hospital is calculated in kilometers and shown in the popup when you click a marker.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
