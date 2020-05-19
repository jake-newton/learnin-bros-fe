import React from 'react';
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

const lang = 'German.'

function Landing() {
    return (
        <div className="Landing">
            <div className="LandingTop">
                <img className='mainlogo' src={require("../images/bros-logo-black.png")}></img>
                <div className="LandingTopText">
                    <h1>Welcome to Language Bros.</h1>
                    <p>Language Bros allows you to track and display your level of contribution to the current language bros language.
                    
                    </p>
                </div>
            </div>
            <div className="LandingBottom">
                <h2>Current Language Bros language: {lang}</h2>
                <img className='LangFlag' src={require("../images/german-flag.png")}></img>
            </div>
        </div>
    );
  }
  
  export default Landing;