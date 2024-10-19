import { Component } from '../core/common'
import mediaStore, { searchMedia } from '../store/mediaStore'

export default class Search extends Component{
  render(){
    this.el.classList.add('search')
    this.el.innerHTML = /* html */ `
      <div class="search__inner">
        <label htmlFor="searchInput">
          <span class="ir">검색</span>
        </label>
        <input type="search" name="seachInput" id="searchInput" autoComplete="off" class="search__input" value="${mediaStore.state.searchText}" placeholder="검색어를 입력해주세요!" />
      </div>    
    `
    const inputEl = this.el.querySelector('input')
    inputEl.addEventListener('input', () => {
      mediaStore.state.searchText = inputEl.value
    })
    inputEl.addEventListener('keydown', event => {
      if(event.key === 'Enter'){
        searchMedia(1)
      }
    })
    
    // const btnEl = this.el.querySelector('.btn')
    // btnEl.addEventListener('click', () => {
    //   //
    // })
  }
}
