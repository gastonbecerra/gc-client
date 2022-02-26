// import React from 'react'
import * as React from 'react';
import './header.scss'
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

const pages = ['Sign Up', 'Sign In', 'Logout'];

export default function Header () {
  let history = useHistory();
  const { username, id: user_id, picture} = useSelector(state => state.user)

  const handleLogout = (page) => {
    console.log(page);
    // page === 'Logout' && fetch('/logout')
    if(page === 'Logout') 
    fetch('/logout')
    .then(()=>{
        window.location.reload();
    })
  }

  return (
    <div id='header'>
      <div id='left-header'>
        <Link style={{textDecoration: 'none'}} to={'/'}><h1 style={{textDecoration: 'none', color: 'white'}}>Get Context( )</h1></Link>
      </div>
      
      <div id='center-header'>
        <Link to={'/signin'} className='link-header'> Login <span>&nbsp;</span></Link>
        <Link to={'/signup'} className='link-header'>| SignUp <span>&nbsp;</span></Link>        
        <Link to={'/logout'} className='link-header'>| Logout</Link>
      </div>

      <div id='right-header'>          
        {picture ? 
          <div className="dropdown">
          <img src={picture} alt="user" />
          <div className="dropdown-content">
          {pages.map((page, i) => (                
              <Link to={page === 'Sign Up'? '/signup' : page === 'Sign In' ? '/signin' : '/logout'}
                  style={{
                      textDecoration: 'none', 
                      color: 'black',
                      textAlign:'left'
                  }}
                  onClick={() => handleLogout(page)}
                  key={i}
                >
                <Typography textAlign="left">{page}</Typography>
              </Link>                        
                ))}
          </div>
        </div>
              :
          
          <div className="dropdown">
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" 
          style={{  
              borderRadius: '50%',  
          }}
          />
          <div className="dropdown-content">
          {pages.map((page, i) => (                
              <Link to={page === 'Sign Up'? '/signup' : page === 'Sign In' ? '/signin' : '/logout'}
                  style={{
                      textDecoration: 'none', 
                      color: 'black',
                      textAlign:'left'
                  }}
                  onClick={() => handleLogout(page)}
                  key={i}
                >
                <Typography textAlign="left">{page}</Typography>
              </Link>                        
                ))}
          </div>
        </div>
        }
      </div>

      </div>
  );
};
