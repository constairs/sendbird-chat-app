import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../../theme/media';

const ImgRound = ({ ...props }) => {
  const {
    src,
    btn,
    btnTitle,
    onClickBtn,
    additionalTitle
  } = props;
  return (
    <div className={props.className}>
      <img src={src} alt={src} />
      {btn ? (
        <button onClick={onClickBtn} title={additionalTitle}>
          {btnTitle}
        </button>
      ) : null}
    </div>
  );
};

ImgRound.defaultProps = {
  btn: false,
  btnTitle: '',
  onClickBtn: null,
  additionalTitle: '',
  className: '',
};

ImgRound.propTypes = {
  src: PropTypes.string.isRequired,
  btn: PropTypes.bool,
  btnTitle: PropTypes.string,
  onClickBtn: PropTypes.func,
  additionalTitle: PropTypes.string,
  className: PropTypes.string
};

export const ImgWrap = styled(ImgRound)`
  ${props => props.theme.imgWrap}
  ${media.tablet`
    width: 80px;
    height: 80px;
  `}
  ${media.phoneMd`
    width: 60px;
    height: 60px;
  `}
  ${media.phoneSm`
    width: 50px;
    height: 50px;
  `}
`;
