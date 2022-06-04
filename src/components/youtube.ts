import { MusicItem } from '../utilities/tjmedia';
import { getList, VideoItem } from '../utilities/youtube';

const createElement = (): HTMLDivElement => {
  const elements = {
    div: {
      root: document.createElement('div'),
      video: document.createElement('div'),
    },
    i: {
      loading: document.createElement('i'),
    },
    iframe: {
      video: document.createElement('iframe'),
    },
    button: {
      previous: document.createElement('button'),
      next: document.createElement('button'),
    },
    span: {
      current: document.createElement('span'),
      total: document.createElement('span'),
    },
  };

  elements.i.loading.classList.add('fa-solid', 'fa-rotate-right', 'fa-2x', 'fa-spin', 'loading', 'hide');
  elements.div.root.appendChild(elements.i.loading);

  elements.div.video.classList.add('video');
  elements.div.root.appendChild(elements.div.video);

  elements.div.video.appendChild(elements.iframe.video);

  elements.div.root.appendChild(elements.button.previous);
  elements.div.root.appendChild(elements.span.current);
  elements.div.root.appendChild(elements.span.total);
  elements.div.root.appendChild(elements.button.next);

  return elements.div.root;
};
const setList = async (element: HTMLElement, musicItem: MusicItem) => {
  const videoItems: VideoItem[] = await getList(musicItem);
  const [videoItem]: VideoItem[] = videoItems;
  const { videoId, title, width, height }: VideoItem = videoItem;
  const videoElement: HTMLDivElement = element.querySelector<HTMLDivElement>('.video');
  const iframe: HTMLIFrameElement = videoElement.querySelector<HTMLIFrameElement>('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.title = title;
  iframe.width = `${videoElement.clientWidth}`;
  iframe.height = `${videoElement.clientWidth * (height / width)}`;
};

export const YouTubeComponent = {
  createElement,
  setList,
};
