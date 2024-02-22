import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LoginModal from './Login';

export default function HorizontalList() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status on component mount
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const savedLoginStatus = localStorage.getItem('loggedIn');
    if (savedLoginStatus === 'true') {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
    setAnchorEl(null); // Close menu after logout
  };

  return (
    <Box component="nav" aria-label="My site" sx={{ flexGrow: 1 }} className="navbar">
      <List role="menubar" sx={{ display: 'flex', flexDirection: 'row' }}>
        <ListItem>
          <ListItemButton
            role="menuitem"
            component="a"
            href="/home"
            aria-label="Home"
          >
            <HomeIcon />
          </ListItemButton>
        </ListItem>
        <Divider orientation="vertical" flexItem />
        <ListItem>
          <ListItemButton role="menuitem" component="a" href="#horizontal-list">
            Books
          </ListItemButton>
        </ListItem>
        <Divider orientation="vertical" flexItem />
        <ListItem>
          <ListItemButton role="menuitem" component="a" href="#horizontal-list">
            Blog
          </ListItemButton>
        </ListItem>
        <Divider orientation="vertical" flexItem />
        {!loggedIn ? (
          <ListItem sx={{ marginLeft: 'auto' }}>
            <ListItemButton
              role="menuitem"
              aria-label="User Actions"
              onClick={() => setLoginModalOpen(true)}
            >
              <PersonIcon />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem sx={{ marginLeft: 'auto' }}>
            <ListItemButton
              role="menuitem"
              aria-label="Logout"
              onClick={handleLogout}
            >
              Logout
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!loggedIn && <MenuItem onClick={() => setLoginModalOpen(true)}>Login</MenuItem>}
      </Menu>
      <LoginModal open={loginModalOpen} onClose={handleLoginModalClose} />
    </Box>
  );
}
