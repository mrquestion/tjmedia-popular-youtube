import dayjs, { Dayjs } from 'dayjs';

import { Query } from '../components/query';

export const getDefaultQuery = (): Query => {
  const type: string = '1';
  const today: Dayjs = dayjs();
  const startDate: string = today.set('date', 1).format('YYYY-MM-DD');
  const endDate: string = today.format('YYYY-MM-DD');
  return { type, startDate, endDate };
};
export const getCachedQuery = (): Query => {
  const type: string = localStorage.getItem('query:type');
  const startDate: string = localStorage.getItem('query:start-date');
  const endDate: string = localStorage.getItem('query:end-date');
  return { type, startDate, endDate };
};
export const setQueryCache = (query: Query): void => {
  if (query.type) {
    localStorage.setItem('query:type', query.type);
  }
  if (query.startDate) {
    localStorage.setItem('query:start-date', query.startDate);
  }
  if (query.endDate) {
    localStorage.setItem('query:end-date', query.endDate);
  }
};
