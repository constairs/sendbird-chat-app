import { css } from 'styled-components';

const sizes = {
  desktop: 992,
  tablet: 768,
  phoneLg: 576,
  phoneMd: 480,
  phoneSm: 360,
  phoneXs: 320,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }`;
  return acc;
}, {});
