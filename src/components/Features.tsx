import React, { FC, ReactNode } from 'react';

import {
  ShieldCheck,
  Clock,
  MessageSquare,
  CalendarClock,
  User,
  Info,
  Syringe
} from "lucide-react";

// FeatureCard component
const FeatureCard = ({
  icon,
  title,
  description,
  onViewClick
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onViewClick: () => void;
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md feature-card border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <button
        onClick={onViewClick}
        className="mt-4 py-2 px-5 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 hover:text-blue-800 transition-colors duration-300"
      >
        View
      </button>
    </div>
  );
};

// Features Section
const Features = () => {
  const handleViewClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section id="features" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Healthcare Management
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lifeline Plus combines cutting-edge technology with medical expertise to deliver an all-in-one solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <FeatureCard
            icon={<Info className="h-6 w-6 text-blue-600" />}
            title="Predictive Disease Alerts"
            description="AI-powered analysis of patient data to predict potential health issues before they become critical."
            onViewClick={() => handleViewClick("https://healthcareai-nk48.onrender.com/")}
          />

          <FeatureCard
            icon={<User className="h-6 w-6 text-blue-600" />}
            title="Patient Records Management"
            description="Centralized, secure storage for complete patient history, ensuring coordinated care across providers."
            onViewClick={() => alert("View functionality not implemented for this feature")}
          />

          <FeatureCard
            icon={<Syringe className="h-6 w-6 text-blue-600" />}
            title="Medicine & Blood Bank"
            description="Real-time tracking of critical medical supplies, ensuring resources are available when needed."
            onViewClick={() => alert("View functionality not implemented for this feature")}
          />

          <FeatureCard
            icon={<ShieldCheck className="h-6 w-6 text-blue-600" />}
            title="Multi-Level Security"
            description="Role-based access controls for doctors, clerks, and administrators with robust data protection."
            onViewClick={() => alert("View functionality not implemented for this feature")}
          />

          <FeatureCard
            icon={<Clock className="h-6 w-6 text-blue-600" />}
            title="Real-Time Monitoring"
            description="Continuous tracking of patient vitals with instant alerts for critical changes in condition."
            onViewClick={() => alert("View functionality not implemented for this feature")}
          />

          <FeatureCard
            icon={<MessageSquare className="h-6 w-6 text-blue-600" />}
            title="SMS & Communication"
            description="Direct messaging with healthcare providers, emergency alerts, and appointment notifications."
            onViewClick={() => alert("View functionality not implemented for this feature")}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
