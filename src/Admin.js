import React, { useReducer } from 'react';
import { useGet } from 'restful-react';
import { FaSearch } from 'react-icons/fa';


import Users from './Users';
import Pagination from './Pagination'
import Download from './Download'
import GenderFilters from './GenderFilters'
import NationFilter from './NationFilter';


import './admin.css';

//initial states for the useReducer
const initialState = {
  gender: '',
  page: 1,
  nationality: '',
  showCountry: false,
  seed: 'Emerald',
  uname: '',
  showingUserDetail: false,
};

// Reducer function
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

    case 'update/uname': {
      const uname = action.payload;

      return { ...state, uname }
    }

    case 'view/show-country': {
      const showCountry = action.payload;

      return { ...state, showCountry };
    }

    case 'view/showing-detail': {
      const showingUserDetail = action.payload;

      return { ...state, showingUserDetail };
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

  const { gender, page, nationality, seed, showCountry, showingUserDetail, uname } = state;

  //getting data from restful Api
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
            {/* update the uname state with user input*/}
            <input
              type="text"
              name="search"
              value={uname}
              className="form-control-plaintext"
              placeholder="Find a user"
              onChange={(e) => dispatch({
                type: 'update/uname',
                payload: e.target.value
              })}
            />
          </div>

          {/* render GenderFilters component passing the gender props and updating the gender state.
             this queries the api based on gender
          */}
          <GenderFilters
            gender={gender}
            onGenderChange={(gender) =>
              dispatch({ type: 'update/gender', payload: gender })} />

        </div>

        <div className="col-sm-6 users-db">
          <p className="toggle-users">
            <b>
              <span className="text-capitalize">{gender || 'All'}</span> Users
            </b>
          </p>

         {/* renders NationFilter Component that contains the filter by name ,country and toggle country.*/}
          <NationFilter
            value={uname}
            filterNames={(name) => dispatch({
              type: 'update/uname',
              payload: name
            })}
            onNationChange={(country) => dispatch({
              type: 'update/nationality',
              payload: country
            })}
            onCountryChecked={(checked) => dispatch({
              type: 'view/show-country',
              payload: checked
            })}
          />

         {/* conditionally renders Users component based on the values in the uname state*/}
          {uname ? <Users
            users={data.filter(item => item.name.first.toLowerCase().includes(uname.toLowerCase()) ||
              item.name.last.toLowerCase().includes(uname.toLowerCase()))}
               loading={loading}
            showCountry={showCountry}
            onShowingUserDetail={(showingDetail) =>
              dispatch({ type: 'view/showing-detail', payload: showingDetail })} /> :
            <Users
              users={data}
              loading={loading}
              showCountry={showCountry}
              onShowingUserDetail={(showingDetail) =>
                dispatch({ type: 'view/showing-detail', payload: showingDetail })} />}

          {/* passes the absolutePath as a prop to the Download component to enable us download the users data. 
             Also passes the showingUserDetail state to determine if the button would be disabled or not
          */}
          <Download path={absolutePath} disable={showingUserDetail} />
 
          {/* renders Pagination component with page, previous, next and showingUserDetails states sent as props*/}
          <Pagination
            page={page}
            previous={() => dispatch({ type: 'page/previous' })}
            next={() => dispatch({ type: 'page/next' })}
            disable={showingUserDetail}
          />

        </div>
      </div>
    </div>
  );
}

export default Admin;
