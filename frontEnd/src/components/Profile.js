import {useEffect, useState} from 'react';
import Login from '../Login.js';
const ProfilePage = () =>{
    const [userPosts, setUserPosts]=useState([]);
    const [authenticated, setAuthenticated]=useState(false);
    const accountToken= localStorage.getItem("accountToken");
    useEffect(()=>{
        if (accountToken){
            setAuthenticated(true);
            fetchPosts();
        }
    },[]);
    async function fetchPosts(){
        try{
            const response=await fetch(`http://localhost:3000/api/users/me`)

        }catch (error){
            console.log(error)
        }
    }
}

//INCOMPLETE