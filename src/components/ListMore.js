import { Component } from '../core/common'
import mediaStore, { searchMedia } from '../store/mediaStore'

export default class ListMore extends Component{
  constructor(){
    super({
      tagName: 'button'
    })
    mediaStore.subscribe('pageMax', () => {
      const { page, pageMax } = mediaStore.state
      pageMax > page || mediaStore.state.message ? this.el.classList.remove('hide') : this.el.classList.add('hide')
    })
  }
  render(){
    this.el.classList.add('btn', 'view-more', 'hide')
    this.el.textContent = '더보기...'

    this.el.addEventListener('click', async () => {
      this.el.classList.add('hide')
      await searchMedia(mediaStore.state.page+1, mediaStore.state.type)
    })
  }
}