export function calculateSustainability(data: {
  electricity: number;
  transport: string;
  water: number;
}) {
  let score = 100;
  let suggestions: string[] = [];

  if (data.electricity > 300) {
    score -= 20;
    suggestions.push("Reduce electricity usage by switching to LED lighting.");
  }

  if (data.transport === "car") {
    score -= 25;
    suggestions.push("Use public transport or carpool to reduce emissions.");
  }

  if (data.water > 200) {
    score -= 15;
    suggestions.push("Consider water-saving fixtures and shorter usage time.");
  }

  if (score > 80) {
    suggestions.push("Great job! Your sustainability habits are strong.");
  }

  return { score, suggestions };
}