import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImgWrap = styled.div`
  ${props => props.theme.imgWrap}
`;

export const ImgRound = ({ ...props }) => {
  const {
    src,
    btn,
    btnTitle,
    onClickBtn,
    additionalTitle
  } = props;
  return (
    <ImgWrap>
      <img src={src} alt={src} />
      {btn ? (
        <button onClick={onClickBtn} title={additionalTitle}>
          {btnTitle}
        </button>
      ) : null}
    </ImgWrap>
  );
};

ImgRound.defaultProps = {
  btn: false,
  btnTitle: '',
  onClickBtn: null,
  additionalTitle: '',
};

ImgRound.propTypes = {
  src: PropTypes.string.isRequired,
  btn: PropTypes.bool,
  btnTitle: PropTypes.string,
  onClickBtn: PropTypes.func,
  additionalTitle: PropTypes.string
};

