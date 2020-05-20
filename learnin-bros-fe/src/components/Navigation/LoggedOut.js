import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { red, grey, blue, green } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const myTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffc246',
      main: '#ff9100',
      dark: '#c56200',
      contrastText: '#000',
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  appBar : {
    backgroundColor: myTheme.palette.primary.main,
    // position: "absolute",
    display:'flex',
  },
  appButtons : {
    // marginLeft: theme.spacing(20)
},

regButton : {
    // marginLeft: theme.spacing(150),
    // paddingLeft: theme.spacing(50),
    '&:hover': {
        color: myTheme.palette.secondary.light,
     },
},
logButton : {
    marginLeft: theme.spacing(4),
    '&:hover': {
        color: myTheme.palette.secondary.light,
     },
}
}));

function goToLanding() {
    window.location.assign('http://localhost:3000/');
  }

function goToReg() {
  window.location.assign('http://localhost:3000/register');
}

function goToLog() {
    window.location.assign('http://localhost:3000/login');
  }

function LoggedOut() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar  className={classes.appBar} color='primary' position="static">
        <Toolbar className={classes.appButtons}>
          <h3 onClick={goToLanding} className="navTitle">LanguageBros</h3>
          {/* <img onClick={goToLanding} className='logo' src={require("../images/bros-logo-orange.png")}> */}
          {/* </img> */}
          <Button onClick={goToReg} className={classes.regButton} color="inherit">Register</Button>
          <Button onClick={goToLog} className={classes.logButton} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default LoggedOut;