import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import markup from './templates/markup.hbs '

const galleryRefs = document.querySelector('.gallery');

 const markupItem = async function(response) {
  /*
  const markup = response
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a class="gallery__item" href=${largeImageURL}>
        <img  class="gallery__image" src=${webformatURL} alt='${tags}'  loading="lazy" />
        <div class="info">
            <p class="info-item">
                Likes<b>${likes}</b>
            </p>
            <p class="info-item">
                Views<b>${views}</b>
            </p>
            <p class="info-item">
                 Comments<b>${comments}</b>
            </p>
            <p class="info-item">
                 Downloads<b>${downloads}</b>
            </p>
        </div>
    </a>`
    )
    .join('');
*/
const list = await markup(response);
galleryRefs.insertAdjacentHTML('beforeend', list);
  
  const lightbox = new SimpleLightbox('.gallery a', 
  // {
  //   captionDelay: 250,
  //   captionData: 'alt',
  // }
  );
   lightbox.refresh();
}

export { markupItem };