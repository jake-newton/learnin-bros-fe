import React, {useState} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axiosLoginAuth from '../utils/axiosLoginAuth';
import { createMuiTheme } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        c-r-sullivan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: "center",
    '& label.Mui-focused': {
        color: myTheme.palette.secondary.dark,
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: myTheme.palette.secondary.light,
        },
      },
    
  },
  main: {
    // height:'60%',
    margin: theme.spacing(8, 10, 8, 20),
    maxWidth: '30%',
  },
//   image: {
//     marginLeft:'5%',
//     backgroundRepeat: 'no-repeat',
//     backgroundColor:
//       theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',

//   },
  paper: {
    margin: theme.spacing(8, 8, 8),
    display: 'flex',
    flexDirection: 'column',
  },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: myTheme.palette.secondary.main,
    '&:hover': {
        backgroundColor: myTheme.palette.secondary.light,
     },
  },
}));

const Register = (props) => {
        const [user, setUser] = useState({ "name": '', "password": ''})
    
    const changeHandler = event => {
        event.preventDefault();
        setUser({...user, [event.target.name]: event.target.value })
    }
    
    
    const handleSubmit = event => {
        event.preventDefault();
    
        axios
            .post("https://learnin-bros.herokuapp.com/auth/register", user)
            .then( result => {
              console.log("user", user)
              console.log("result", result)
              setUser({name: '', password: ''})
              axiosLoginAuth()
                .post("/auth/login", user)
                .then(result => {
                console.log(result)
                localStorage.setItem("token", result.data.token);    
                setUser({ name: '', password: ''})
                props.onChange();
                props.history.push("/intercept")
                  })
                  .catch(error => {
                    console.log(error)
                    alert("Name and/or Password not recognized, please try again", error)
                })
            })
            .catch(error => {
              console.log(error)
              alert("Username already exists please login to continue", error)
            })
            
                 }
  const classes = useStyles();

  

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid className={classes.main} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create Your Account
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Username"
              name="name"
              type="name"
              autoComplete="name"
              autoFocus
              onChange={changeHandler}
              color={myTheme.palette.secondary.light}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={changeHandler}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      {/* <img className={classes.image} src={require("../images/bros-logo-black.png")} alt="Omega2020 theme" /> */}
    </Grid>
  );
}

export default Register
