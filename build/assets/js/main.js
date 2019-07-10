const MOBILE_BREAKPOINT = 450;

const onDOMReady = (callback) => {
  document.readyState === 'interactive' || document.readyState === 'complete' ? callback() : document.addEventListener('DOMContentLoaded', callback);
};

const addEventListeners = (elements, event, callback) => {
  document.querySelectorAll(elements).forEach((element) => {
    element.addEventListener(event, callback);
  });
};

const getWindowOuterWidth = () => {
  // window.outerWidth is 0 in Safari
  return window.outerWidth === 0 ? window.innerWidth : window.outerWidth;
};



const handleDropdownActionClick = (event) => {
  if (event) event.preventDefault();

  const dropdownAction = event.currentTarget;
  const dropdownItem = dropdownAction.closest('.dropdown__item');
  const dropdownInner = dropdownItem.querySelector('.dropdown__inner');

  const windowOuterWidth = getWindowOuterWidth();
  
  const currentlyActiveDropdownInner = document.querySelector('.dropdown__inner.active');
  if (currentlyActiveDropdownInner && currentlyActiveDropdownInner !== dropdownInner) {
    currentlyActiveDropdownInner.classList.remove('active');

    if (windowOuterWidth <= MOBILE_BREAKPOINT) {
      currentlyActiveDropdownInner.style.cssText = '';
    }
  }
  
  dropdownInner.classList.toggle('active');

  if (windowOuterWidth <= MOBILE_BREAKPOINT) {

    if (dropdownInner.classList.contains('active')) {
      const dropdownInnerScrollHeight = dropdownInner.scrollHeight;
      dropdownInner.style.cssText = `max-height: ${dropdownInnerScrollHeight}px`;
    } else {
      dropdownInner.style.cssText = '';
    }
  }
}

const handleDropdownCloseButtonClick = (event) => {
  if (event) event.preventDefault();

  const dropdownCloseButton = event.currentTarget;
  const dropdownItem = dropdownCloseButton.closest('.dropdown__item');
  const dropdownInner = dropdownItem.querySelector('.dropdown__inner');

  dropdownInner.classList.remove('active');

  const windowOuterWidth = getWindowOuterWidth()
  if (windowOuterWidth <= MOBILE_BREAKPOINT) {
    dropdownInner.style.cssText = '';
  }
}

const initEventListeners = () => {
  addEventListeners('.dropdown__action', 'click', handleDropdownActionClick);
  addEventListeners('.dropdown__close-button', 'click', handleDropdownCloseButtonClick);
}

onDOMReady(() => {
  initEventListeners();
});