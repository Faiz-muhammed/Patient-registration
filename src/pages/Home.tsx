import { useState } from "react";
import PatientRegForm from "../components/PatientRegForm";
import PatientList from "../components/PatientList";
import SQLInterface from "../components/QueryRecords";
import { Database, Eye, Plus, RefreshCw, Users } from "lucide-react";
import { usePgliteContext } from "../context/pgliteContext";

const HomePage = () => {
  const { isInitialized } = usePgliteContext();
  const [activeTab, setActiveTab] = useState('register');

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <RefreshCw className="animate-spin" />
          <span>Initializing database...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8" />
                <div>
                  <h1 className="text-2xl font-bold">Patient Registration System</h1>
                  <p className="text-blue-100">Powered by PGlite Database</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* <div className="text-right">
                  <div className="text-2xl font-bold">{patients.length}</div>
                  <div className="text-blue-100 text-sm">Total Patients</div>
                </div> */}
                {/* <button
                  onClick={refreshData}
                  className="p-2 bg-blue-500 hover:bg-blue-400 rounded-lg transition-colors"
                  title="Refresh Data"
                >
                  <RefreshCw className="w-5 h-5" />
                </button> */}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'register', label: 'Register Patient', icon: Plus },
                { id: 'view', label: 'View Patients', icon: Eye },
                { id: 'sql', label: 'SQL Query', icon: Database }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'register' && (
              <PatientRegForm isInitialized={isInitialized} />
            )}

            {activeTab === 'view' && (
              <PatientList isInitialized={isInitialized}/>
            )}
            
            {activeTab === 'sql' && (
              <SQLInterface isInitialized={isInitialized} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;