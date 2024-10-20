import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { APIKEY } = process.env
  const BASE_URL = 'https://api.themoviedb.org/3';

  const { title, page, id, type } = JSON.parse(req.body);

  let url;
  if (id) {
    // 단일 아이템 세부 정보 가져오기
    url = `${BASE_URL}/${type}/${id}?api_key=${APIKEY}&language=ko-KR`;
  } else if (title) {
    // 검색 쿼리
    url = `${BASE_URL}/search/${type}?api_key=${APIKEY}&language=ko-KR&query=${encodeURIComponent(title)}&page=${page}`;
  } else {
    // 인기 항목 조회
    url = `${BASE_URL}/${type}/popular?api_key=${APIKEY}&language=ko-KR&page=${page}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (id) {
      // 출연진 정보도 요청 (ID가 있는 경우)
      const creditsUrl = `${BASE_URL}/${type}/${id}/credits?api_key=${APIKEY}&language=ko-KR`;
      const creditsResponse = await fetch(creditsUrl);
      const creditsData = await creditsResponse.json();

      // 출연진과 감독 정보를 추가하여 반환
      data.cast = creditsData.cast;
      data.director = creditsData.crew.find(member => member.job === 'Director');
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
