import App from './App'
import router from './routes'

const root = document.querySelector('#root')
root.append(new App().el)

console.log(new App().el)
router()