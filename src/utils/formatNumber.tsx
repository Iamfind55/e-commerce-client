// 45000.00 -> 45,000.00
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// 09:30:00 -> 09:30
export function removeSeconds(time: string): string {
  return time.endsWith(":00") ? time.slice(0, -3) : time;
}