import React from 'react'
import { FaUsers } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import cc from 'classcat';

function GenderFilters({gender, onGenderChange}) {
    return(
        <>
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
                onClick={() => onGenderChange('')}
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
                onClick={() => onGenderChange('male')}
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
                onClick={() => onGenderChange('female')}
              >
                <FaUser className="svg1" />
              </button>
              <p className="admin-user">Female Users</p>
            </div>
          </div>
        </>
    )
}

export default GenderFilters