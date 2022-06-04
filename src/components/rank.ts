import { MusicItem } from '../utilities/tjmedia';
import { YouTubeComponent } from './youtube';

const elements = {
  div: {
    root: document.createElement('div'),
    list: document.createElement('div'),
  },
  i: {
    loading: document.createElement('i'),
  },
};

const createItemElement = (item: MusicItem): HTMLDivElement => {
  const youtubeComponent: HTMLElement = YouTubeComponent.createElement();

  const root: HTMLDivElement = document.createElement('div');
  root.addEventListener('click', (ev: MouseEvent) => {
    YouTubeComponent.setList(youtubeComponent, item);
  });
  root.classList.add('flex', 'row', 'item');

  const index: HTMLHeadingElement = document.createElement('h2');
  index.classList.add('index');
  index.textContent = `${item.index}`;
  root.appendChild(index);

  const title: HTMLHeadingElement = document.createElement('h3');
  title.classList.add('ellipsis', 'title');
  title.textContent = item.title;
  root.appendChild(title);

  const artist: HTMLElement = document.createElement('small');
  artist.classList.add('artist');
  artist.textContent = item.artist;
  root.appendChild(artist);

  root.appendChild(youtubeComponent);

  return root;
};

elements.div.root.classList.add('flex', 'row', 'gap-1', 'rank-box');

elements.i.loading.classList.add('fa-solid', 'fa-rotate-right', 'fa-2x', 'fa-spin', 'loading', 'hide');
elements.div.root.appendChild(elements.i.loading);

elements.div.list.classList.add('list');
elements.div.root.appendChild(elements.div.list);

export const showLoading = (): void => elements.i.loading.classList.remove('hide');
export const hideLoading = (): void => elements.i.loading.classList.add('hide');

export const setList = (items: MusicItem[]): void => {
  const newItems: MusicItem[] = items.splice(elements.div.list.childElementCount);
  const replaceItems: MusicItem[] = [...items];
  replaceItems.forEach((item: MusicItem, i: number) => {
    const element: Element = elements.div.list.children.item(i);
    element.querySelector<HTMLHeadingElement>('.index').textContent = `${item.index}`;
    element.querySelector<HTMLHeadingElement>('.title').textContent = item.title;
    element.querySelector<HTMLElement>('.artist').textContent = item.artist;
  });
  for (const item of newItems) {
    elements.div.list.appendChild(createItemElement(item));
  }

  hideLoading();
};

export const RankComponent = {
  getElement: (): HTMLElement => elements.div.root,
};
