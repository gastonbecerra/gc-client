// import React from 'react'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import { MdMenu as MenuIcon}  from "react-icons/md";
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

const pages = ['Sign Up', 'Sign In', 'Logout'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Header () {
  let history = useHistory();
  const { username, id: user_id, picture} = useSelector(state => state.user)
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
           GetContext()
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {settings.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  <Link to={page === 'Sign Up'? '/signup' : page === 'Sign In' ? '/signin' : null}
                    style={{
                        textDecoration: 'none', 
                        color: 'black',
                    }}
                  >
                        {page}
                    </Link>                  
                    </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
          <Link to={'/'} style={{textDecoration: 'none', color: 'white'}}>
                GetContext( )
          </Link>
            </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {settings.map((setting) => (
              <Button
                key={setting}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {setting}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {picture ? 
                    <img src={picture}
                    style={{  
                        borderRadius: '50%',
                        maxWidth:'50%',
                        maxHeight: '50%'                         
                    }}
                />
                        :
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  }
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Link to={page === 'Sign Up'? '/signup' : page === 'Sign In' ? '/signin' : '/logout'}
                    style={{
                        textDecoration: 'none', 
                        color: 'black',
                    }}
                    onClick={() => handleLogout(page)}
                  >
                  <Typography textAlign="center">{page}</Typography>
                
                    </Link>        
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
// import { Navbar, Container, NavDropdown } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { AiOutlineHome } from "react-icons/ai";

// export default function Header() {
//     const { username, id: user_id, picture} = useSelector(state => state.user)

//     return ( 
//         <Navbar expand="lg" variant="light" bg="light">
//             <Container>
//             <Navbar.Brand ><AiOutlineHome id="icon-header"/><Link style={{textDecoration: 'none', color: 'black', fontWeight:'650'}} to={"/"}>Get Context( )</Link></Navbar.Brand>
//             <span style={{position:'absolute', top:'4.3vh'}}>{username && username} {user_id && user_id}</span> 
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav"  >
//             <NavDropdown title="Menú" id="basic-nav-dropdown">
//             <img className="justify-content-end" src={picture}
//                     style={{                        
//                         borderRadius: '50%',
//                         top: '10px',
//                         height: '100%' 
                        
//                         }}
//                 />
//                 <NavDropdown.Item>
//                     <Link to={"/signin"} style={{textDecoration: 'none', color: 'black'}}>Sign In</Link>
//                 </NavDropdown.Item>
//                 <NavDropdown.Item>
//                     <Link to={"/signup"} style={{textDecoration: 'none', color: 'black'}}>Sign Up</Link>
//                 </NavDropdown.Item>
//                 <NavDropdown.Item>
//                     <Link to={"/logout"} style={{textDecoration: 'none', color: 'black'}}>Logout</Link>
//                 </NavDropdown.Item>
//             </NavDropdown>
//             </Navbar.Collapse>
//             </Container>
//         </Navbar>        
//     )
// }
