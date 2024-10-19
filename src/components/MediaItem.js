import { Component } from '../core/common';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w780';

export default class MediaItem extends Component{
  constructor(props){
    super({
      props,
      tagName: 'a'
    })
  }
  render() {
    const { item, type } = this.props;  // movie 대신 item으로 변경
    const title = type === 'movie' ? item.title : item.name;  // 영화는 title, TV는 name
    const releaseDate = type === 'movie' ? item.release_date : item.first_air_date;  // 영화는 release_date, TV는 first_air_date

    this.el.setAttribute('href', `#/${type}/detail?id=${item.id}`);  // 타입에 맞게 URL 변경
    this.el.classList.add('media-item');  // 클래스 이름도 좀 더 일반적으로 변경
    this.el.style.backgroundImage = `url(${IMAGE_BASE_URL}${item.poster_path})`;
    this.el.innerHTML = /* html */ `
      <div class="info">
        <div class="year">
          ${releaseDate || '정보 없음'}  <!-- 날짜가 없는 경우 대체 텍스트 제공 -->
        </div>
        <div class="title">
          ${title}
        </div>
      </div>
    `;
  }
}