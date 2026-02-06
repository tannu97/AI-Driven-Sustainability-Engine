export function simulateCommunity(policyStrength: number) {
  const households = 50;

  const baseElectricity = 320;
  const reducedUsage = baseElectricity * (1 - policyStrength / 100);

  return {
    households,
    totalElectricity: Math.round(reducedUsage * households),
    savings: Math.round((baseElectricity - reducedUsage) * households),
  };
}