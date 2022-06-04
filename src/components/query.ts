import dayjs, { Dayjs } from 'dayjs';

import { getCachedQuery, getDefaultQuery, setQueryCache } from '../utilities/query';
import { getList, MusicItem } from '../utilities/tjmedia';
import { setList, showLoading } from './rank';

const queryTypeMap = {
  1: '가요',
  2: 'POP',
  3: 'JPOP',
};

export interface Query {
  type?: string;
  startDate?: string;
  endDate?: string;
}

const defaultQuery: Query = getDefaultQuery();
const cachedQuery: Query = getCachedQuery();
const type: string = cachedQuery.type ?? defaultQuery.type;
const startDate: string = cachedQuery.startDate ?? defaultQuery.startDate;
const endDate: string = cachedQuery.endDate ?? defaultQuery.endDate;

type SelectOptionData = { [key: string]: string };

const createSelectElement = (options: SelectOptionData, defaultValue: string): HTMLSelectElement => {
  const select: HTMLSelectElement = document.createElement('select');
  for (const [key, value] of Object.entries(options)) {
    const option: HTMLOptionElement = document.createElement('option');
    option.value = key;
    option.textContent = value;
    select.appendChild(option);
  }
  select.value = defaultValue;
  return select;
};
const createInputDateElement = (date: string): HTMLInputElement => {
  const input: HTMLInputElement = document.createElement('input');
  input.type = 'date';
  input.value = date;
  const today: Dayjs = dayjs();
  input.min = today.subtract(2, 'years').format('YYYY-MM-DD');
  input.max = today.format('YYYY-MM-DD');
  return input;
};

const elements = {
  div: {
    root: document.createElement('div'),
    queryButtons: document.createElement('div'),
  },
  select: {
    type: createSelectElement(queryTypeMap, type),
  },
  input: {
    startDate: createInputDateElement(startDate),
    endDate: createInputDateElement(endDate),
  },
  button: {
    query: document.createElement('button'),
    reset: document.createElement('button'),
  },
};

elements.div.root.classList.add('flex', 'column', 'wrap', 'gap-1', 'query-box');

elements.select.type.classList.add('query-type', 'grow-1');
elements.select.type.addEventListener('change', (ev: Event) => setQueryCache({ type: elements.select.type.value }));
elements.div.root.appendChild(elements.select.type);

elements.input.startDate.classList.add('grow-1', 'query-start-date');
elements.input.startDate.addEventListener('change', (ev: Event) => {
  let { value }: HTMLInputElement = elements.input.startDate;
  if (value.localeCompare(elements.input.startDate.min) < 0) {
    value = elements.input.startDate.min;
  } else if (value.localeCompare(elements.input.startDate.max) > 0) {
    value = elements.input.startDate.max;
  }
  elements.input.startDate.value = value;
  setQueryCache({ startDate: value });
});
elements.div.root.appendChild(elements.input.startDate);

elements.input.endDate.classList.add('grow-1', 'query-end-date');
elements.input.endDate.addEventListener('change', (ev: Event) => {
  let { value }: HTMLInputElement = elements.input.endDate;
  if (value.localeCompare(elements.input.endDate.min) < 0) {
    value = elements.input.endDate.min;
  } else if (value.localeCompare(elements.input.endDate.max) > 0) {
    value = elements.input.endDate.max;
  }
  elements.input.endDate.value = value;
  setQueryCache({ endDate: value });
});
elements.div.root.appendChild(elements.input.endDate);

elements.div.queryButtons.classList.add('flex', 'column', 'gap-1', 'grow-1', 'query-buttons');
elements.div.root.appendChild(elements.div.queryButtons);

elements.button.query.classList.add('grow-1', 'query');
const queryButtonIcon: HTMLElement = document.createElement('i');
queryButtonIcon.classList.add('fa-solid', 'fa-magnifying-glass');
queryButtonIcon.textContent = ' 조회';
elements.button.query.appendChild(queryButtonIcon);
elements.button.query.addEventListener('click', async (ev: MouseEvent) => {
  const strType: string = elements.select.type.value;
  const startDate: Dayjs = dayjs(elements.input.startDate.value);
  const endDate: Dayjs = dayjs(elements.input.endDate.value);
  const SYY: string = startDate.format('YYYY');
  const SMM: string = startDate.format('MM');
  const SDD: string = startDate.format('DD');
  const EYY: string = endDate.format('YYYY');
  const EMM: string = endDate.format('MM');
  const EDD: string = endDate.format('DD');

  showLoading();

  const items: MusicItem[] = await getList({ strType, SYY, SMM, SDD, EYY, EMM, EDD });
  setList(items);
});
elements.div.queryButtons.appendChild(elements.button.query);

elements.button.reset.classList.add('grow-1', 'query-reset');
const queryResetButtonIcon: HTMLElement = document.createElement('i');
queryResetButtonIcon.classList.add('fa-solid', 'fa-trash');
queryResetButtonIcon.textContent = ' 초기화';
elements.button.reset.appendChild(queryResetButtonIcon);
elements.button.reset.addEventListener('click', (ev: MouseEvent) => {
  const { type, startDate, endDate }: Query = getDefaultQuery();
  elements.select.type.value = type;
  elements.input.startDate.value = startDate;
  elements.input.endDate.value = endDate;
  setQueryCache({ type, startDate, endDate });
});
elements.div.queryButtons.appendChild(elements.button.reset);

export const QueryComponent = {
  getElement: (): HTMLElement => elements.div.root,
};
