import { createRouter } from '../core/common'
import Home from './Home'
import Movie from './Movie'
import Detail from './Detail'
import TvProgram from './TvProgram'
import About from './About'
import NotFound from './NotFound'

export default createRouter([
  { path: '#/', component: Home },
  { path: '#/movie', component: Movie },
  { path: '#/movie/detail', component: Detail },
  { path: '#/tv/detail', component: Detail },
  { path: '#/tv', component: TvProgram},
  { path: '#/about', component: About },
  { path: '.*', component: NotFound }
])