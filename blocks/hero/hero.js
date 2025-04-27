export default function decorate(block) {
    [...block.children].forEach((row) => {
      [...row.children].forEach((col, colIndex) => {
        if (colIndex === 0) {
          col.classList.add('cmp-hero-content');
  
          const firstP = col.querySelector('p');
          if (firstP) {
            firstP.classList.add('cmp-hero-first-p');
          }
        }
      });
    });
  }