
//INCOMPLETE REVIEW PLEASE

import {useEffect,useState} from 'react';
const HomePage=(props)=>{
    const[Data,setData] = useState([]);
    useEffect(()=>{
        if(localStorage.getItem('accountToken')){
            props.setLogin(true)
        }
        else{
            props.setLogIn(false)
        }
    },[])
    useEffect(()=>{
        async function fetchData(){
            try{
                const accountToken = localStorage.getItem("accountToken");
                const response = await fetch("http://localhost:3000/",{
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accountToken}`
                    }
                });
                const {Data}=await response.json();
                setData(Data.posts);
                console.log(Data);
            }catch(error){
                console.log(error)
            }
        }
        fetchData()
    },[]);
}
return(
    <div>
        <section>
            {Data.length ? Data.map ((post)=> {
                return(<p>{post.username} {post.name}{post.description}</p>)
            }):null}
        </section>
    </div>
)
export default HomePage