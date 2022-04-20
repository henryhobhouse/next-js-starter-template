const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const USAGE_BY_MONTH = {
  ElecDuelFuel: [10.5, 9.2, 9.3, 7.9, 7.3, 6.7, 6.8, 6.9, 7.2, 8.5, 9.5, 10.2],
  ElecSingleFuel: [
    11.26, 9.84, 9.84, 7.91, 7, 6.19, 6.19, 6.29, 6.49, 8.32, 9.94, 10.75,
  ],
  Gas: [
    15.9, 12.62, 11.54, 9.02, 5.35, 3.07, 2.32, 2.32, 4.01, 7.89, 12, 13.95,
  ],
};

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

interface EnergyUsage {
  standingChargePence: number;
  unitRate: number;
  annualConsumption: number;
}

interface Props {
  electricityUsage: EnergyUsage;
  gasUsage?: EnergyUsage;
  dualFuel: boolean;
}

interface Bill {
  gas?: number;
  electricity: number;
  total: number;
}

type MonthlyBills = Record<typeof MONTH_NAMES[number], Bill>;

const getEstimatedElectricityBill = (
  dualFuel: boolean,
  monthIndex: number,
  electricityUsage: EnergyUsage,
) => {
  const monthlyUsageCoefficients = {
    ElecDuelFuel: USAGE_BY_MONTH.ElecDuelFuel[monthIndex],
    ElecSingleFuel: USAGE_BY_MONTH.ElecSingleFuel[monthIndex],
    Gas: USAGE_BY_MONTH.Gas[monthIndex],
  };

  const elecMultiple =
    (dualFuel
      ? monthlyUsageCoefficients.ElecDuelFuel
      : monthlyUsageCoefficients.ElecSingleFuel) / 100;

  const daysInThisMonth = DAYS_IN_MONTH[monthIndex];

  const electricityStandingCharge =
    daysInThisMonth * electricityUsage.standingChargePence;
  const electricityUsageCharge =
    elecMultiple *
    electricityUsage.annualConsumption *
    electricityUsage.unitRate;

  return electricityStandingCharge + electricityUsageCharge;
};

const getEstimatedGasBill = (
  dualFuel: boolean,
  monthIndex: number,
  gasUsage?: EnergyUsage,
) => {
  if (!dualFuel) return;
  if (!gasUsage)
    throw new Error('no gas rates supplied whilst set as dual fuel');

  const monthlyUsageCoefficient = USAGE_BY_MONTH.Gas[monthIndex];

  const gasMultiple = monthlyUsageCoefficient / 100;

  const daysInThisMonth = DAYS_IN_MONTH[monthIndex];

  const gasStandingCharge = daysInThisMonth * gasUsage.standingChargePence;
  const gasUsageCharge =
    gasMultiple * gasUsage.annualConsumption * gasUsage.unitRate;

  return gasStandingCharge + gasUsageCharge;
};

export const billsMonthly = ({
  electricityUsage,
  gasUsage,
  dualFuel,
}: Props) => {
  const monthlyBills: Partial<MonthlyBills> = {};

  for (const monthIndex of Array.from({ length: 12 }).keys()) {
    // Find a coefficient based on the current month

    const monthName = MONTH_NAMES[monthIndex];

    const monthsElectricityBill = getEstimatedElectricityBill(
      dualFuel,
      monthIndex,
      electricityUsage,
    );
    const monthsGasBill = getEstimatedGasBill(dualFuel, monthIndex, gasUsage);

    monthlyBills[monthName] = {
      electricity: monthsElectricityBill,
      gas: monthsGasBill,
      total: monthsElectricityBill + (monthsGasBill ?? 0),
    };
  }

  return monthlyBills as MonthlyBills;
};
