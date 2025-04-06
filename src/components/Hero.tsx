import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Hospital, CircleCheck, Phone } from "lucide-react";

const Hero = () => {
  const { toast } = useToast();
  const [isSOSActive, setIsSOSActive] = useState(false);

  const handleSOSClick = () => {
    setIsSOSActive(true);

    // 1. UI Toast (Immediate)
    toast({
      title: "Emergency Alert Sent!",
      description: "Notifying nearby hospitals and medical professionals.",
      variant: "destructive",
    });

    // 2. Get current location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch("http://localhost:5000/send-sos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ latitude, longitude }),
          });

          const data = await response.json();
          if (data.success) {
            console.log("✅ SOS sent via Twilio");
          } else {
            console.error("❌ Backend error:", data);
          }
        } catch (err) {
          console.error("❌ Fetch error:", err);
        }
      },
      (error) => {
        console.error("❌ Geolocation error:", error);
        toast({
          title: "Location Error",
          description: "Could not access your location. Please enable GPS.",
          variant: "destructive",
        });
      }
    );

    // 3. UI Response Simulation
    setTimeout(() => {
      toast({
        title: "Response Received",
        description: "Memorial Hospital has accepted your alert. ETA: 8 minutes.",
      });

      // 4. Reset SOS Button
      setTimeout(() => {
        setIsSOSActive(false);
      }, 5000);
    }, 3000);
  };

  return (
    <div className="hero-gradient w-full py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Smart Healthcare <br />
              <span className="text-medical">Made Simple</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Revolutionizing emergency care with instant alerts, real-time tracking, and comprehensive patient management.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-auto">
                <button
                  onClick={handleSOSClick}
                  disabled={isSOSActive}
                  className={`
                    w-full sm:w-48 h-48 sm:h-48 rounded-full flex items-center justify-center
                    text-2xl font-bold text-white uppercase tracking-wider
                    ${isSOSActive
                      ? 'bg-emergency-dark cursor-not-allowed'
                      : 'bg-emergency hover:bg-emergency-dark sos-button-shadow animate-pulse-sos cursor-pointer'}
                    transition-all duration-300 ease-in-out
                  `}
                >
                  {isSOSActive ? (
                    <div className="flex flex-col items-center">
                      <CircleCheck className="h-12 w-12 mb-2" />
                      <span>ALERT SENT</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Hospital className="h-12 w-12 mb-2" />
                      <span>SOS</span>
                    </div>
                  )}
                </button>
              </div>

              <div className="space-y-4 w-full sm:w-auto">
                <div className="flex items-center space-x-2">
                  <CircleCheck className="h-5 w-5 text-medical" />
                  <span className="text-gray-700">Instant Hospital Alerts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CircleCheck className="h-5 w-5 text-medical" />
                  <span className="text-gray-700">SMS Notifications to Doctors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CircleCheck className="h-5 w-5 text-medical" />
                  <span className="text-gray-700">Real-time Ambulance Tracking</span>
                </div>
                <Button className="mt-4 bg-gray-800 hover:bg-gray-900">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Emergency Services
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-medical to-medical-light"></div>
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Healthcare professionals responding to emergency"
                className="w-full h-96 object-cover object-center"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-medical-light flex items-center justify-center">
                      <Hospital className="h-6 w-6 text-medical" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">Emergency Response</h3>
                    <p className="text-gray-600">Fast, reliable care when minutes matter most</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                  <span>Average response time: 8 minutes</span>
                  <span>Success rate: 99.7%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
