export const parser = (pattern: string, offset = 1) => {
  // comments start with '!'
  const encodedString = pattern
    .trim()
    .split('\n')
    .filter((row) => !row.startsWith('!'));

  const ys = Math.max(...encodedString.map((row) => row.length)) - 1;

  const organism = encodedString.map((rowEncoded) => {
    return (
      '.'.repeat(offset) +
      rowEncoded +
      '.'.repeat(ys - rowEncoded.length + offset)
    )
      .split('')
      .map((cellEncoded) => {
        switch (cellEncoded) {
          case '.':
            return 0;

          case 'O':
            return 1;

          default:
            return 0;
        }
      });
  });

  return [
    ...Array(offset).fill(Array(ys + offset * 2).fill(0)),
    ...organism,
    ...Array(offset).fill(Array(ys + offset * 2).fill(0)),
  ];
};
