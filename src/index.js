import _ from 'lodash';
import ApiService from './apiService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { markupItem } from './markup';
import LoadMoreBtn from './load-more-btn';

let inputStorage;
const options = {
  BASE_URL: 'https://pixabay.com/api/?key=',
  KEY: '30695074-d0d0e1da504e36119503c6783',
  FILTER_URL: '&image_type=photo&orientation=horizontal&safesearch=true',
  PER_PAGE: '40',
};
/*
const optionsForGuard = {
  root: null,
  rootMargin: '50px',
  threshold: 0.1,
};
const observer = new IntersectionObserver(onLoadMore, optionsForGuard);
*/
const fetchImgApi = new ApiService(options);
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
console.log(fetchImgApi);
const formRefs = document.querySelector('form');
const galleryRefs = document.querySelector('.gallery');
const loadMoreBtnRefs = document.querySelector('.load-more');
const input = document.querySelector('input');
// const guard = document.querySelector('[data-action="guard"]');

formRefs.addEventListener('input', onInput);

function onInput(e) {
  e.preventDefault();
  formRefs[1].disabled = false;
  formRefs.addEventListener('submit', onSearch);
  loadMoreBtn.hide();
  fetchImgApi.images = e.target.value;
  galleryRefs.innerHTML = '';
  fetchImgApi.resetPage();
  inputStorage = input.value.trim();
}

async function onSearch(e) {
  e.preventDefault();
  formRefs[1].disabled = true;
  loadMoreBtn.show();
  loadMoreBtn.disabled();

  if (inputStorage.length < 1) {
    loadMoreBtn.hide();
    return Notify.failure(`Enter correct name.`);
  }

  try {
    const getImages = await fetchImgApi.fetchImg(fetchImgApi.perPage);
    if (getImages.hits.length < 1) {
      throw Error;
    }
    markupItem(getImages.hits);

    Notify.success(`Hooray! We found ${getImages.total} images.`);

    loadMoreBtn.show();
    loadMoreBtn.enable();
    loadMoreBtnRefs.addEventListener('click', onLoadMore);

    if (fetchImgApi.page === fetchImgApi.totalPage) {
      loadMoreBtn.hide();
    }
    fetchImgApi.incrementPage();
  } catch (error) {
    return Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  }
  //  observer.observe(guard);
}

async function onLoadMore(e) {
  loadMoreBtn.disabled();
  try {
    const newPageImg = await fetchImgApi.fetchImg();
    markupItem(newPageImg.hits).then(e => {
      window.scrollBy(0, window.innerHeight)
    });
    loadMoreBtn.enable();
    if (fetchImgApi.page === fetchImgApi.totalPage) {
      loadMoreBtn.hide();
    }
  } catch (error) {
    console.log(error);
  }
   function scroll() {
     const { height: cardHeight } = document
       .querySelector('.gallery')
       .firstElementChild.getBoundingClientRect();
     window.scrollBy({
       top: cardHeight * 3,
       behavior: 'smooth',
     });
   }
   fetchImgApi.incrementPage();
}
