import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '39879115-28a2f7246b52cd09f840d063c';

const fetchSearchQuery = (searchQuery, page) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page,
  });

  return axios.get(`${URL}?${params}`);
};

export default fetchSearchQuery;
