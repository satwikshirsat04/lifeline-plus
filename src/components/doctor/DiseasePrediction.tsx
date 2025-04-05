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
import { Activity } from "lucide-react";

const DiseasePrediction = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    diseaseType: '',
    symptoms: '',
    age: '',
    gender: '',
    bloodPressure: '',
    cholesterol: '',
    glucose: '',
    bmi: ''
  });

  const diseases = [
    'Heart Attack',
    'Diabetes',
    'Parkinson\'s',
    'Cancer'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement AI prediction logic
    console.log(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5 text-medical" />
            Disease Prediction
          </CardTitle>
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
              <label className="block text-sm font-medium text-gray-700">Disease Type</label>
              <Select
                value={formData.diseaseType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, diseaseType: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select disease type" />
                </SelectTrigger>
                <SelectContent>
                  {diseases.map((disease) => (
                    <SelectItem key={disease} value={disease.toLowerCase()}>
                      {disease}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Symptoms</label>
              <Input
                type="text"
                value={formData.symptoms}
                onChange={(e) => setFormData(prev => ({ ...prev, symptoms: e.target.value }))}
                className="mt-1"
                placeholder="Enter symptoms separated by commas"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Blood Pressure (mmHg)</label>
                <Input
                  type="text"
                  value={formData.bloodPressure}
                  onChange={(e) => setFormData(prev => ({ ...prev, bloodPressure: e.target.value }))}
                  className="mt-1"
                  placeholder="e.g., 120/80"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Cholesterol (mg/dL)</label>
                <Input
                  type="number"
                  value={formData.cholesterol}
                  onChange={(e) => setFormData(prev => ({ ...prev, cholesterol: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Glucose (mg/dL)</label>
                <Input
                  type="number"
                  value={formData.glucose}
                  onChange={(e) => setFormData(prev => ({ ...prev, glucose: e.target.value }))}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">BMI</label>
                <Input
                  type="number"
                  value={formData.bmi}
                  onChange={(e) => setFormData(prev => ({ ...prev, bmi: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Predict Disease Risk
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiseasePrediction; 