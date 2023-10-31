const getToday = () => {
  // Get the current date in GMT
  const currentDate = new Date();
  
  // Add 5 hours and 30 minutes to adjust for GMT+5.30
  currentDate.setHours(currentDate.getHours() + 5);
  currentDate.setMinutes(currentDate.getMinutes() + 30);

  const day = currentDate.getDate().toString().padStart(2, "0"); // Ensure 2-digit day
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Ensure 2-digit month
  const year = currentDate.getFullYear().toString(); // Full year

  const dateKey = `${day}${month}${year}`;
  return dateKey;
};

module.exports = { getToday };
