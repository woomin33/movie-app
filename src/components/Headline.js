import {
  Component
} from '../core/common'
import mediaStore from '../store/mediaStore'
import Swiper, {
  Navigation,
  Pagination,
  Autoplay
} from 'swiper';
import 'swiper/swiper-bundle.min.css';

export default class Headline extends Component {
  constructor() {
    super()
    mediaStore.subscribe('items', () => {
      this.render();
    });
    mediaStore.subscribe('isSearch', () => {
      const {
        isSearch
      } = mediaStore.state
      isSearch ? this.el.classList.add('hide') : this.el.classList.remove('hide')
    })
  }

  render() {

    const {
      items
    } = mediaStore.state;
    const topItems = items.slice(0, 10);
    this.el.classList.add('headline')

    this.el.innerHTML = /* html */ `
      <div class="swiper-container">
        <div class="swiper-wrapper">
          ${topItems
            .map(
              (item) => `
              <div class="swiper-slide">
                <img src="https://image.tmdb.org/t/p/w1280${item.backdrop_path}" alt="${item.title}">
              </div>
            `
            ).join('')}
        </div>
        <!-- Add Pagination -->
        <!-- Add Navigation -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
      </div>
      
      <!-- // <h1>
      //   <span>TMDb API</span><br>
      //   THE OPEN<br>
      //   MOVIE DATABASE
      // </h1>
      // <p>
      //   The TMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users.<br>
      //   If you find this service useful, please consider making a one-time donation or become a patron.
      // </p> -->
    `
    new Swiper('.swiper-container', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 5000, // 5초마다 자동으로 슬라이드 전환
        disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 유지
      },
      modules: [Navigation, Pagination, Autoplay],
    });
  }

}