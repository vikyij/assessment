import React, { useReducer } from 'react';
import { useGet } from 'restful-react';
import { FaSearch } from 'react-icons/fa';


import Users from './Users';
import Pagination from './Pagination'
import Download from './Download'
import GenderFilters from './GenderFilters'
import NationFilter from './NationFilter';


import './admin.css';

const initialState = {
  gender: '',
  page: 1,
  nationality: '',
  showCountry: false,
  seed: 'Emerald',
  showingUserDetail: false,
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

  const { gender, page, nationality, seed, showCountry, showingUserDetail} = state;

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
     <GenderFilters 
         gender={gender} 
         onGenderChange={(gender) => 
                         dispatch({type: 'update/gender', payload: gender})}/>
          
        </div>

        <div className="col-sm-6 users-db">
          <p className="toggle-users">
            <b>
              <span className="text-capitalize">{gender || 'All'}</span> Users
            </b>
          </p>
          
          <NationFilter 
              onNationChange ={(country) => dispatch({
                          type: 'update/nationality',
                          payload: country
              })}
              onCountryChecked = {(checked) => dispatch({
                            type: 'view/show-country',
                            payload: checked
              })}
              />

          <Users 
                users={data} 
                loading={loading} 
                showCountry={showCountry} 
                onShowingUserDetail={(showingDetail) =>
                 dispatch({ type: 'view/showing-detail', payload: showingDetail })} />

          <Download path={absolutePath} disable={showingUserDetail}/>
     
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
