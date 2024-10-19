import { Component } from '../core/common';
import mediaStore from '../store/mediaStore';  // movieStore를 mediaStore로 변경
import MediaItem from './MediaItem';  // MovieItem -> MediaItem으로 변경

export default class MediaList extends Component {  // MovieList -> MediaList로 변경
  constructor() {
    super();
    mediaStore.subscribe('items', () => {  // movies -> items로 변경
      this.render();
    });
    mediaStore.subscribe('loading', () => {
      this.render();
    });
    mediaStore.subscribe('message', () => {
      this.render();
    });
  }

  render() {
    this.el.classList.add('media-list');  // 클래스명 movie-list -> media-list로 변경
    this.el.innerHTML = /* html */ `
      ${mediaStore.state.message ? `<div class="message">${mediaStore.state.message}</div>` : `<div class="medias"></div>`}
      <div class="the-loader hide"></div>
    `;
    
    const mediasEl = this.el.querySelector('.medias');  // movies -> medias로 변경
    const type = mediaStore.state.type;  // 영화인지 TV 프로그램인지 구분할 수 있도록 타입 추가
    
    mediasEl?.append(
      ...mediaStore.state.items.map(item => new MediaItem({ item, type }).el)  // movie -> item, MediaItem에 type 전달
    );

    const loaderEl = this.el.querySelector('.the-loader');
    mediaStore.state.loading ? loaderEl.classList.remove('hide') : loaderEl.classList.add('hide');
  }
}
