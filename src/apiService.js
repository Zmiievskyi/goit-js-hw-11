import axios from 'axios';

// const options = {
//   BASE_URL: 'https://pixabay.com/api/?key=',
//   KEY: '30695074-d0d0e1da504e36119503c6783',
//   FILTER_URL: '&image_type=photo&orientation=horizontal&safesearch=true',
//   per_page: '4',
// };
export default class ApiService {
  constructor({ BASE_URL, KEY, FILTER_URL, PER_PAGE }) {
    this.searchImages = '';
    this.page = 1;
    this.totalPage = null;
    this.BASE_URL = BASE_URL;
    this.KEY = KEY;
    this.FILTER_URL = FILTER_URL;
    this.PER_PAGE = PER_PAGE;
  }

  async fetchImg() {
    const response = await axios.get(
      `${this.BASE_URL}${this.KEY}&q=${this.searchImages.trim()}${
        this.FILTER_URL
      }&per_page=${this.PER_PAGE}&page=${this.page}`
    );
    this.totalPage = Math.ceil(response.data.total / this.PER_PAGE);

    return response.data;
  }

  get images() {
    return this.searchImages;
  }

  set images(newImages) {
    this.searchImages = newImages;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
