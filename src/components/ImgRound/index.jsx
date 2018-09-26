import React from 'react';
import PropTypes from 'prop-types';

export const ImgRound = ({ ...props }) => {
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

