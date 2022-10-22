export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);
    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.label = document.querySelector('.label');
    // refs.spinner = document.querySelector('.spinner');

    return refs
  }

  enable () {
    this.refs.button.disabled = false;
    this.refs.label.textContent = "Load more photos";
    // this.refs.spinner.classList.add('is-hidden');
  }

  disabled() {
    this.refs.button.disabled = true;
    this.refs.label.textContent = 'Download...';
    // this.refs.spinner.classList.remove('is-hidden');
  }

  show() {
     this.refs.button.removeAttribute('hidden', false)
  }

  hide() {
    this.refs.button.setAttribute('hidden', false)
  }
}
