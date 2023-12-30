export function formatTime(dateString) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    // Invalid date string
    return "Invalid Date";
  }

  let hours = date.getHours();
  const minutes = date.getMinutes();
  let ampm = "am";

  if (hours >= 12) {
    ampm = "pm";
    if (hours > 12) {
      hours -= 12;
    }
  }

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${formattedMinutes}${ampm}`;
}
