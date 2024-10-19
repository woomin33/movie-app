import { Component } from '../core/common'
import aboutStore from '../store/about'

export default class NotFound extends Component{
  render() {
    this.el.classList.add('container', 'not-found', 'no-scroll')
    this.el.innerHTML = /* html */ `
      <h1>
        Sorry..<br>
        Page Not Found.
      </h1>
    `
  }
}
