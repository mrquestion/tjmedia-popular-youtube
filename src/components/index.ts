import { QueryComponent } from './query';
import { RankComponent } from './rank';

const elements = {
  div: {
    root: document.createElement('div'),
  },
};

elements.div.root.classList.add('flex', 'row', 'gap-1');

const queryComponent: HTMLElement = QueryComponent.getElement();
elements.div.root.appendChild(queryComponent);

const rankComponent: HTMLElement = RankComponent.getElement();
elements.div.root.appendChild(rankComponent);

export const IndexComponent = {
  getElement: (): HTMLElement => elements.div.root,
};
