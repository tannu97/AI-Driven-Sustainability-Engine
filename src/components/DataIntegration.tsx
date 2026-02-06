import { Database, Cloud, Wifi, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { useState } from 'react';

const dataSources = [
  {
    id: 1,
    name: 'Smart Meters Network',
    type: 'IoT Devices',
    status: 'active',
    lastSync: '2 min ago',
    dataPoints: '1,247',
    icon: Wifi,
  },
  {
    id: 2,
    name: 'Weather API',
    type: 'External API',
    status: 'active',
    lastSync: '5 min ago',
    dataPoints: '48',
    icon: Cloud,
  },
  {
    id: 3,
    name: 'Municipal Water System',
    type: 'Database',
    status: 'active',
    lastSync: '1 min ago',
    dataPoints: '892',
    icon: Database,
  },
  {
    id: 4,
    name: 'Energy Grid Monitor',
    type: 'IoT Devices',
    status: 'active',
    lastSync: '30 sec ago',
    dataPoints: '2,156',
    icon: Wifi,
  },
  {
    id: 5,
    name: 'Air Quality Sensors',
    type: 'IoT Devices',
    status: 'syncing',
    lastSync: 'syncing...',
    dataPoints: '324',
    icon: Wifi,
  },
  {
    id: 6,
    name: 'Building Management System',
    type: 'Database',
    status: 'active',
    lastSync: '3 min ago',
    dataPoints: '1,567',
    icon: Database,
  },
];

const dataMetrics = [
  { label: 'Total Data Sources', value: '6', change: '+1 this month' },
  { label: 'Data Points Collected', value: '6.2M', change: '+12% vs last week' },
  { label: 'Avg Sync Frequency', value: '2.3 min', change: 'Real-time enabled' },
  { label: 'Data Quality Score', value: '94%', change: '+3% improvement' },
];

export function DataIntegration() {
  const [syncing, setSyncing] = useState<number | null>(null);

  const handleSync = (id: number) => {
    setSyncing(id);
    setTimeout(() => setSyncing(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Multi-Source Data Integration</h2>
        <p className="text-gray-600 mt-1">
          Real-time integration of sustainability data from multiple sources
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dataMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            <p className="text-xs text-green-600 mt-2">{metric.change}</p>
          </div>
        ))}
      </div>

      {/* Data Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dataSources.map((source) => {
          const Icon = source.icon;
          const isActive = source.status === 'active';
          const isSyncing = source.status === 'syncing' || syncing === source.id;

          return (
            <div
              key={source.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className={`p-3 rounded-lg ${isActive ? 'bg-green-100' : 'bg-yellow-100'}`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-green-700' : 'text-yellow-700'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{source.name}</h3>
                    <p className="text-sm text-gray-500">{source.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSync(source.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={isSyncing}
                >
                  <RefreshCw
                    className={`w-4 h-4 text-gray-600 ${isSyncing ? 'animate-spin' : ''}`}
                  />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <div className="flex items-center gap-2">
                    {isActive ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">Active</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-700">Syncing</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Sync</span>
                  <span className="text-sm font-medium text-gray-900">{source.lastSync}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Data Points</span>
                  <span className="text-sm font-medium text-gray-900">{source.dataPoints}</span>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                      Configure
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                      View Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Data Flow Visualization */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Data Flow Architecture</h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-6">
          <DataFlowNode title="Data Sources" count="6" color="blue" />
          <Arrow />
          <DataFlowNode title="Integration Layer" count="AI Processing" color="purple" />
          <Arrow />
          <DataFlowNode title="Analytics Engine" count="Real-time" color="green" />
          <Arrow />
          <DataFlowNode title="Decision Support" count="Actions" color="orange" />
        </div>
      </div>
    </div>
  );
}

function DataFlowNode({ title, count, color }: any) {
  const colorClasses = {
    blue: 'bg-blue-100 border-blue-300 text-blue-700',
    purple: 'bg-purple-100 border-purple-300 text-purple-700',
    green: 'bg-green-100 border-green-300 text-green-700',
    orange: 'bg-orange-100 border-orange-300 text-orange-700',
  };

  return (
    <div className={`border-2 rounded-xl p-6 text-center min-w-[140px] ${colorClasses[color]}`}>
      <Database className="w-8 h-8 mx-auto mb-2" />
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm">{count}</p>
    </div>
  );
}

function Arrow() {
  return (
    <div className="hidden md:block">
      <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
        <path
          d="M0 10 L30 10 M30 10 L25 5 M30 10 L25 15"
          stroke="#9ca3af"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}
