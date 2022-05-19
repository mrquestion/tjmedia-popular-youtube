import ReactDOM from 'react-dom';
import { IndexComponent } from './components';

window.addEventListener('load', (ev: Event) => {
  const root: HTMLDivElement = document.createElement('div');
  document.body.appendChild(root);

  ReactDOM.render(IndexComponent(), root);
});
