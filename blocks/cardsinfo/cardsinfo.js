export default function decorate(block) {
    const classNames = ['cmp-cardsinfo-title', 'cmp-cardsinfo-twocard', 'cmp-cardsinfo-singlecard'];
    [...block.children].forEach((row, rowIndex) => {
      if (rowIndex === 0) {
        row.classList.add(classNames[0]);
      }
      if (rowIndex === 1) {
        row.classList.add(classNames[1]);
      }
      if (rowIndex === 2) {
        row.classList.add(classNames[2]);
      }
      [...row.children].forEach((col) => {
       
      });
    });
  }
  