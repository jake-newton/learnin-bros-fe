import React, {useState} from 'react';
import axiosLoginAuth from '../utils/axiosLoginAuth';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


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
        '& label.Mui-focused': {
            color: myTheme.palette.secondary.dark,
          },
          '& .MuiInput-underline:after': {
            borderBottomColor:myTheme.palette.secondary.light,
          },
    
    },

    button: {
        backgroundColor: myTheme.palette.secondary.main,
        '&:hover': {
            backgroundColor: myTheme.palette.secondary.light,
         },
    },

  
}));

function Landing(props) {
    const [count, setCount] = useState({ "contribution_count": Number })

    const changeHandler = event => {
        event.preventDefault();
        setCount({[event.target.name]: parseInt(event.target.value) })
    }

    const name = localStorage.getItem("user")
    const classes = useStyles();

    const handleSubmit = event => {
        event.preventDefault();
        console.log(count);
        axiosLoginAuth()
           .post("/contributions/new", count)
           .then(result => {
           console.log(result)
           props.history.push("/dashboard")
       })
       .catch(error => {
         console.log(error)
         alert( error)
     })
   
   }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div className="Intercept">
                <h1 className="Contributions">
                    Welcome {name}! If this is your first time here, how many times (just estimate) have you studied the chosen language so far?<br></br> If not, welcome back. How many times have you studied since your last Login?
                </h1>
            </div> 
            <form onSubmit={handleSubmit} className="ContInput">
                <TextField
                    className='numField'
                    id="standard-number"
                    label="Number"
                    type="number"
                    name="contribution_count"
                    onChange={changeHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button type="submit" className={classes.button} variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </form>
    );
  }
  
  export default Landing;