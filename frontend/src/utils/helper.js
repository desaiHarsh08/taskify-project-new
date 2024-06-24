export const getFormattedDate = (givenDate) => {
    if(givenDate == null) {
        return
    }
    const date = new Date(givenDate);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const day = date.getDate();
    let suffix;

    // Determine the suffix for the day (st, nd, rd, or th)
    if (day === 1 || day === 21 || day === 31) {
        suffix = 'st';
    } else if (day === 2 || day === 22) {
        suffix = 'nd';
    } else if (day === 3 || day === 23) {
        suffix = 'rd';
    } else {
        suffix = 'th';
    }

    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the hours and minutes with leading zeros if necessary
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${month} ${day}${suffix}, ${year} ${formattedHours}:${formattedMinutes}`;
};