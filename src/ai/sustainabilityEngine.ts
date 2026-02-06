export function calculateSustainability(data: {
  electricity: number;
  water: number;
  transport: string;
  waste: number;
}) {
  let score = 100;
  let carbon = 0;
  let suggestions: string[] = [];

  // Electricity impact
  carbon += data.electricity * 0.82;
  if (data.electricity > 300) {
    score -= 20;
    suggestions.push("Reduce electricity usage or switch to solar energy.");
  }

  // Water impact
  if (data.water > 200) {
    score -= 15;
    suggestions.push("Install water-saving fixtures.");
  }

  // Transport impact
  if (data.transport === "car") {
    score -= 25;
    carbon += 50;
    suggestions.push("Use public transport or carpool.");
  }

  if (data.transport === "bus") {
    carbon += 15;
  }

  if (data.transport === "bike") {
    carbon += 5;
  }

  // Waste impact
  carbon += data.waste * 1.2;
  if (data.waste > 5) {
    score -= 10;
    suggestions.push("Reduce waste and increase recycling.");
  }

  if (score > 80) {
    suggestions.push("Your sustainability habits are strong.");
  }

  return {
    score: Math.max(score, 0),
    carbon: carbon.toFixed(2),
    suggestions,
  };
}