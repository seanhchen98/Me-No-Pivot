import React from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.min.css';
import PropTypes from 'prop-types';

const Search = ({handleSearch, inputSearch, selectRegion}) => {
  return (
    <form className="" onSubmit={handleSearch}>
      <div className="field has-addons">
        <div className="control">
          <div className="select" onChange={selectRegion}>
            <select>
              <option value="BR1">BR</option>
              <option value="EUN1">EUNE</option>
              <option value="EUW1">EUW</option>
              <option value="JP1">JP</option>
              <option value="KR">KR</option>
              <option value="LA1">LAN</option>
              <option value="LA2">LAS</option>
              <option value="NA1" selected>NA</option>
              <option value="OC1">OCE</option>
              <option value="TR1">TR1</option>
              <option value="RU">RU</option>
            </select>
          </div>
        </div>
        <div className="control is-expanded has-icons-left">
          <input className="input is-normal" type="text" placeholder="Summoner Name" onChange={inputSearch} autoFocus/>
          <span className="icon is-small is-left">
            <i className="fas fa-user"/>
          </span>
        </div>
        <div className="control">
          <button className="button is-info" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

Search.propTypes = {
  handleSearch: PropTypes.func,
  inputSearch: PropTypes.func,
  selectRegion: PropTypes.func,
};

export default Search;