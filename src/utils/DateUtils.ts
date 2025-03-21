import moment from 'moment';

export const formatDate = (date: Date, format: string = 'YYYY-MM-DD'): string => {
  return moment(date).format(format);
};

export const getDayOfWeek = (date: Date): string => {
  return moment(date).format('E'); // Returns the day of the week e.g., 'Monday'
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return moment(date1).isSame(date2, 'day');
};