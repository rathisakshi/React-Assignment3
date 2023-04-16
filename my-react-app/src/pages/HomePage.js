import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Contacts from '../Component/view';
import "./css/Home.css"

const Home =() => {

    return (


            <div className={'container'}>
                <h1>Contacts</h1>
                <Contacts />
                <Link to="/NewContact">
                <button className='home-btn' > Create Contact</button>
                </Link>
            </div>

    )
}

export default Home;