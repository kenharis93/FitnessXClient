import React, { useEffect, useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tabs from '@material-ui/core/Tabs';
import LinkTab from '@material-ui/core/Tab';
import TokenContext from '../contexts/TokenContext';
import PropTypes from 'prop-types';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    background: 'black'   
  },
}));

function Header(props) {
  const tokenContext = useContext(TokenContext);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const onLogout = () => {
    tokenContext.setToken('');
  }
  function handleChange(event, newValue) {
    setValue(newValue);
  }

  if(!tokenContext.token){
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            FitnessX
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <LinkTab label="Home" component={Link} to="/"/>
          <LinkTab label="Exercises" component={Link} to="/excercises" />          
        </Tabs>
          </Typography>
          <Button color="inherit"component={Link} to="/register">Register</Button>
          <Button color="inherit"component={Link} to="/login">Login</Button>
        </Toolbar>
      </AppBar>

    </div>
  );}
  else{
    return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            FitnessX
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <LinkTab label="Home" component={Link} to="/"/>
          <LinkTab label="Exercises" component={Link} to="/excercises" />
          <LinkTab label="Dashboard" component={Link} to="/dashboard" />
        </Tabs>
          </Typography>
          <Button color="inherit" onClick={onLogout}>Log Out</Button>        
        </Toolbar>
      </AppBar>

    </div>
  );
  }
}

export default Header;
