
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, Ambulance, Hospital } from "lucide-react";

const Map = () => {
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  
  const mockFacilities = [
    { id: '1', name: 'Memorial Hospital', type: 'hospital', lat: 30, lng: 40, distance: '1.2 miles', eta: '6 min' },
    { id: '2', name: 'City Medical Center', type: 'hospital', lat: 35, lng: 42, distance: '2.5 miles', eta: '11 min' },
    { id: '3', name: 'Ambulance Unit 42', type: 'ambulance', lat: 31, lng: 41, distance: '0.8 miles', eta: '4 min' },
  ];
  
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
            <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-200 relative map-container">
              {/* Mock map interface */}
              <div className="absolute top-4 left-4 bg-white rounded-md shadow-md p-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-medical" />
                  <span className="text-sm font-medium">Your Location</span>
                </div>
              </div>
              
              {/* Map pins */}
              {mockFacilities.map((facility) => (
                <div 
                  key={facility.id}
                  className={`absolute cursor-pointer transition-all duration-300 ${
                    selectedFacility === facility.id ? 'scale-125 z-10' : 'scale-100 z-0'
                  }`}
                  style={{ 
                    top: `${100 + facility.lat}px`, 
                    left: `${150 + facility.lng}px` 
                  }}
                  onClick={() => setSelectedFacility(facility.id)}
                >
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${facility.type === 'hospital' ? 'bg-medical text-white' : 'bg-emergency text-white'}
                  `}>
                    {facility.type === 'hospital' ? 
                      <Hospital className="h-5 w-5" /> : 
                      <Ambulance className="h-5 w-5" />
                    }
                  </div>
                  {selectedFacility === facility.id && (
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white rounded-md shadow-lg p-2 w-48">
                      <div className="text-sm font-medium">{facility.name}</div>
                      <div className="text-xs text-gray-500 flex justify-between mt-1">
                        <span>Distance: {facility.distance}</span>
                        <span>ETA: {facility.eta}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Concentric circles from your location */}
              <div className="absolute top-[200px] left-[200px]">
                <div className="w-4 h-4 bg-blue-500 rounded-full z-20 relative"></div>
                <div className="w-16 h-16 bg-blue-500/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                <div className="w-32 h-32 bg-blue-500/10 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="w-64 h-64 bg-blue-500/5 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              
              {/* Map grid overlay for visual effect */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="absolute left-0 right-0 border-t border-gray-400" style={{ top: `${i * 10}%` }}></div>
                ))}
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="absolute top-0 bottom-0 border-l border-gray-400" style={{ left: `${i * 10}%` }}></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">Nearby Medical Facilities</h3>
              <div className="space-y-4">
                {mockFacilities.map((facility) => (
                  <div 
                    key={facility.id}
                    className={`
                      p-4 rounded-lg cursor-pointer transition-all
                      ${selectedFacility === facility.id 
                        ? facility.type === 'hospital' ? 'bg-medical-light border-medical' : 'bg-emergency-light border-emergency' 
                        : 'bg-gray-50 hover:bg-gray-100 border-transparent'}
                      border
                    `}
                    onClick={() => setSelectedFacility(facility.id)}
                  >
                    <div className="flex items-center">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${facility.type === 'hospital' ? 'bg-medical text-white' : 'bg-emergency text-white'}
                      `}>
                        {facility.type === 'hospital' ? 
                          <Hospital className="h-5 w-5" /> : 
                          <Ambulance className="h-5 w-5" />
                        }
                      </div>
                      <div className="ml-3">
                        <div className="font-medium">{facility.name}</div>
                        <div className="text-sm text-gray-500 flex space-x-3">
                          <span>{facility.distance}</span>
                          <span>•</span>
                          <span>ETA: {facility.eta}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">Resource Availability</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">ICU Beds</span>
                  <span className="text-sm font-medium">8 available</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-medical rounded-full" style={{ width: '40%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-600">Blood Bank (O-)</span>
                  <span className="text-sm font-medium">Limited supply</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emergency rounded-full" style={{ width: '15%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-600">Ambulances</span>
                  <span className="text-sm font-medium">12 active units</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-medical rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <Button className="w-full mt-6">View Detailed Resources</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
