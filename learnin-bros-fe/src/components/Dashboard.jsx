import React, {useState, useEffect} from 'react';
import axios from 'axios';
import axiosLoginAuth from '../utils/axiosLoginAuth';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      height: 400,
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  
  function Dashboard() {
      
      const [posts, setPosts] = useState([{}])
      const [contributions, setContributions] = useState([{}])
      
      const user = localStorage.getItem("user")
      
      const classes = useStyles();
      
      useEffect (() => {
          axiosLoginAuth()
          .get("/posts")
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
    function renderRow(props) {
    const { index, style } = props;
    console.log(posts)
    return (
        <div>
        {posts.map(post => (
        <ListItem button style={style} key={post.id}>
        <ListItemText primary={post.post} />
        </ListItem> 
        ))}
        </div>
    );
    }
    
    renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
    };

    useEffect (() => {
        axiosLoginAuth()
            .get("/contributions")
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

        console.log(sully_total_contributions)

    console.log('posts', posts)
    return (
        <div className="Dashboard">
            <div className="Rank">
                <h2>
                    Sully: {sully_total_contributions}
                </h2>
                <h2>
                    Colt: {colt_total_contributions}
                </h2>
                <h2>
                    Jake: {jake_total_contributions}
                </h2>
            </div>
            <div className={classes.root}>
                <FixedSizeList height={400} width={300} itemSize={46} itemCount={200}>
                    {renderRow}
                </FixedSizeList>
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