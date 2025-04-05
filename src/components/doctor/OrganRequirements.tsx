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

const OrganRequirements = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    organType: '',
    emergencyLevel: '',
    additionalNotes: ''
  });

  const organTypes = [
    'Heart', 'Liver', 'Kidney', 'Lung', 'Pancreas',
    'Intestine', 'Cornea', 'Skin', 'Bone', 'Bone Marrow'
  ];

  const emergencyLevels = ['Low', 'Medium', 'Critical'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement organ request submission logic
    console.log(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Organ Requirements</CardTitle>
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
              <label className="block text-sm font-medium text-gray-700">Organ Type</label>
              <Select
                value={formData.organType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, organType: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select organ type" />
                </SelectTrigger>
                <SelectContent>
                  {organTypes.map((organ) => (
                    <SelectItem key={organ} value={organ.toLowerCase()}>
                      {organ}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
              <Input
                type="text"
                value={formData.additionalNotes}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                className="mt-1"
                placeholder="Any additional information..."
              />
            </div>

            <Button type="submit" className="w-full">
              Raise Organ Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganRequirements; 