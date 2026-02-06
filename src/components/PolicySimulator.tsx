import { useState } from 'react';
import { Play, RotateCcw, Download, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const policies = [
  { id: 'peak-pricing', name: 'Peak Hour Pricing', enabled: false, impact: 15 },
  { id: 'renewable', name: 'Renewable Energy Mandate', enabled: false, impact: 25 },
  { id: 'efficiency', name: 'Energy Efficiency Standards', enabled: false, impact: 18 },
  { id: 'water-limit', name: 'Water Usage Limits', enabled: false, impact: 12 },
  { id: 'ev-incentive', name: 'EV Charging Incentives', enabled: false, impact: 8 },
  { id: 'solar-subsidy', name: 'Solar Panel Subsidies', enabled: false, impact: 22 },
];

const baselineData = [
  { month: 'Jan', energy: 1200, water: 8500, cost: 5200, emissions: 450 },
  { month: 'Feb', energy: 1150, water: 8200, cost: 5000, emissions: 430 },
  { month: 'Mar', energy: 1300, water: 8800, cost: 5600, emissions: 480 },
  { month: 'Apr', energy: 1250, water: 8400, cost: 5400, emissions: 460 },
  { month: 'May', energy: 1400, water: 9000, cost: 6000, emissions: 520 },
  { month: 'Jun', energy: 1450, water: 9200, cost: 6200, emissions: 540 },
];

export function PolicySimulator() {
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(false);

  const togglePolicy = (id: string) => {
    setSelectedPolicies(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
    setHasSimulated(false);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setHasSimulated(true);
    }, 2000);
  };

  const resetSimulation = () => {
    setSelectedPolicies([]);
    setHasSimulated(false);
  };

  const totalImpact = selectedPolicies.reduce((sum, id) => {
    const policy = policies.find(p => p.id === id);
    return sum + (policy?.impact || 0);
  }, 0);

  const simulatedData = baselineData.map(d => ({
    ...d,
    energySimulated: Math.round(d.energy * (1 - totalImpact / 100)),
    waterSimulated: Math.round(d.water * (1 - totalImpact / 150)),
    costSimulated: Math.round(d.cost * (1 - totalImpact / 120)),
    emissionsSimulated: Math.round(d.emissions * (1 - totalImpact / 100)),
  }));

  const impactMetrics = [
    { metric: 'Energy', baseline: 100, simulated: 100 - totalImpact },
    { metric: 'Water', baseline: 100, simulated: 100 - totalImpact * 0.7 },
    { metric: 'Cost', baseline: 100, simulated: 100 - totalImpact * 0.8 },
    { metric: 'Emissions', baseline: 100, simulated: 100 - totalImpact },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Policy Simulation Engine</h2>
        <p className="text-gray-600 mt-1">
          Test sustainability policies before implementation
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-gray-900">Select Policies to Simulate</h3>
          <div className="flex gap-3">
            <button
              onClick={resetSimulation}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={runSimulation}
              disabled={selectedPolicies.length === 0 || isSimulating}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4" />
              {isSimulating ? 'Simulating...' : 'Run Simulation'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {policies.map((policy) => (
            <button
              key={policy.id}
              onClick={() => togglePolicy(policy.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedPolicies.includes(policy.id)
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900 text-sm">{policy.name}</h4>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  selectedPolicies.includes(policy.id)
                    ? 'border-green-600 bg-green-600'
                    : 'border-gray-300'
                }`}>
                  {selectedPolicies.includes(policy.id) && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-600">Est. Impact: -{policy.impact}%</p>
            </button>
          ))}
        </div>

        {selectedPolicies.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">{selectedPolicies.length} policies selected</span>
              {' • '}
              Estimated combined impact: <span className="font-bold">-{totalImpact}%</span>
            </p>
          </div>
        )}
      </div>

      {/* Simulation Results */}
      {hasSimulated && (
        <>
          {/* Impact Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <ImpactCard
              title="Energy Reduction"
              value={`${totalImpact}%`}
              subtitle="vs baseline"
              color="yellow"
              trend="down"
            />
            <ImpactCard
              title="Water Savings"
              value={`${Math.round(totalImpact * 0.7)}%`}
              subtitle="vs baseline"
              color="blue"
              trend="down"
            />
            <ImpactCard
              title="Cost Reduction"
              value={`$${Math.round(5400 * totalImpact / 100)}`}
              subtitle="per month"
              color="green"
              trend="down"
            />
            <ImpactCard
              title="CO₂ Reduction"
              value={`${Math.round(470 * totalImpact / 100)} tons`}
              subtitle="per month"
              color="purple"
              trend="down"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Energy Comparison */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Energy Consumption Projection</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={simulatedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="energy" stroke="#9ca3af" strokeWidth={2} name="Baseline" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="energySimulated" stroke="#10b981" strokeWidth={3} name="With Policies" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Cost Comparison */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Cost Impact Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={simulatedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cost" fill="#9ca3af" name="Baseline" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="costSimulated" fill="#10b981" name="With Policies" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Multi-Dimensional Impact Analysis</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={impactMetrics}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Baseline" dataKey="baseline" stroke="#9ca3af" fill="#9ca3af" fillOpacity={0.3} />
                <Radar name="With Policies" dataKey="simulated" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Report */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Simulation Report</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>

            <div className="space-y-4">
              <ReportSection
                title="Implementation Timeline"
                content="Recommended phased rollout over 6-9 months for optimal results and minimal disruption."
              />
              <ReportSection
                title="Key Risks"
                content="Initial implementation costs, potential user resistance, technology integration challenges."
              />
              <ReportSection
                title="Success Metrics"
                content="Monthly tracking of energy consumption, water usage, cost savings, and emissions reductions."
              />
              <ReportSection
                title="AI Recommendation"
                content={`Based on simulation results, implementing these ${selectedPolicies.length} policies could reduce overall sustainability impact by ${totalImpact}% with high confidence (93%).`}
              />
            </div>
          </div>
        </>
      )}

      {/* Empty State */}
      {!hasSimulated && selectedPolicies.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">No Policies Selected</h3>
          <p className="text-gray-600">
            Select one or more policies above to begin simulation
          </p>
        </div>
      )}
    </div>
  );
}

function ImpactCard({ title, value, subtitle, color, trend }: any) {
  const colorClasses = {
    yellow: 'bg-yellow-100 text-yellow-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm text-gray-600">{title}</p>
        <TrendingDown className="w-4 h-4 text-green-600" />
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );
}

function ReportSection({ title, content }: any) {
  return (
    <div className="border-l-4 border-green-600 pl-4">
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{content}</p>
    </div>
  );
}
