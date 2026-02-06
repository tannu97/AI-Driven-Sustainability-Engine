import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, ComposedChart } from 'recharts';
import { TrendingUp, Calendar, Zap, Droplet } from 'lucide-react';

const electricityPrediction = [
  { date: 'Mon', actual: 1247, predicted: 1245, confidence: 95 },
  { date: 'Tue', actual: 1189, predicted: 1195, confidence: 94 },
  { date: 'Wed', actual: 1302, predicted: 1290, confidence: 93 },
  { date: 'Thu', actual: 1156, predicted: 1160, confidence: 95 },
  { date: 'Fri', actual: 1401, predicted: 1395, confidence: 92 },
  { date: 'Sat', actual: null, predicted: 1180, confidence: 89 },
  { date: 'Sun', actual: null, predicted: 1050, confidence: 88 },
];

const waterPrediction = [
  { date: 'Mon', actual: 8432, predicted: 8450, confidence: 93 },
  { date: 'Tue', actual: 8234, predicted: 8220, confidence: 94 },
  { date: 'Wed', actual: 8567, predicted: 8580, confidence: 92 },
  { date: 'Thu', actual: 8123, predicted: 8100, confidence: 93 },
  { date: 'Fri', actual: 8789, predicted: 8800, confidence: 91 },
  { date: 'Sat', actual: null, predicted: 7890, confidence: 87 },
  { date: 'Sun', actual: null, predicted: 7456, confidence: 86 },
];

const hourlyElectricity = [
  { hour: '00', demand: 45, predicted: 47 },
  { hour: '02', demand: 38, predicted: 40 },
  { hour: '04', demand: 32, predicted: 33 },
  { hour: '06', demand: 48, predicted: 50 },
  { hour: '08', demand: 68, predicted: 70 },
  { hour: '10', demand: 78, predicted: 76 },
  { hour: '12', demand: 85, predicted: 87 },
  { hour: '14', demand: 92, predicted: 90 },
  { hour: '16', demand: 88, predicted: 89 },
  { hour: '18', demand: 95, predicted: 93 },
  { hour: '20', demand: 78, predicted: 80 },
  { hour: '22', demand: 56, predicted: 58 },
];

export function DemandPrediction() {
  const [selectedResource, setSelectedResource] = useState<'electricity' | 'water'>('electricity');
  const [timeRange, setTimeRange] = useState<'hourly' | 'daily' | 'weekly'>('daily');

  const currentData = selectedResource === 'electricity' ? electricityPrediction : waterPrediction;
  const unit = selectedResource === 'electricity' ? 'kWh' : 'L';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Demand Prediction & Forecasting</h2>
        <p className="text-gray-600 mt-1">
          AI-powered predictions for electricity and water demand
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedResource('electricity')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedResource === 'electricity'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Zap className="w-4 h-4" />
              Electricity
            </button>
            <button
              onClick={() => setSelectedResource('water')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedResource === 'water'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Droplet className="w-4 h-4" />
              Water
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setTimeRange('hourly')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === 'hourly'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Hourly
            </button>
            <button
              onClick={() => setTimeRange('daily')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === 'daily'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setTimeRange('weekly')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === 'weekly'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Weekly
            </button>
          </div>
        </div>
      </div>

      {/* Prediction Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Avg Prediction Accuracy"
          value="94.2%"
          subtitle="Last 30 days"
          color="green"
        />
        <StatCard
          title="Next Day Forecast"
          value={currentData[5].predicted.toLocaleString()}
          subtitle={`${unit} expected`}
          color="blue"
        />
        <StatCard
          title="Confidence Level"
          value={`${currentData[5].confidence}%`}
          subtitle="AI certainty"
          color="purple"
        />
        <StatCard
          title="Trend"
          value="-8.3%"
          subtitle="vs last week"
          color="orange"
        />
      </div>

      {/* Main Prediction Chart */}
      {timeRange === 'daily' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            7-Day {selectedResource === 'electricity' ? 'Electricity' : 'Water'} Demand Prediction
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={currentData}>
              <defs>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="#10b981"
                fill="url(#colorPredicted)"
                strokeWidth={2}
                name="Predicted"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 5 }}
                name="Actual"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}

      {timeRange === 'hourly' && selectedResource === 'electricity' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">24-Hour Electricity Demand Pattern</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={hourlyElectricity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="demand" fill="#3b82f6" name="Current Demand" radius={[4, 4, 0, 0]} />
              <Bar dataKey="predicted" fill="#10b981" name="Predicted" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* AI Model Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Prediction Model Details</h3>
          <div className="space-y-4">
            <ModelDetail label="Algorithm" value="LSTM Neural Network" />
            <ModelDetail label="Training Data" value="3 years historical" />
            <ModelDetail label="Input Features" value="24 parameters" />
            <ModelDetail label="Update Frequency" value="Every 15 minutes" />
            <ModelDetail label="Model Version" value="v2.4.1" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Key Influencing Factors</h3>
          <div className="space-y-3">
            <FactorBar label="Historical Patterns" percentage={85} color="blue" />
            <FactorBar label="Weather Conditions" percentage={72} color="yellow" />
            <FactorBar label="Day of Week" percentage={68} color="green" />
            <FactorBar label="Special Events" percentage={45} color="purple" />
            <FactorBar label="Economic Activity" percentage={58} color="orange" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, color }: any) {
  const colorClasses = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

function ModelDetail({ label, value }: any) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
  );
}

function FactorBar({ label, percentage, color }: any) {
  const colorClasses = {
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${colorClasses[color]} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
