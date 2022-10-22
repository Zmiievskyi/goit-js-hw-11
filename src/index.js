import _ from 'lodash';
import ApiService from './apiService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import markupItem from './markup';
import LoadMoreBtn from './load-more-btn';

const fetchImgApi = new ApiService();
// const observer = new IntersectionObserver(() => console.log('hi'), {
//   threshold: 0.1,

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const formRefs = document.querySelector('form');
const galleryRefs = document.querySelector('.gallery');
const loadMoreBtnRefs = document.querySelector('.load-more');
const input = document.querySelector('input');

let inputStorage;

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
  // if (e.target[0].value === inputStorage) {
  //    return}
  // console.dir(e.target[0].value);
  // console.log(inputStorage);
  if (input.value.trim().length < 1) {
    loadMoreBtn.hide();
    return Notify.failure(`Enter correct name.`);
  }

  try {
    const getImages = await fetchImgApi.fetchImg();
    if (getImages.hits.length < 1) {
      throw Error;
    }
    markupItem(getImages.hits);
    Notify.success(`Hooray! We found ${getImages.total} images.`);

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
}

function onLoadMore(e) {
  e.preventDefault();
  loadMoreBtn.disabled();
  if (fetchImgApi.page === fetchImgApi.totalPage) {
    loadMoreBtn.hide();
  }
  fetchImgApi
    .fetchImg()
    .then(data => {
      markupItem(data.hits);
      loadMoreBtn.enable();
    })
    .catch(console.log);
  fetchImgApi.incrementPage();
}
