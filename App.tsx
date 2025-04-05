import React, { useState } from 'react';
import { Heart, Upload, FileText, Menu, X, Home, LogOut, User, ClipboardList, Pill, FileCheck, AlertCircle } from 'lucide-react';
import './App.css';

type UserType = 'doctor' | 'patient' | null;
type View = 'login' | 'dashboard';
type DashboardView = 'home' | 'medicine' | 'organ' | 'blood' | 'prediction' | 'records';
type PatientDashboardView = 'profile' | 'prescriptions' | 'history' | 'insurance';
type EmergencyLevel = 'Low' | 'Medium' | 'Critical';

interface Patient {
  id: string;
  name: string;
  age: number;
  history: string[];
}

interface Prescription {
  id: string;
  date: string;
  doctor: string;
  medication: string;
  instructions: string;
}

interface HealthRecord {
  bloodType: string;
  height: string;
  weight: string;
  allergies: string;
  medicalHistory: string;
  addictions: {
    hasAddictions: boolean;
    details: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };
  consents: {
    treatment: boolean;
    sharingRecords: boolean;
  };
}

// Add DoctorDashboard component definition
const DoctorDashboard = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={doctorInfo.image} alt="Doctor" className="doctor-image" />
          <h3>{doctorInfo.name}</h3>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">
            <Home size={20} />
            Dashboard
          </button>
          <button className="nav-item">
            <User size={20} />
            Patients
          </button>
          <button className="nav-item">
            <ClipboardList size={20} />
            Appointments
          </button>
          <button className="nav-item">
            <FileText size={20} />
            Records
          </button>
          <button className="nav-item logout">
            <LogOut size={20} />
            Logout
          </button>
        </nav>
      </aside>
      <div className="dashboard-main">
        <h2>Welcome, Dr. Sarah Wilson</h2>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Today's Appointments</h3>
            <p>8</p>
          </div>
          <div className="stat-card">
            <h3>Pending Reports</h3>
            <p>3</p>
          </div>
          <div className="stat-card">
            <h3>Total Patients</h3>
            <p>142</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [selectedUserType, setSelectedUserType] = useState<UserType>(null);
  const [currentView, setCurrentView] = useState<View>('login');
  const [dashboardView, setDashboardView] = useState<DashboardView>('home');
  const [patientDashboardView, setPatientDashboardView] = useState<PatientDashboardView>('profile');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Mock data
  const doctorInfo = {
    name: "Dr. Sarah Wilson",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200"
  };

  const patientInfo = {
    name: "John Smith",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200&h=200"
  };

  const mockPrescriptions: Prescription[] = [
    {
      id: "1",
      date: "2024-03-15",
      doctor: "Dr. Sarah Wilson",
      medication: "Amoxicillin 500mg",
      instructions: "Take one capsule three times daily with meals"
    },
    {
      id: "2",
      date: "2024-03-10",
      doctor: "Dr. Michael Brown",
      medication: "Ibuprofen 400mg",
      instructions: "Take one tablet every 6 hours as needed for pain"
    }
  ];

  const [healthRecord, setHealthRecord] = useState<HealthRecord>({
    bloodType: "",
    height: "",
    weight: "",
    allergies: "",
    medicalHistory: "",
    addictions: {
      hasAddictions: false,
      details: ""
    },
    insurance: {
      provider: "",
      policyNumber: "",
      expiryDate: ""
    },
    consents: {
      treatment: false,
      sharingRecords: false
    }
  });

  const handleSOSClick = () => {
    alert('Emergency services will be contacted immediately!');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView('dashboard');
  };

  const handleHealthRecordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Health record updated successfully!');
  };

  const AuthForm = ({ userType }: { userType: 'doctor' | 'patient' }) => (
    <form className="auth-form" onSubmit={handleLogin}>
      <h2 className="form-title">
        {userType === 'doctor' ? 'Doctor Login' : 'Patient Login'}
      </h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <button type="submit" className="submit-button">
        Sign In
      </button>
    </form>
  );

  const PatientDashboard = () => {
    const renderDashboardContent = () => {
      switch (patientDashboardView) {
        case 'prescriptions':
          return (
            <div className="dashboard-content">
              <h2>My Prescriptions</h2>
              <div className="prescriptions-list">
                {mockPrescriptions.map(prescription => (
                  <div key={prescription.id} className="prescription-card">
                    <div className="prescription-header">
                      <Pill size={24} />
                      <span className="prescription-date">{prescription.date}</span>
                    </div>
                    <h3>Prescribed by: {prescription.doctor}</h3>
                    <p className="medication">{prescription.medication}</p>
                    <p className="instructions">{prescription.instructions}</p>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'history':
          return (
            <div className="dashboard-content">
              <h2>Medical History</h2>
              <form className="health-record-form" onSubmit={handleHealthRecordSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Blood Type</label>
                    <select 
                      value={healthRecord.bloodType}
                      onChange={(e) => setHealthRecord({...healthRecord, bloodType: e.target.value})}
                      className="select-input"
                    >
                      <option value="">Select Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Height (cm)</label>
                    <input
                      type="number"
                      value={healthRecord.height}
                      onChange={(e) => setHealthRecord({...healthRecord, height: e.target.value})}
                      className="number-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Weight (kg)</label>
                    <input
                      type="number"
                      value={healthRecord.weight}
                      onChange={(e) => setHealthRecord({...healthRecord, weight: e.target.value})}
                      className="number-input"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Allergies</label>
                  <textarea
                    value={healthRecord.allergies}
                    onChange={(e) => setHealthRecord({...healthRecord, allergies: e.target.value})}
                    placeholder="List any allergies..."
                    className="text-area"
                  />
                </div>
                <div className="form-group">
                  <label>Medical History</label>
                  <textarea
                    value={healthRecord.medicalHistory}
                    onChange={(e) => setHealthRecord({...healthRecord, medicalHistory: e.target.value})}
                    placeholder="Describe your medical history..."
                    className="text-area"
                  />
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={healthRecord.addictions.hasAddictions}
                      onChange={(e) => setHealthRecord({
                        ...healthRecord,
                        addictions: {
                          ...healthRecord.addictions,
                          hasAddictions: e.target.checked
                        }
                      })}
                    />
                    Do you have any addictions?
                  </label>
                  {healthRecord.addictions.hasAddictions && (
                    <textarea
                      value={healthRecord.addictions.details}
                      onChange={(e) => setHealthRecord({
                        ...healthRecord,
                        addictions: {
                          ...healthRecord.addictions,
                          details: e.target.value
                        }
                      })}
                      placeholder="Please provide details..."
                      className="text-area"
                    />
                  )}
                </div>
                <div className="consent-section">
                  <h3>Consent</h3>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={healthRecord.consents.treatment}
                        onChange={(e) => setHealthRecord({
                          ...healthRecord,
                          consents: {
                            ...healthRecord.consents,
                            treatment: e.target.checked
                          }
                        })}
                      />
                      I consent to treatment
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={healthRecord.consents.sharingRecords}
                        onChange={(e) => setHealthRecord({
                          ...healthRecord,
                          consents: {
                            ...healthRecord.consents,
                            sharingRecords: e.target.checked
                          }
                        })}
                      />
                      I consent to sharing my medical records with doctors
                    </label>
                  </div>
                </div>
                <button type="submit" className="submit-button">Save Medical History</button>
              </form>
            </div>
          );

        case 'insurance':
          return (
            <div className="dashboard-content">
              <h2>Medical Insurance</h2>
              <div className="insurance-form">
                <div className="form-group">
                  <label>Insurance Provider</label>
                  <input
                    type="text"
                    value={healthRecord.insurance.provider}
                    onChange={(e) => setHealthRecord({
                      ...healthRecord,
                      insurance: {
                        ...healthRecord.insurance,
                        provider: e.target.value
                      }
                    })}
                    placeholder="Enter insurance provider"
                  />
                </div>
                <div className="form-group">
                  <label>Policy Number</label>
                  <input
                    type="text"
                    value={healthRecord.insurance.policyNumber}
                    onChange={(e) => setHealthRecord({
                      ...healthRecord,
                      insurance: {
                        ...healthRecord.insurance,
                        policyNumber: e.target.value
                      }
                    })}
                    placeholder="Enter policy number"
                  />
                </div>
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="date"
                    value={healthRecord.insurance.expiryDate}
                    onChange={(e) => setHealthRecord({
                      ...healthRecord,
                      insurance: {
                        ...healthRecord.insurance,
                        expiryDate: e.target.value
                      }
                    })}
                  />
                </div>
                <div className="upload-section">
                  <div className="upload-box">
                    <Upload size={48} />
                    <p>Upload insurance documents</p>
                    <input type="file" accept=".pdf,.jpg,.png" className="file-input" />
                  </div>
                </div>
                <button className="submit-button">Save Insurance Information</button>
              </div>
            </div>
          );

        default:
          return (
            <div className="dashboard-content">
              <h2>Welcome, {patientInfo.name}</h2>
              <div className="dashboard-stats">
                <div className="stat-card">
                  <h3>Upcoming Appointments</h3>
                  <p>2</p>
                </div>
                <div className="stat-card">
                  <h3>Active Prescriptions</h3>
                  <p>3</p>
                </div>
                <div className="stat-card">
                  <h3>Last Checkup</h3>
                  <p>7d ago</p>
                </div>
              </div>
              <div className="quick-actions">
                <button className="action-button" onClick={() => setPatientDashboardView('prescriptions')}>
                  <Pill size={24} />
                  View Prescriptions
                </button>
                <button className="action-button" onClick={() => setPatientDashboardView('history')}>
                  <ClipboardList size={24} />
                  Update Medical History
                </button>
                <button className="action-button" onClick={() => setPatientDashboardView('insurance')}>
                  <FileCheck size={24} />
                  Insurance Details
                </button>
              </div>
            </div>
          );
      }
    };

    return (
      <div className="dashboard">
        <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <img src={patientInfo.image} alt="Patient" className="patient-image" />
            <h3>{patientInfo.name}</h3>
          </div>
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${patientDashboardView === 'profile' ? 'active' : ''}`}
              onClick={() => setPatientDashboardView('profile')}
            >
              <Home size={20} />
              Dashboard
            </button>
            <button 
              className={`nav-item ${patientDashboardView === 'prescriptions' ? 'active' : ''}`}
              onClick={() => setPatientDashboardView('prescriptions')}
            >
              <Pill size={20} />
              Prescriptions
            </button>
            <button 
              className={`nav-item ${patientDashboardView === 'history' ? 'active' : ''}`}
              onClick={() => setPatientDashboardView('history')}
            >
              <ClipboardList size={20} />
              Medical History
            </button>
            <button 
              className={`nav-item ${patientDashboardView === 'insurance' ? 'active' : ''}`}
              onClick={() => setPatientDashboardView('insurance')}
            >
              <FileCheck size={20} />
              Insurance
            </button>
            <button 
              className="nav-item emergency"
              onClick={handleSOSClick}
            >
              <AlertCircle size={20} />
              Emergency SOS
            </button>
            <button 
              className="nav-item logout"
              onClick={() => setCurrentView('login')}
            >
              <LogOut size={20} />
              Logout
            </button>
          </nav>
        </aside>
        <div className="dashboard-main">
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {renderDashboardContent()}
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      {currentView === 'login' ? (
        <>
          <header className="header">
            <div className="logo-container">
              <Heart size={32} color="#dc2626" />
              <h1 className="logo-text">LifeLine+</h1>
            </div>
          </header>

          <main className="main-content">
            <button className="sos-button" onClick={handleSOSClick}>
              SOS
            </button>

            <div className="tabs">
              <button
                className="tab"
                onClick={() => setSelectedUserType('doctor')}
              >
                Doctor
              </button>
              <button
                className="tab"
                onClick={() => setSelectedUserType('patient')}
              >
                Patient
              </button>
            </div>

            {selectedUserType && <AuthForm userType={selectedUserType} />}
          </main>
        </>
      ) : (
        selectedUserType === 'doctor' ? <DoctorDashboard /> : <PatientDashboard />
      )}
    </div>
  );
}

export default App;