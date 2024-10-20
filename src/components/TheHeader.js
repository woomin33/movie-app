import { Component } from '../core/common';
import Search from './Search_t';


export default class TheHeader extends Component{
  constructor(){
    super({
      tagName: 'header',
      state: {
        menus: [
          {
            name: 'Movie',
            href: '#/movie'
          },
          {
            name: 'TVProgram',
            href: '#/tv'
          },
          {
            name: 'About',
            href: '#/about'
          }
        ]
      }
    })
    window.addEventListener('popstate', () => {
      this.render()
    })
  }
  render(){
    this.el.innerHTML = /* html */ `
      <div class="start">
        <a href="#/" class="logo"><span>TMDbAPI</span>.COM</a>
        <nav>
          <ul>
            ${this.state.menus.map(menu => {
              const href = menu.href.split('?')[0]
              const hash = location.hash.split('?')[0]
              const isActive = href === hash
              return /* html */ `
                <li>
                  <a class="${isActive ? 'active' : ''}" href="${menu.href}">${menu.name}</a>
                </li>
              `
            }).join('')}
          </ul>
        </nav>
      </div>
      <div class="center"></div>
      <div class="end">
        <a href="#/about" class="user"><img src="" alt=""></a>
      </div>
    `
    const search = new Search().el
    const centerDiv = this.el.querySelector('.center');
    centerDiv.appendChild(search);
    
  }
}