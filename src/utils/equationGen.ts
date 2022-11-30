export const equationGen = (params: number[], label: 'x' | 'y') => {
  const tex = `
            ${label}'      =
        ${params[0]}     t ${params[1] < 0 ? '' : '+'}
        ${params[1]} x   t ${params[2] < 0 ? '' : '+'}
        ${params[2]} x^2   ${params[3] < 0 ? '' : '+'}
        ${params[3]} xy    ${params[4] < 0 ? '' : '+'}
        ${params[4]} y   t ${params[5] < 0 ? '' : '+'}
        ${params[5]} y^2
    `;

  return tex;
};
