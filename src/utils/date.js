export const convertUnixTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // This will return a date string in the local format
};

export const getDayOfMonth = (timestamp) => {
    const date = new Date(timestamp);
    return date.getDate(); // Returns the day of the month (1 to 31)
};

export const getSimpleDate = (timestamp) => {
    const day = getDayOfMonth(timestamp);
    const month = getMonth(timestamp);
    const year = getYear(timestamp);
    return `${day}-${month}-${year}`; // Returns the date in day-month-year format
};

export const getHours = (timestamp) => {
    const date = new Date(timestamp);
    return date.getHours(); // Returns the hours (0 to 23)
};

export const getMinutes = (timestamp) => {
    const date = new Date(timestamp);
    return date.getMinutes(); // Returns the minutes (0 to 59)
};

export const getSeconds = (timestamp) => {
    const date = new Date(timestamp);
    return date.getSeconds(); // Returns the seconds (0 to 59)
};

export const getSimpleTime = (timestamp) => {
    let hours = getHours(timestamp);
    const minutes = getMinutes(timestamp).toString().padStart(2, '0');
    const seconds = getSeconds(timestamp).toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`; // Returns the time in hours:minutes:seconds AM/PM format
};

export const getMonth = (timestamp) => {
    const date = new Date(timestamp);
    return date.getMonth() + 1; // Returns the month (1 to 12)
};

export const getMonthNameShort = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short' }); // Returns the short name of the month (e.g., Jan, Feb)
};

export const getYear = (timestamp) => {
    const date = new Date(timestamp);
    return date.getFullYear(); // Returns the full year (e.g., 2024)
};

export const getDayOfWeek = (timestamp) => {
    const date = new Date(timestamp);
    return date.getDay(); // Returns the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
};

export const getDayOfWeekShort = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { weekday: 'short' }); // Returns the short name of the day (e.g., Mon, Tue)
};

export const convertDMYToUnixTimestamp = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // Month is 0-based index
    return date.getTime(); // Returns the Unix timestamp in milliseconds
};
