import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-preloading-component';

const PreloaderInner = styled.div`
  
`;

export const Preloader = () => (
  <PreloaderInner>
    <Spinner color="#ffffff" secondaryColor="#40c9ff" size={100} />
  </PreloaderInner>
);
