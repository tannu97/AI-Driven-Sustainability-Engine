import { useState } from "react";
import {
  predictDemand,
  detectAnomalies,
  generateRecommendations
} from "../ai/sustainabilityEngine";

export default function SustainabilityChecker() {
  const [result, setResult] = useState<any>(null);

  const electricityData = [80, 90, 100, 120, 95];
  const waterData = [60, 65, 70, 75, 85];

  const runEngine = () => {
    const electricityPrediction = predictDemand(electricityData);
    const waterPrediction = predictDemand(waterData);

    const electricityAnomalies = detectAnomalies(electricityData);
    const waterAnomalies = detectAnomalies(waterData);

    const recommendations = generateRecommendations(
      electricityPrediction,
      waterPrediction
    );

    setResult({
      electricityPrediction,
      waterPrediction,
      electricityAnomalies,
      waterAnomalies,
      recommendations
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        Sustainability Decision Engine
      </h2>

      <button
        onClick={runEngine}
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Run Sustainability Analysis
      </button>

      {result && (
        <div className="mt-6 space-y-3">
          <p>
            <strong>Electricity Prediction:</strong>{" "}
            {result.electricityPrediction}
          </p>

          <p>
            <strong>Water Prediction:</strong> {result.waterPrediction}
          </p>

          <div>
            <strong>Recommendations:</strong>
            <ul className="list-disc ml-6">
              {result.recommendations.map((rec: string, i: number) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}