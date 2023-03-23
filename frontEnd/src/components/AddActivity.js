import {useState} from 'react';
const fetchData=async ()=>{
    try{
        const accountToken = localStorage.getItem('accountToken');
        const response = await fetch('http://locahost:3000:/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accountToken}`
            }
        });
        const {data} = await response.json();
        return data.posts
    }catch (error){
        console.log(error);
    }
}
const ProductForm=()=>{
    const [Name,setName]=useState("")
    const [Description,setDescription]=useState('')
    async function createNewPost(event){
        event.preventDefault();
        console.log('createNewPost');
        console.log(accountToken)
        try{
            const response = await fetch ('http://localhost:3000:/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorizatition': `Bearer ${accountToken}`
                },
                body: JSON.stringify({
                    post: {
                        name: Name,
                        description: Description
                    }
                })
            });
            const result = await response.json();
            console.log(result);
            fetchData();
            return result;

        }catch(error){
            alert("An unexpected error has occured")
        }
    }
}
//INCOMPLETE