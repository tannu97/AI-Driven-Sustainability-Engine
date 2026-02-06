export function predictNextMonthUsage(currentUsage: number) {
  const seasonalGrowth = 1.08;
  return Math.round(currentUsage * seasonalGrowth);
}