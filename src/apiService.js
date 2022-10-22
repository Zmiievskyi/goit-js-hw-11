import axios from 'axios';

const options = {
  BASE_URL: 'https://pixabay.com/api/?key=',
  KEY: '30695074-d0d0e1da504e36119503c6783',
  FILTER_URL: '&image_type=photo&orientation=horizontal&safesearch=true',
  PER_PAGE: '&per_page=4  ',
};
export default class ApiService {
  constructor() {
    this.searchImages = '';
    this.page = 1;
    this.totalPage = null;
  }

  async fetchImg() {
    const response = await axios.get(
      `${options.BASE_URL}${options.KEY}&q=${this.searchImages.trim()}${
        options.FILTER_URL
      }${options.PER_PAGE}&page=${this.page}`
    );
    this.totalPage = Math.round(response.data.total / response.data.hits.length);
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
