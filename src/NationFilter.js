import React from 'react'
import { FaSearch } from 'react-icons/fa';

  /* receives props fro Admin Component.
   Contains filter by name ,country and toggle country.*/

function NationFilter({ onNationChange, onCountryChecked, value, filterNames }) {
  return (
    <>
      <p>Filter by</p>
      <div className="filters">
        <div className="input-group grp2">
          <span className="input-group-addon">
            <FaSearch className="my-svg" />
          </span>
          <input
            type="text"
            name="search"
            value={value}
            className="form-control-plaintext search2"
            placeholder="Find in list"
            onChange={(e) => filterNames(e.target.value)}
          />
        </div>

        <select
          className="form-control my-select"
          data-testid="select-btn"
          name="country"
          onChange={(e) => onNationChange(e.target.value)}  
        >
          <option value="">Country</option>
          <option value="AU">AU</option>
          <option value="BR">BR</option>
          <option value="CA">CA</option>
          <option value="CH">CH</option>
          <option value="DE">DE</option>
          <option value="DK">DK</option>
          <option value="ES">ES</option>
          <option value="FI">FI</option>
          <option value="FR">FR</option>
          <option value="GB">GB</option>
          <option value="IE">IE</option>
          <option value="IR">IR</option>
          <option value="NO">NO</option>
          <option value="NL">NL</option>
          <option value="NZ">NZ</option>
          <option value="TR">TR</option>
          <option value="US">US</option>
        </select>

        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="show-country"
            onChange={(e) => onCountryChecked(e.target.checked)
            }
          />
          <label
            className="custom-control-label toggle"
            htmlFor="show-country"
          >
            <b>Show Country</b>
          </label>
        </div>
      </div>

    </>
  )
}

export default NationFilter