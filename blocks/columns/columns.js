export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  // Add classes to specific divs
  const allDivs = block.querySelectorAll('div'); // Select all divs inside the block

  allDivs.forEach((div, index) => {
    if (index === 0) {
      div.classList.add('header-container'); // Add class to the first div
    } else if (index === 1) {
      div.classList.add('icon-container'); // Add class to the second div
    } else if (index === 2) {
      div.classList.add('agitation-description'); // Add class to the third div
    } else if (index === 3) {
      div.classList.add('icon-details-container'); // Add class to the fourth div
    }

    // Add a generic class to all divs for styling
    div.classList.add(`div-${index + 1}`);
  });

  // Wrap div-5 and div-7 inside a single parent div
  const div5 = block.querySelector('.div-5'); // Select div-5
  const div7 = block.querySelector('.div-7'); // Select div-7

  if (div5 && div7) {
    const wrapperDiv = document.createElement('div'); // Create a new wrapper div
    wrapperDiv.classList.add('wrapped-content'); // Add a class for styling

    // Insert the wrapper before div-5
    div5.parentElement.insertBefore(wrapperDiv, div5);

    // Move div-5 and div-7 into the wrapper
    wrapperDiv.appendChild(div5);
    wrapperDiv.appendChild(div7);
  }

  // Wrap div-3 and wrapped-content inside a single parent div
  const div3 = block.querySelector('.agitation-description.div-3'); // Select div-3
  const wrappedContent = block.querySelector('.wrapped-content'); // Select wrapped-content

  if (div3 && wrappedContent) {
    const wrapperDiv = document.createElement('div'); // Create a new wrapper div
    wrapperDiv.classList.add('agitation-wrapper'); // Add a class for styling

    // Insert the wrapper before div-3
    div3.parentElement.insertBefore(wrapperDiv, div3);

    // Move div-3 and wrapped-content into the wrapper
    wrapperDiv.appendChild(wrappedContent);
    wrapperDiv.appendChild(div3);
    
  }
}