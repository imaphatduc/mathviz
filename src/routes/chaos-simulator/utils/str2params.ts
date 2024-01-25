export const str2params = (str: string) => {
  const mapper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const params: number[] = [];

  const step = 0.1;

  str.split('').forEach((c, i) => {
    const index = mapper.indexOf(c.toUpperCase());

    const param = (index - 12) * step;

    params[i] = parseFloat(param.toFixed(1));
  });

  return params;
};
