import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { DataIntegration } from './components/DataIntegration';
import { DemandPrediction } from './components/DemandPrediction';
import { AIRecommendations } from './components/AIRecommendations';
import { PolicySimulator } from './components/PolicySimulator';
import { LayoutDashboard, Database, TrendingUp, Lightbulb, FlaskConical } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'data', label: 'Data Integration', icon: Database },
    { id: 'prediction', label: 'Demand Prediction', icon: TrendingUp },
    { id: 'recommendations', label: 'AI Recommendations', icon: Lightbulb },
    { id: 'simulator', label: 'Policy Simulator', icon: FlaskConical },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ASOS</h1>
              <p className="text-sm text-gray-600 mt-1">
                AI-Driven Adaptive Sustainability Operating System
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-gray-500">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-green-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'data' && <DataIntegration />}
        {activeTab === 'prediction' && <DemandPrediction />}
        {activeTab === 'recommendations' && <AIRecommendations />}
        {activeTab === 'simulator' && <PolicySimulator />}
      </main>
    </div>
  );
}
