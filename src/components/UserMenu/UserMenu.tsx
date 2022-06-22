import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import {UserAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {useTranslation} from "react-i18next";

import './userMenu.scss'


export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const {logout}: any = UserAuth();
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user);
  const {t} = useTranslation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/sign-in");
    } catch (e: any) {
      console.log(e.message)
    }
  }

  return (
    <React.Fragment>
      <Box className={'user-menu-wrapper'}>
        <Tooltip title={t('USER_SERVICES.MY_ACCOUNT')}>
          <IconButton
            onClick={handleClick}
            size="small"
            className={'user-menu-icon-button'}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {user.photoURL
              ? <Avatar className={'user-menu-avatar'} src={user.photoURL}/>
              : <Avatar className={'user-menu-avatar'}>
                {user.displayName ? user.displayName[0] : user.email![0]}
              </Avatar>
            }
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem>
          <ListItemIcon>
            <PersonOutlineIcon fontSize="small"/>
          </ListItemIcon>
          {t('USER_SERVICES.MY_ACCOUNT')}
        </MenuItem>
        <Divider/>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small"/>
          </ListItemIcon>
          {t('USER_SERVICES.LOGOUT')}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
