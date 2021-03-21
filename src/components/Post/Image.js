import React from "react";
import PropTypes from "prop-types";

// import { Container } from './styles';

function Image({ source, caption }) {
  return <img src={source} alt={caption} />;
}

Image.propTypes = {
  source: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

export default Image;
