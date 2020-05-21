import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import axiosLoginAuth from '../utils/axiosLoginAuth';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import { FixedSizeList as List } from "react-window";
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import io from "socket.io-client";

const socket = io("https://learnin-bros.herokuapp.com", {
  transports: ["websocket", "polling"]
});

const useStyles = makeStyles((theme) => ({
    textField: {
        '& label.Mui-focused': {
            color: myTheme.palette.secondary.dark,
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: myTheme.palette.secondary.main,
            },
          },
    },

    button: {
        backgroundColor: myTheme.palette.secondary.main,
        '&:hover': {
            backgroundColor: myTheme.palette.secondary.light,
         },
    },
  }));

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
  
  function Dashboard(props) {
    const [posts, setPosts] = useState([{}])
    const [contributions, setContributions] = useState([{}])
    const [newPost, setNewPost] = useState({ "post": '' })

    
    const remote = useRef(false);

 
      const user = localStorage.getItem("user")
      
      const classes = useStyles();
      
      useEffect(() => {
        var socket = io("https://learnin-bros.herokuapp.com", {
        transports: ["websocket", "polling"]
        });
        socket.on("connection", data => {
        });
        var socket = io("https://learnin-bros.herokuapp.com/posts", {
        transports: ["websocket", "polling"]
        });
        socket.on("posts", data => {
            console.log('res', data)
            setPosts(data.data);
        });
      }, []);
      useEffect (() => {
          axios
          .get("https://learnin-bros.herokuapp.com/posts")
          .then(res => {
                    console.log("res:", res)
                    const posts = res.data;
                    setPosts(posts)
                    
                })
                .catch(error => {
                    console.log(error)
                    alert(error)
                })
                
            }, [])

        

    const Row = ({ index, style }) => (
        <div className="postDiv" style={style}>
            <p><strong className="postName">{posts[index].user_name + ':'}  </strong>{posts[index].post}</p><br></br>
            
        </div>
        );

    useEffect (() => {
        axios
            .get("https://learnin-bros.herokuapp.com/contributions")
                .then(res => {
                    console.log("res:", res)
                    const contributions = res.data;
                    setContributions(contributions)
                })
                .catch(error => {
                    console.log(error)
                    alert(error)
                })
            }, [])

    const changeHandler = event => {
        event.preventDefault();
        setNewPost({[event.target.name]: event.target.value })
    }


        const handleSubmit = event => {
            event.preventDefault();
            console.log(newPost);
            axiosLoginAuth()
                .post("/posts/new", newPost)
                .then(result => {
                console.log(result)
                window.location.reload();
            })
            .catch(error => {
                console.log(error)
                alert( error)
            })
        
        }

        let sully_total_contributions = 0
        let jake_total_contributions = 0
        let colt_total_contributions = 0

        contributions.forEach(cont => {
            if (cont.user_name == 'Sully') {
                sully_total_contributions += cont.contribution_count
            }
            if (cont.user_name == 'Jake') {
                jake_total_contributions += cont.contribution_count
            }
            if (cont.user_name == 'Colt') {
                colt_total_contributions += cont.contribution_count
            }
        })

        const contributors = {
            "Jake": jake_total_contributions,
            "Sully": sully_total_contributions,
           "Colt": colt_total_contributions
        }

        const contributionCounts = [sully_total_contributions, jake_total_contributions, colt_total_contributions]
        const topCont = Math.max(...contributionCounts)
        console.log('cont num', contributionCounts)
        console.log('topCont', topCont)
        console.log('contributors', contributors)
        
        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
          }
        
        const leader = getKeyByValue(contributors, topCont)
        

        

        console.log("current leader", leader)

    console.log('posts', posts)
    return (
        <div className="Dashboard">
            <div className="Rank">
                <h2>
                    Sully: {sully_total_contributions}
                    {leader == 'Sully' &&
                    <img className='leaderLogo' src={require("../images/bros-logo-orange.png")}></img>}
                </h2>
                <h2>
                    Colt: {colt_total_contributions}
                    {leader == 'Colt' &&
                    <img className='leaderLogo' src={require("../images/bros-logo-orange.png")}></img>}
                </h2>
                <h2>
                    Jake: {jake_total_contributions}
                    {leader == 'Jake' &&
                    <img className='leaderLogo' src={require("../images/bros-logo-orange.png")}></img>}
                </h2>
            </div>
            <div className="postsColumn">
                <List
                    className="List"
                    height={200}
                    itemCount={posts.length}
                    itemSize={35}
                    width={500}
                >
                    {Row}
                </List>
                <form onSubmit={handleSubmit} className="postSubmit">
                    <TextField
                        className={classes.textField}
                        id="outlined-textarea"
                        label="New Post"
                        placeholder="Post"
                        multiline
                        variant="outlined"
                        name="post"
                        onChange={changeHandler}
                    />
                    <Button type="submit" className={classes.button} variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
  }
  
  export default Dashboard;

//   {posts.map(data => (
//     <>
    
//         <h2>{data.user_name}</h2>
//         <p>{data.post}</p>
//     </>
// ))}