
import React from 'react';
import { Plus, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Lifeline Plus Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A seamless process from emergency to recovery
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-emergency text-white flex items-center justify-center mb-6 mx-auto">
                <Plus className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Emergency Alert</h3>
              <p className="text-gray-600 text-center">
                Press the SOS button to instantly alert nearby medical facilities and professionals about your emergency.
              </p>
              <div className="mt-6 flex justify-center">
                <ArrowRight className="h-6 w-6 text-gray-400 hidden md:block" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-medical text-white flex items-center justify-center mb-6 mx-auto">
                <Plus className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Medical Response</h3>
              <p className="text-gray-600 text-center">
                Healthcare professionals receive your details, location, and medical history for fast, informed response.
              </p>
              <div className="mt-6 flex justify-center">
                <ArrowRight className="h-6 w-6 text-gray-400 hidden md:block" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-medical-dark text-white flex items-center justify-center mb-6 mx-auto">
                <Plus className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Coordinated Care</h3>
              <p className="text-gray-600 text-center">
                Your treatment plan is updated in real-time with complete medical history for optimal recovery outcomes.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block rounded-full bg-medical-light px-4 py-1.5 text-sm font-medium text-medical mb-4">
            60+ Hospitals Connected
          </div>
          <h3 className="text-2xl font-semibold mb-8">Trusted by leading healthcare providers</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center h-16 opacity-70 hover:opacity-100 transition-opacity">
              <div className="font-bold text-xl text-gray-400">Memorial Health</div>
            </div>
            <div className="flex items-center justify-center h-16 opacity-70 hover:opacity-100 transition-opacity">
              <div className="font-bold text-xl text-gray-400">City Medical</div>
            </div>
            <div className="flex items-center justify-center h-16 opacity-70 hover:opacity-100 transition-opacity">
              <div className="font-bold text-xl text-gray-400">LifeCare</div>
            </div>
            <div className="flex items-center justify-center h-16 opacity-70 hover:opacity-100 transition-opacity">
              <div className="font-bold text-xl text-gray-400">MediPlus</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
