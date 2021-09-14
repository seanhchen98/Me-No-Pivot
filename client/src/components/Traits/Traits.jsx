import React from 'react';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';

import TraitsList from './TraitsList.jsx';

const Traits = ({traits}) => {
  return (
    <div className="block level" style={{justifyContent: 'normal'}}>
      <TraitsList traits={traits}/>
    </div>
  );
};

Traits.propTypes = {
  traits: PropTypes.array,
};

export default Traits;
