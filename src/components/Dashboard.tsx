import { Activity, Droplet, Zap, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const energyData = [
  { time: '00:00', usage: 45 },
  { time: '04:00', usage: 32 },
  { time: '08:00', usage: 68 },
  { time: '12:00', usage: 85 },
  { time: '16:00', usage: 92 },
  { time: '20:00', usage: 78 },
  { time: '23:59', usage: 56 },
];

const waterData = [
  { time: '00:00', usage: 28 },
  { time: '04:00', usage: 15 },
  { time: '08:00', usage: 52 },
  { time: '12:00', usage: 64 },
  { time: '16:00', usage: 58 },
  { time: '20:00', usage: 71 },
  { time: '23:59', usage: 42 },
];

const sustainabilityScore = [
  { name: 'Energy', value: 78, color: '#10b981' },
  { name: 'Water', value: 85, color: '#3b82f6' },
  { name: 'Waste', value: 62, color: '#f59e0b' },
  { name: 'Air Quality', value: 91, color: '#8b5cf6' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Electricity Usage"
          value="1,247 kWh"
          change="-12%"
          trend="down"
          icon={Zap}
          color="yellow"
        />
        <MetricCard
          title="Water Consumption"
          value="8,432 L"
          change="-8%"
          trend="down"
          icon={Droplet}
          color="blue"
        />
        <MetricCard
          title="Sustainability Score"
          value="79/100"
          change="+5%"
          trend="up"
          icon={Activity}
          color="green"
        />
        <MetricCard
          title="Active Alerts"
          value="3"
          change="2 critical"
          trend="warning"
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Electricity Demand */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">24-Hour Electricity Demand</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={energyData}>
              <defs>
                <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Area type="monotone" dataKey="usage" stroke="#eab308" fillOpacity={1} fill="url(#colorEnergy)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Water Consumption */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">24-Hour Water Consumption</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={waterData}>
              <defs>
                <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Area type="monotone" dataKey="usage" stroke="#3b82f6" fillOpacity={1} fill="url(#colorWater)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sustainability Scores */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Sustainability Metrics</h3>
          <div className="space-y-4">
            {sustainabilityScore.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className="text-sm font-semibold" style={{ color: item.color }}>
                    {item.value}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent AI Insights */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
          <h3 className="font-semibold text-gray-900 mb-4">Recent AI Insights</h3>
          <div className="space-y-3">
            <InsightItem
              type="success"
              message="Peak demand predicted for tomorrow 2-4 PM. Recommend load shifting."
              time="5 min ago"
            />
            <InsightItem
              type="warning"
              message="Water usage 15% above baseline. Potential leak detected in Zone C."
              time="12 min ago"
            />
            <InsightItem
              type="info"
              message="Solar generation forecast: 892 kWh tomorrow. Optimal for EV charging."
              time="1 hour ago"
            />
            <InsightItem
              type="success"
              message="Policy simulation complete: 23% reduction achievable with new measures."
              time="2 hours ago"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, trend, icon: Icon, color }: any) {
  const colorClasses = {
    yellow: 'bg-yellow-100 text-yellow-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-green-600',
    warning: 'text-red-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center gap-1 mt-2">
            {trend === 'down' && <TrendingDown className="w-4 h-4" />}
            {trend === 'up' && <TrendingUp className="w-4 h-4" />}
            {trend === 'warning' && <AlertTriangle className="w-4 h-4" />}
            <span className={`text-sm font-medium ${trendColors[trend]}`}>{change}</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

function InsightItem({ type, message, time }: any) {
  const typeColors = {
    success: 'bg-green-100 border-green-300',
    warning: 'bg-yellow-100 border-yellow-300',
    info: 'bg-blue-100 border-blue-300',
  };

  return (
    <div className={`p-3 rounded-lg border ${typeColors[type]}`}>
      <p className="text-sm text-gray-900">{message}</p>
      <p className="text-xs text-gray-500 mt-1">{time}</p>
    </div>
  );
}
