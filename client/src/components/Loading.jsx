import React from 'react';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';

const Loading = ({searchProgress}) => {
  return (
      <div className="container block has-text-centered has-text-white" style={{display: searchProgress === 'pending' ? "block" : "none"}}>
        <div className="icon is-large">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      </div>
  );
};

Loading.propTypes = {
  searchProgress: PropTypes.string,
};

export default Loading;