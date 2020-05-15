import React from 'react'
import { FaRegEnvelope } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

import './userlist.css'

function UserList({ user, handleClick }) {

    return (
        <div className='user-list'>
            <button type='button' className='btn ul-p' onClick={() => handleClick()}><FaArrowLeft className='ul-svg' /> RESULTS</button>
            <div className='row ul'>
                <div className='ul-img'>
                    <img src={user.picture.large} className='ul-logo' alt={user.name.first} />
                </div>

                <div className='ul-details'>
                    <p className='ul-heading'><b>{user.name.title} {user.name.first} {user.name.last} </b><span className='span'> {user.dob.age}</span></p>
                    <p className='ul-address'> {`
              ${user.location.street.number} ${user.location.street.name}, ${
                        user.location.city
                        } ${user.location.state}${user.location.country}`}</p>
                <p className='ul-email'><FaRegEnvelope className='svg2' /> {user.email}</p>
                <p className='ul-register'>JOINED: {user.registered.date}</p>
                <p className='ul-phone'> <FiPhoneCall className='ul-svg2' /> {user.phone}</p>
                <p className='ul-phone'> <MdPhoneIphone className='ul-svg2' /> {user.cell}</p>

            </div>
        </div>
        <button type='button' className='btn download-btn' disabled= {true}><FaCloudDownloadAlt className='download-svg'/> Download results</button>
        <ul class="pagination">
            <li class="page-item page-link pag1 disabled"><MdKeyboardArrowLeft className='my-svg'/></li>
            <li class="page-item page-link pag2 disabled"><MdKeyboardArrowRight className='svg1' /></li>
        </ul>
        </div>
    )


}
export default UserList