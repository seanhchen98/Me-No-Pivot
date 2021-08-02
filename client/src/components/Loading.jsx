import React from 'react';
import $ from 'jquery';
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

export default Loading;