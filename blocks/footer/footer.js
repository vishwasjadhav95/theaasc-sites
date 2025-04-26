import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  footer.classList.add('cmp-footer');
  while (fragment.firstElementChild) {
    footer.append(fragment.firstElementChild);
  }

  const defaultContentWrappers = footer.querySelectorAll('.default-content-wrapper');

  // Create a new wrapper div to hold all sections
  const footerWrapper = document.createElement('div');
  footerWrapper.classList.add('footer-wrapper');

  defaultContentWrappers.forEach((wrapper, index) => {
    if (index === 0) {
      // Upper Section
      wrapper.classList.add('default-content-wrapper', 'cmp-upperheader');

      // Select the first <p> tag with the <picture> tag inside
      const firstPTag = wrapper.querySelector('p picture')?.parentElement;
      const ulTags = wrapper.querySelectorAll('ul');
      const remainingPTags = wrapper.querySelectorAll('p:not(:first-of-type)');

      if (firstPTag && ulTags.length > 0 && remainingPTags.length > 0) {
        // Create the parent wrapper div
        const parentDiv = document.createElement('div');
        parentDiv.classList.add('footer-content-wrapper');

        // Create the first div for the <p> tag with the <picture>
        const firstDiv = document.createElement('div');
        firstDiv.classList.add('footer-logo');
        firstDiv.appendChild(firstPTag);

        // Create the second div for the <ul> elements
        const secondDiv = document.createElement('div');
        secondDiv.classList.add('footer-links');
        ulTags.forEach((ul) => {
          secondDiv.appendChild(ul);
        });

        // Create the third div for the remaining <p> tags
        const thirdDiv = document.createElement('div');
        thirdDiv.classList.add('footer-info');
        remainingPTags.forEach((p) => {
          thirdDiv.appendChild(p);
        });

        // Append the three divs to the parent wrapper div
        parentDiv.appendChild(firstDiv);
        parentDiv.appendChild(secondDiv);
        parentDiv.appendChild(thirdDiv);

        // Append the parent wrapper div to the wrapper
        wrapper.appendChild(parentDiv);
      }

      // Append the upper section to the footer wrapper
      footerWrapper.appendChild(wrapper);
    }

    if (index === 1) {
      // Middle Section
      const middleSection = document.createElement('div');
      middleSection.classList.add('default-content-wrapper', 'cmp-middleheader');

      // Select all <p> tags from the wrapper
      const pTags = wrapper.querySelectorAll('p');

      if (pTags.length > 0) {
        // Wrap the first <p> tag in a div with class 'middleheader'
        const firstPDiv = document.createElement('div');
        firstPDiv.classList.add('middleheader');
        firstPDiv.appendChild(pTags[0]); // Move the first <p> tag into this div

        // Append the 'middleheader' div to the footer wrapper
        footerWrapper.appendChild(firstPDiv);
      }

      // Append the remaining <p> tags to the middle section
      for (let i = 1; i < pTags.length; i++) {
        middleSection.appendChild(pTags[i]);
      }

      // Append the middle section to the footer wrapper
      footerWrapper.appendChild(middleSection);
    }

    if (index === 2) {
      // Lower Section
      const lowerSection = document.createElement('div');
      lowerSection.classList.add('default-content-wrapper', 'cmp-lowerheader'); // Correct class name for lower section

      // Add content to the lower section
      const pTags = wrapper.querySelectorAll('p');
      pTags.forEach((p) => {
        lowerSection.appendChild(p);
      });

      // Append the lower section to the footer wrapper
      footerWrapper.appendChild(lowerSection);
    }
  });

  // Append the footer wrapper to the block
  block.appendChild(footerWrapper);
}