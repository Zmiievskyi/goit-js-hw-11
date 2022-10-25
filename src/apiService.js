import axios from 'axios';

const options = {
  BASE_URL: 'https://pixabay.com/api/?key=',
  KEY: '30695074-d0d0e1da504e36119503c6783',
  FILTER_URL: '&image_type=photo&orientation=horizontal&safesearch=true',
  per_page: '40',
};
export default class ApiService {
  constructor() {
    this.searchImages = '';
    this.page = 1;
    this.perPage = Number(options.per_page);
    this.totalPage = 1;
  }

  async fetchImg(per_page) {
    const response = await axios.get(
      `${options.BASE_URL}${options.KEY}&q=${this.searchImages.trim()}${
        options.FILTER_URL
      }&per_page=${per_page}&page=${this.page}`
    );
    this.totalPage = Math.ceil(response.data.total / this.perPage);
    
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
