export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  }).format(date);
}

export function isWithinTimeRange(
  date: string,
  startTime: string,
  endTime: string
): boolean {
  const currentDateTime = new Date();
  const targetStartTime = new Date(`${date}T${startTime}`);
  const targetEndTime = new Date(`${date}T${endTime}`);

  if (currentDateTime > targetEndTime) {
    return false;
  }
  const timeDifference = targetStartTime.getTime() - currentDateTime.getTime();
  const fiveMinutesInMs = 5 * 60 * 1000;

  return timeDifference <= fiveMinutesInMs && timeDifference >= 0;
}

// 2025-02-01T04:21:44.945Z -> 2025-02-01
export function formatDateTimeToDate(isoString: string) {
  return isoString.split("T")[0] || "";
}
