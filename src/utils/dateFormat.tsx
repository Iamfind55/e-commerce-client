export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short", // e.g., "Sep"
    day: "numeric", // e.g., "10"
    year: "numeric", // e.g., "2024"
    hour: "numeric", // e.g., "2 PM"
    minute: "numeric", // e.g., "30"
    second: "numeric", // e.g., "15"
    hour12: true, // For 12-hour format with AM/PM
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

  // Check if the current time is after the end time
  if (currentDateTime > targetEndTime) {
    return false;
  }

  // Calculate the time difference between the current time and the start time in milliseconds
  const timeDifference = targetStartTime.getTime() - currentDateTime.getTime();

  // Convert 5 minutes to milliseconds (5 * 60 * 1000)
  const fiveMinutesInMs = 5 * 60 * 1000;

  // Check if the current time is within 5 minutes or less of the start time and before the end time
  return timeDifference <= fiveMinutesInMs && timeDifference >= 0;
}
