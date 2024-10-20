import { Store } from '../core/common';

const store = new Store({
  searchText: '',
  page: 1,
  pageMax: 1,
  items: [],
  item: {},
  cast: [],
  director: {},
  loading: false,
  message: '',
  isSearch: false,
  type: 'movie'
});

export default store;

export const searchMedia = async (page) => {
  store.state.loading = true;
  store.state.page = page;

  if (page === 1) {
    store.state.items = [];
    store.state.message = '';
  }
  
  try {
    const currentPath = window.location.hash;
    let type = currentPath.startsWith('#/tv') ? 'tv' : 'movie';
    store.state.type = type;
    store.state.isSearch = store.state.searchText !== '';

    const res = await fetch('/api/media', {
      method: 'POST',
      body: JSON.stringify({
        title: store.state.searchText,
        page,
        type
      })
    });

    const { results, total_results } = await res.json();
    if (results.length !== 0) {
      store.state.items = [...store.state.items, ...results];
      store.state.pageMax = Math.ceil(Number(total_results) / 20);
      window.location.hash = `#/${type}`;
    } else {
      store.state.message = type === 'movie' ? '영화가 없습니다!' : '드라마가 없습니다!';
    }
  } catch (error) {
    console.log('searchMedia error:', error);
  } finally {
    store.state.loading = false;
  }
};

export const getMediaDetails = async (id) => {
  try {
    const currentPath = window.location.hash.split('?')[0];
    let type = currentPath === '#/tv/detail' ? 'tv' : 'movie';
    store.state.type = type;

    const res = await fetch('/api/media', {
      method: 'POST',
      body: JSON.stringify({ id, type })
    });

    const data = await res.json();
    console.log(data)
    store.state.item = data;
    store.state.cast = data.cast;
    store.state.director = data.director;
  } catch (error) {
    console.log('getMediaDetails error:', error);
  }
};
