export function formatDate(inputDate) {
  const date = new Date(inputDate);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const options = { day: "numeric", month: "long", year: "numeric" };

  // Extract day, month, and year
  const day = date.getDate();
  const month = date.toLocaleDateString("en-GB", { month: "long" });
  const year = date.getFullYear();

  // Add the appropriate suffix for the day (e.g., "1st", "2nd", "3rd", "4th", etc.)
  const dayWithSuffix = addDaySuffix(day);

  // Construct the final formatted date string
  const finalFormattedDate = `${dayWithSuffix} ${month} ${year}`;

  return finalFormattedDate;
}

function addDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }

  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}
