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
import { useLocation } from 'react-router-dom';

export default function HorizontalList() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const [selectedButton, setSelectedButton] = useState(null);

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
            sx={{
              '&:hover': {
                backgroundColor: '#CCB35C', // Change background color on hover
              },
              '&[href="/home"].Mui-selected': {
                backgroundColor: '#CCB35C', // Change background color when href is "/home" and selected
              },
            }}
            selected={location.pathname === '/home'} // Mark as selected if href matches current location
          >
            <HomeIcon />
          </ListItemButton>
        </ListItem>
        <Divider orientation="vertical" flexItem />
        <ListItem>
          <ListItemButton role="menuitem" component="a" href="/#books"
           sx={{
            '&:hover': {
              backgroundColor: '#CCB35C', // Change background color on hover
            },
            '&[href="/home"].Mui-selected': {
              backgroundColor: '#CCB35C', // Change background color when href is "#horizontal-list" and selected
            },
          }}
          selected={location.pathname === '/#books'} // Mark as selected if href matches current location
          >
            Books
          </ListItemButton>
        </ListItem>
        <Divider orientation="vertical" flexItem />
        <ListItem>
          <ListItemButton role="menuitem" component="a" href="/#blog"
           sx={{
            '&:hover': {
              backgroundColor: '#CCB35C', // Change background color on hover
            },
            '&[href="/home"].Mui-selected': {
              backgroundColor: '#CCB35C', // Change background color when href is "#horizontal-list" and selected
            },
          }}
          selected={location.pathname === '/#blog'} // Mark as selected if href matches current location
          >
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
              sx={{
                '&:hover': {
                  backgroundColor: '#CCB35C', // Change background color on hover
                },
                '&.Mui-selected': {
                  backgroundColor: '#CCB35C', // Change background color when selected
                },
              }}
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
              sx={{
                '&:hover': {
                  backgroundColor: '#CCB35C', // Change background color on hover
                },
                '&.Mui-selected': {
                  backgroundColor: '#CCB35C', // Change background color when selected
                },
              }}
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
