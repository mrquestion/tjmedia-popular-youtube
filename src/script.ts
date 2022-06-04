import { IndexComponent } from './components';

window.addEventListener('load', (ev: Event) => {
  const indexComponent: HTMLElement = IndexComponent.getElement();
  document.body.appendChild(indexComponent);
});
