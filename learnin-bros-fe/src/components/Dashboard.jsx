import React, {useState, useEffect} from 'react';
import axios from 'axios';
import axiosLoginAuth from '../utils/axiosLoginAuth';


function Dashboard() {

    const [posts, setPosts] = useState([{}])

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

    console.log('posts', posts)
    return (
        <div className="Dashboard">
            {posts.map(data => (
                <>
                    <h2>{data.user_name}</h2>
                    <p>{data.post}</p>
                </>
            ))}
        </div>
    );
  }
  
  export default Dashboard;