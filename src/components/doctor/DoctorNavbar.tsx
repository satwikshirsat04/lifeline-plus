import React from 'react';
import { Button } from "@/components/ui/button";
import { BellRing, User, Upload, Heart, Droplets, Activity, FileText } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const DoctorNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <User className="h-6 w-6 text-medical" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Dr. John Doe</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="flex items-center" onClick={() => navigate('/doctor/medicine')}>
                <Upload className="mr-2 h-4 w-4" />
                Medicine Requirements
              </Button>
              <Button variant="ghost" className="flex items-center" onClick={() => navigate('/doctor/organ')}>
                <Heart className="mr-2 h-4 w-4" />
                Organ Requirements
              </Button>
              <Button variant="ghost" className="flex items-center" onClick={() => navigate('/doctor/blood')}>
                <Droplets className="mr-2 h-4 w-4" />
                Blood Requirements
              </Button>
              <Button variant="ghost" className="flex items-center" onClick={() => navigate('/doctor/prediction')}>
                <Activity className="mr-2 h-4 w-4" />
                Disease Prediction
              </Button>
              <Button variant="ghost" className="flex items-center" onClick={() => navigate('/doctor/records')}>
                <FileText className="mr-2 h-4 w-4" />
                Patient Records
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <BellRing className="h-5 w-5 text-gray-500" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-emergency animate-pulse"></span>
            </Button>
            <Button variant="outline">Logout</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DoctorNavbar; 