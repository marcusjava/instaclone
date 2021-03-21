import React from "react";
import PropTypes from "prop-types";

// import { Container } from './styles';

function Footer({ username, caption }) {
  return (
    <div className="p-4 pt-2 pb-0">
      <span className="mr-1 font-bold">{username}</span>
      <span>{caption}</span>
    </div>
  );
}

Footer.propTypes = {
  username: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

export default Footer;
