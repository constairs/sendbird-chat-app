import React from 'react';
import styled from 'styled-components';
import { Page } from '../UI/Page';

const Background = styled.div`
  width: 100%;
  height: 100%;
  transform: translateZ(0);
  background: url('../../assets/img/background.jpg');
  background-size: cover;
  border-radius: 2px;
`;

const Title = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  color: #2b2b2b;
`;

export const Banner = () => (
  <Page>
    <div id="root">
      <Background>
        <Title>Banner</Title>
      </Background>
    </div>
  </Page>
);
