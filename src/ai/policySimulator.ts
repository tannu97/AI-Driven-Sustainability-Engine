export function simulatePolicy(baseScore: number, policy: string) {
  let newScore = baseScore;

  if (policy === "solar") newScore += 10;
  if (policy === "publicTransport") newScore += 8;
  if (policy === "recycling") newScore += 6;

  return Math.min(newScore, 100);
}