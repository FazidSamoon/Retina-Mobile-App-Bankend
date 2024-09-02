export const getMonthName = (month) => {
    const date = new Date();
    date.setMonth(month);
    const monthName = date.toLocaleString('en-US', { month: 'long' });
    return monthName.toUpperCase();
}