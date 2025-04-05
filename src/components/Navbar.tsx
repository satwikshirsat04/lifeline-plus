
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Ambulance, User, BellRing } from "lucide-react";

const Navbar = () => {
  const { toast } = useToast();

  const handleLogin = () => {
    toast({
      title: "Login feature",
      description: "The login system will be implemented in the next version.",
    });
  };

  return (
    <nav className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Ambulance className="h-6 w-6 text-medical" />
            <span className="ml-2 text-xl font-semibold text-gray-900">Lifeline<span className="text-medical">Plus</span></span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <a href="#features" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-medical transition-colors duration-200">
              Features
            </a>
            <a href="#how-it-works" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-medical transition-colors duration-200">
              How It Works
            </a>
            <a href="#map" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-medical transition-colors duration-200">
              Map
            </a>
            <a href="#contact" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-medical transition-colors duration-200">
              Contact
            </a>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <BellRing className="h-5 w-5 text-gray-500" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-emergency animate-pulse"></span>
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex items-center" onClick={handleLogin}>
              <User className="mr-1 h-4 w-4" />
              Login
            </Button>
            <Button onClick={handleLogin} size="sm" className="bg-medical hover:bg-medical-dark text-white">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
