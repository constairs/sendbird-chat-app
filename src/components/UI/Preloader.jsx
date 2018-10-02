import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Spinner } from 'react-preloading-component';
import { colors } from '../../theme/theme';

const PreloaderInner = styled.div`
  background-color: rgba(255,255,255, .66);
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  display: flex;
  z-index: 2;
`;

export const Preloader = ({ ...props }) => (
  <PreloaderInner>
    <Spinner color={props.color} secondaryColor={props.secondColor} size={props.size} />
  </PreloaderInner>
);

Preloader.defaultProps = {
  color: colors.light,
  secondColor: colors.main,
  size: 100
};

Preloader.propTypes = {
  color: PropTypes.string,
  secondColor: PropTypes.string,
  size: PropTypes.number,
};
