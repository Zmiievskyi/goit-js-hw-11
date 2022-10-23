import _ from 'lodash';
import ApiService from './apiService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import markupItem from './markup';
import LoadMoreBtn from './load-more-btn';

const PER_PAGE = '40';
let inputStorage;
/*
const optionsForGuard = {
  root: null,
  rootMargin: '50px',
  threshold: 0.1,
};
const observer = new IntersectionObserver(onLoadMore, optionsForGuard);
*/
const fetchImgApi = new ApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

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
    const getImages = await fetchImgApi.fetchImg(PER_PAGE);
    if (getImages.hits.length < 1) {
      throw Error;
    }
    markupItem(getImages.hits);
    Notify.success(`Hooray! We found ${getImages.total} images.`);

 const { height: cardHeight } = document
   .querySelector('.gallery')
   .firstElementChild.getBoundingClientRect();

 window.scrollBy({
   top: cardHeight * -100,
   behavior: 'smooth',
 });

    loadMoreBtn.show();
    loadMoreBtn.enable();
    loadMoreBtnRefs.addEventListener('click', onLoadMore);
    fetchImgApi.incrementPage();
    if (fetchImgApi.page > fetchImgApi.totalPage) {
      loadMoreBtn.hide();
    }
  } catch (error) {
    return Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  }
  //  observer.observe(guard);
}

function onLoadMore(e) {
  // e.preventDefault();
  loadMoreBtn.disabled();
  if (fetchImgApi.page === fetchImgApi.totalPage) {
    loadMoreBtn.hide();
  }
  fetchImgApi
    .fetchImg(PER_PAGE)
    .then(data => {
      markupItem(data.hits);
      loadMoreBtn.enable();
      

const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});


    })
    .catch(console.log);
  fetchImgApi.incrementPage();
}
