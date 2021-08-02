import React from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';

const DescModl = ({element, type}) => {
  if (type === 'unit') {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="block">
            <div className="columns">
              <div className="column is-one-third">
                <div className="title">{element.name}</div>
              </div>
              <div className="column is-two-thirds">

              </div>
            </div>
          </div>
        </div>
        <button className="modal-close is-large" aria-label="close"/>
      </div>
    );
  } else if (type === 'item') {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="block">
            <div className="columns">
              <div className="column is-one-third">
                <div className="title">{element.name}</div>
                <div className=""></div>
              </div>
              <div className="column is-two-thirds">

              </div>
            </div>
          </div>
        </div>
        <button className="modal-close is-large" aria-label="close"/>
      </div>
    );
  }
};

export default DescModal;