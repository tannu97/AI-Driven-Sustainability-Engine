import { useState } from "react";
import { calculateSustainability } from "../ai/sustainabilityEngine";
import { predictNextMonthUsage } from "../ai/demandPredictor";

export default function SustainabilityChecker() {
  const [electricity, setElectricity] = useState(0);
  const [water, setWater] = useState(0);
  const [transport, setTransport] = useState("bike");
  const [result, setResult] = useState<any>(null);

  const predictedElectricity = predictNextMonthUsage(electricity);
  const handleCheck = () => {
    const res = calculateSustainability({
  electricity: predictedElectricity,
  water,
  transport,
});
    setResult(res);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Sustainability Checker
      </h2>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Electricity usage (kWh)"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setElectricity(Number(e.target.value))}
        />

        <input
          type="number"
          placeholder="Water usage (liters)"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setWater(Number(e.target.value))}
        />

        {electricity > 0 && (
  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
    Predicted Next Month Electricity: {predictedElectricity} kWh
  </div>
)}

        <select
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setTransport(e.target.value)}
        >
          <option value="bike">Bike</option>
          <option value="bus">Bus</option>
          <option value="car">Car</option>
        </select>

        <button
          onClick={handleCheck}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
        >
          Analyze Sustainability
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-green-800">
            Score: {result.score}
          </h3>

          <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
            {result.suggestions.map((s: string, i: number) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}