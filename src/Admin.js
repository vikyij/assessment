import React, { useReducer } from 'react';
import { useGet } from 'restful-react';
import { FaSearch } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import cc from 'classcat';

import Users from './Users';
import Pagination from './Pagination'
import Download from './Download'


import './admin.css';

const initialState = {
  gender: '',
  page: 1,
  nationality: '',
  showCountry: false,
  seed: 'Emerald',
};


function profileReducer(state = initialState, action) {
  switch (action.type) {
    case 'update/gender': {
      const gender = action.payload;

      // No need to update if the gender is the same
      if (gender === state.gender) {
        return state;
      }

      // Due to the way random api behaves,
      // if the gender changes, the seed has to change
      // https://stackoverflow.com/a/8084248
      const seed = Math.random().toString(36).substring(7);

      return { ...state, gender, seed };
    }

    case 'update/nationality': {
      const nationality = action.payload;

      return { ...state, nationality };
    }

    case 'view/show-country': {
      const showCountry = action.payload;

      return { ...state, showCountry };
    }

    case 'page/next': {
      const { page } = state;
      return { ...state, page: page + 1 };
    }

    case 'page/previous': {
      const { page } = state;

      if (page === 1) {
        return state;
      }

      return { ...state, page: page - 1 };
    }

    default:
      throw new Error('Use one of the defined types');
  }
}

function Admin() {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  const { gender, page, nationality, seed, showCountry } = state;

  const { data, loading, absolutePath } = useGet({
    path: 'https://randomuser.me/api/',
    resolve: (users) => users && users.results,
    queryParams: {
      gender,
      nat: nationality,
      page: page,
      seed: seed,
      results: 3,
    },
  });
  return (
    <div className="admin">
      <div className="row admin-row">
        <div className="col-sm-6 admin-text">
          <p className="admin-h3">
            Hello, <span className="admin-span">Emerald</span>
          </p>
          <p className="admin-p">
            Welcome to your dashboard, kindly sort through the user base
          </p>
          <div className="input-group">
            <span className="input-group-addon">
              <FaSearch />
            </span>
            <input
              type="text"
              name="search"
              className="form-control-plaintext"
              placeholder="Find a user"
            />
          </div>

          <p>
            <b>Show Users</b>
          </p>

          <div className="row buttons d-flex justify-content-around">
            <div
              className={cc({
                'b1 gender-button': true,
                'gender-active': gender === '',
              })}
            >
              <button
                type="button"
                className="btn all-users"
                onClick={() => dispatch({ type: 'update/gender', payload: '' })}
              >
                <FaUsers className="svg1" />
              </button>

              <p className="admin-user">All Users</p>
            </div>

            <div
              className={cc({
                'b1 gender-button': true,
                'gender-active': gender === 'male',
              })}
            >
              <button
                type="button"
                className="btn m-user"
                onClick={() =>
                  dispatch({ type: 'update/gender', payload: 'male' })
                }
              >
                <FaUserTie className="svg1" />
              </button>
              <p className="admin-user">Male Users</p>
            </div>

            <div
              className={cc({
                'b1 gender-button': true,
                'gender-active': gender === 'female',
              })}
            >
              <button
                type="button"
                className="btn f-user"
                onClick={() =>
                  dispatch({ type: 'update/gender', payload: 'female' })
                }
              >
                <FaUser className="svg1" />
              </button>
              <p className="admin-user">Female Users</p>
            </div>
          </div>
        </div>

        <div className="col-sm-6 users-db">
          <p className="toggle-users">
            <b>
              <span className="text-capitalize">{gender || 'All'}</span> Users
            </b>
          </p>
          <p>Filter by</p>
          <div className="filters">
            <div className="input-group grp2">
              <span className="input-group-addon">
                <FaSearch className="my-svg" />
              </span>
              <input
                type="text"
                name="search"
                className="form-control-plaintext search2"
                placeholder="Find in list"
              />
            </div>

            <select
              className="form-control my-select"
              name="country"
              onChange={(e) =>
                dispatch({
                  type: 'update/nationality',
                  payload: e.target.value,
                })
              }
            >
              <option value="">All</option>
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
                value={showCountry}
                onChange={(e) =>
                  dispatch({
                    type: 'view/show-country',
                    payload: e.target.checked,
                  })
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

          <Users users={data} loading={loading} showCountry={showCountry} />
          <Download path={absolutePath} />
            <Pagination
              page={page}
              previous={() => dispatch({ type: 'page/previous' })}
              next={() => dispatch({ type: 'page/next' })}
            />
         

        </div>
      </div>
    </div>
  );
}

export default Admin;
