import React from 'react';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';

const Traits = ({traits}) => {
  return (
    <div className="container">
      <div className="">
        <TraitsLIst />
      </div>
    </div>
  );
};

Traits.propTypes = {
};

export default Traits;
