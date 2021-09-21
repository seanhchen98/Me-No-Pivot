import React, { useState } from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const UnitItems = ({itemIds}) => {

  let displayItems = itemIds;

  return (
    <div className="block level">
      {displayItems.map((item, index) => (
        <ItemIcons item={item} key={index}/>
      ))}
    </div>
  );
};

const ItemIcons = ({item}) => {
  if (item.url) {
    return (
      <Tippy content={item.name}>
        <figure className="image is-16x16">
          <img src={item.url}/>
        </figure>
      </Tippy>
    );
  } else {
    return (
      <div className="">{ }</div>
    )
  }
};

UnitItems.propTypes = {
  itemIds: PropTypes.array,
};

export default UnitItems;