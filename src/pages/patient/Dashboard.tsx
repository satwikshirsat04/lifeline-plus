import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, FileText, Upload, BellRing } from "lucide-react";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('prescriptions');
  const [formData, setFormData] = useState({
    basicInfo: {
      height: '',
      weight: '',
      bloodType: '',
      allergies: ''
    },
    medicalHistory: '',
    addictionInfo: {
      hasAddiction: false,
      type: ''
    },
    insuranceInfo: null
  });

  const prescriptions = [
    {
      id: 1,
      date: "2024-03-15",
      doctor: "Dr. John Doe",
      medications: [
        { name: "Medication A", dosage: "500mg", frequency: "Twice daily" },
        { name: "Medication B", dosage: "100mg", frequency: "Once daily" }
      ]
    },
    {
      id: 2,
      date: "2024-02-20",
      doctor: "Dr. Jane Smith",
      medications: [
        { name: "Medication C", dosage: "200mg", frequency: "Three times daily" }
      ]
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [name]: value
      }
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        insuranceInfo: e.target.files[0]
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <User className="h-6 w-6 text-medical" />
              <span className="ml-2 text-xl font-semibold text-gray-900">John Patient</span>
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

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="prescriptions" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="medical-info">Medical Information</TabsTrigger>
          </TabsList>

          <TabsContent value="prescriptions">
            <div className="space-y-4">
              {prescriptions.map(prescription => (
                <Card key={prescription.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Prescription from {prescription.doctor}</span>
                      <span className="text-sm text-gray-500">{prescription.date}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {prescription.medications.map((med, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <p className="font-medium">{med.name}</p>
                          <p className="text-sm text-gray-500">Dosage: {med.dosage}</p>
                          <p className="text-sm text-gray-500">Frequency: {med.frequency}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="medical-info">
            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                      <Input
                        type="number"
                        name="height"
                        value={formData.basicInfo.height}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                      <Input
                        type="number"
                        name="weight"
                        value={formData.basicInfo.weight}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Blood Type</label>
                      <Input
                        type="text"
                        name="bloodType"
                        value={formData.basicInfo.bloodType}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Allergies</label>
                      <Input
                        type="text"
                        name="allergies"
                        value={formData.basicInfo.allergies}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Medical History</label>
                    <textarea
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-medical focus:ring-medical sm:text-sm"
                      rows={4}
                      value={formData.medicalHistory}
                      onChange={(e) => setFormData(prev => ({ ...prev, medicalHistory: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Addiction Information</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-medical focus:ring-medical border-gray-300 rounded"
                          checked={formData.addictionInfo.hasAddiction}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            addictionInfo: {
                              ...prev.addictionInfo,
                              hasAddiction: e.target.checked
                            }
                          }))}
                        />
                        <label className="ml-2 block text-sm text-gray-900">Has Addiction</label>
                      </div>
                      {formData.addictionInfo.hasAddiction && (
                        <Input
                          type="text"
                          placeholder="Type of addiction"
                          value={formData.addictionInfo.type}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            addictionInfo: {
                              ...prev.addictionInfo,
                              type: e.target.value
                            }
                          }))}
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Medical Insurance</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="insurance-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-medical hover:text-medical-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-medical"
                          >
                            <span>Upload a file</span>
                            <input
                              id="insurance-upload"
                              name="insurance-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleFileUpload}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-medical focus:ring-medical border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        I consent to treatment
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-medical focus:ring-medical border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        I consent to sharing my medical records with doctors
                      </label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Save Information
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboard; 