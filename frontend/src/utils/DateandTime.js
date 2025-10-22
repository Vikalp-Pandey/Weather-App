// Dates and Times
export   const date = new Date();
export   const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  
const options = {
  hour: '2-digit', // e.g., 11 or 23
  minute: '2-digit', // e.g., 53
  hour12: true // To show am and pm
};

export const currentTime = new Date().toLocaleTimeString('en-US', options);

// Helper function to format the time string
export const formatTime = (timeString) => {
  // Example timeString: "2025-10-22 17:00"
  const date = new Date(timeString);
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return `${hours} ${ampm}`;
};

// Helper to add day context for clarity when scrolling
export const formatTimeWithDay = (epochSeconds) => {
  const date = new Date(epochSeconds * 1000);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  const timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true
  }).toLowerCase();

  if (isToday) {
    return timeString; // Just show time for today
  } else {
    // Show short weekday and time for future days
    const weekday = date.toLocaleTimeString('en-US', { weekday: 'short' });
    return `${weekday} ${timeString}`;
  }
};
