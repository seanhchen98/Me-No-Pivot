import React from 'react';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const TraitItem = ({trait}) => {
  if (!trait.name) {
    return (
      <div className="level-item" style={{width: 45, height: 34.328}}></div>
    );
  } else {
    const tooltip = `${trait.name} ${trait.}`
    return (
      <div className="level-item" style={{maxWidth: 45, height: 34.328}}>
        <Tippy content={trait.name}>
          <div className="is-align-items-center is-justify-content-center" style={{backgroundImage: `url(${trait.hex})`, backgroundSize: '29.67px 34.33px', width: 30, height: 34.34, marginLeft: 0}}>
            <figure className="image is-16x16 m-auto is-unselectable">
              <img className="is-unselectable" src={trait.icon} style={{verticalAlign: 'bottom', filter: 'invert(100%)'}}/>
            </figure>
          </div>
        </Tippy>
      </div>
    );
  }
};

TraitItem.propTypes = {
  trait: PropTypes.object,
};

export default TraitItem;