import { Component } from '../core/common'
import mediaStore, { getMediaDetails } from '../store/mediaStore'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w780';

export default class Detail extends Component{
  async render(){
    this.el.classList.add('container', 'the-movie')
    this.el.innerHTML = /* html */ `
      <div class="poster skeleton"></div>
      <div class="specs">
        <div class="title skeleton"></div>
        <div class="labels skeleton"></div>
        <div class="plot skeleton"></div>
      </div>
    `

    let type = mediaStore.state.type
    await getMediaDetails(history.state.id)
    console.log(mediaStore.state.item)
    const { item, cast, director } = mediaStore.state
    const title = item.title || item.name || '제목 없음';  // 기본값 추가
    const releaseDate = item.release_date || item.first_air_date || '날짜 정보 없음';
    console.log(item)
    

    this.el.innerHTML = /* html*/ `
      <div style="background-image: url(${IMAGE_BASE_URL}${item.poster_path})" class="poster"></div>
      <div class="specs">
        <div class="title">
          ${title}
        </div>
        <div class="labels">
          <span>${releaseDate}</span>
          &nbsp;/&nbsp;
          <span>${item.runtime ? item.runtime : '-'}</span>
          &nbsp;/&nbsp;
          <span>${item.origin_country}</span>
        </div>
        <div class="plot">
          ${item.overview}
        </div>
        <div>
          <h3>Ratings</h3>
          <p>${item.vote_average}</p>
        </div>
        <div>
          <h3>Actors</h3>
          <p>${cast ? cast[0].name : '-'}</p>
        </div>
        <div>
          <h3>Director</h3>
          <p>${director ? director.name : '-'}</p>
        </div>
        <div>
          <h3>Production</h3>
          <p>${'-'}</p>
        </div>
        <div>
          <h3>Genre</h3>
          ${item.genres.map(genre => {
            return `<p>${genre.name}</p>`
          }).join('')}
        </div>
      </div>
    `
  }
}