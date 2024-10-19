import { Store } from '../core/common';

const API_KEY = 'a01c89e1e86bf8c220ab27725d26cb30';
const BASE_URL = 'https://api.themoviedb.org/3';

const store = new Store({
  searchText: '',
  page: 1,
  pageMax: 1,
  items: [],  // 영화나 TV 프로그램을 저장할 배열
  item: {},   // 선택된 영화나 TV 프로그램
  cast: [],   // 출연진 정보
  director: {}, // 감독 정보
  loading: false,
  message: '',
  isSearch: false,
  type: 'movie'  // movie 또는 tv를 구분하는 필드
});

export default store;

export const searchMedia = async (page) => {  // type으로 movie 또는 tv를 구분
  store.state.loading = true;
  store.state.page = page;
    // 영화 또는 TV 프로그램 설정
  if (page === 1) {
    store.state.items = [];
    store.state.message = '';
  }
  try {
    // 현재 URL에서 경로 확인
    const currentPath = window.location.hash; // 예: "#/tv" 또는 "#/"
    console.log(currentPath)
    let type; // 검색할 미디어 타입을 저장할 변수
 
    if (currentPath.startsWith('#/tv')) {
      type = 'tv'; // TV 프로그램 검색
    } else {
      type = 'movie'; // 기본적으로 영화 검색
    }
   store.state.type = type;
    store.state.isSearch = store.state.searchText !== '';
    const API_URL = store.state.isSearch
      ? `${BASE_URL}/search/${type}?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(store.state.searchText)}&page=${page}`
      : `${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`;
      console.log(API_URL)
    const res = await fetch(API_URL);
    const { results, total_results } = await res.json();
    console.log(results)
    if (results.length !== 0) {
      store.state.items = [
        ...store.state.items,
        ...results
      ];
      store.state.pageMax = Math.ceil(Number(total_results) / 20);

      window.location.hash = `#/${type}`;
    } else {
      store.state.message = type === 'movie' ? '영화가 없습니다!' : '드라마가 없습니다!';
    }
  } catch (error) {
    console.log(`searchMedia error:`, error);
  } finally {
    store.state.loading = false;
  }
};

export const getMediaDetails = async (id) => {  // type으로 movie 또는 tv 구분
  try {
    const currentPath = window.location.hash.split('?')[0]; // 예: "#/tv" 또는 "#/"
    console.log(currentPath)
    let type; // 검색할 미디어 타입을 저장할 변수
 
    if (currentPath === '#/tv/detail') {
      type = 'tv'; // TV 프로그램 검색
    } else {
      type = 'movie'; // 기본적으로 영화 검색
    }
   store.state.type = type;
    const res = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=ko-KR`);
    store.state.item = await res.json();
    const creditsRes = await fetch(`${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}&language=ko-KR`);
    const creditsData = await creditsRes.json();
    store.state.cast = creditsData.cast;  // 출연진 정보 저장
    store.state.director = creditsData.crew.find(member => member.job === 'Director');  // 감독 정보 저장
  } catch (error) {
    console.log(`getMediaDetails error:`, error);
  }
};
