import { Component } from '../core/common';
import Headline from '../components/Headline';
import Search from '../components/Search_t';
import MediaList from '../components/MediaList';
import movieStore, { searchMedia } from '../store/mediaStore'
import ListMore from '../components/ListMore';

export default class TvProgram extends Component{
  render(){
    const headline = new Headline().el
    
    searchMedia(1)
    // const search = new Search().el
    const mediaList = new MediaList().el
    const listMore = new ListMore().el

    this.el.classList.add('container')
    this.el.append(
      // search,
      headline,
      mediaList,
      listMore
    )
  }
}