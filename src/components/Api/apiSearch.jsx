const API_BASE = 'https://pixabay.com/api';
const API_KEY = '30297842-30e01d12e48588937048bb7ce';

export function apiSearch(query, page) {
    return fetch(`${API_BASE}/?q=${query}
    &page=${page}&key=${API_KEY}&image_type=photo
    &orientation=horizontal&per_page=12`).then(res => res.json());
}
