import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BloodRequirements = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    bloodType: '',
    unitsRequired: '',
    emergencyLevel: '',
    hospitalName: '',
    contactNumber: ''
  });

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const emergencyLevels = ['Low', 'Medium', 'Critical'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement blood request submission logic
    console.log(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Blood Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Patient Name</label>
              <Input
                type="text"
                value={formData.patientName}
                onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
                className="mt-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Type</label>
              <Select
                value={formData.bloodType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, bloodType: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  {bloodTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Units Required</label>
              <Input
                type="number"
                value={formData.unitsRequired}
                onChange={(e) => setFormData(prev => ({ ...prev, unitsRequired: e.target.value }))}
                className="mt-1"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Emergency Level</label>
              <Select
                value={formData.emergencyLevel}
                onValueChange={(value) => setFormData(prev => ({ ...prev, emergencyLevel: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select emergency level" />
                </SelectTrigger>
                <SelectContent>
                  {emergencyLevels.map((level) => (
                    <SelectItem key={level} value={level.toLowerCase()}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Hospital Name</label>
              <Input
                type="text"
                value={formData.hospitalName}
                onChange={(e) => setFormData(prev => ({ ...prev, hospitalName: e.target.value }))}
                className="mt-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <Input
                type="tel"
                value={formData.contactNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
                className="mt-1"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Raise Blood Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BloodRequirements; 