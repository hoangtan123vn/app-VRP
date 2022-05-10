import axios from "axios";
import React, {useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import '../interceptors/axios';

export default function Profile() {
    const [username,setUsername] = useState('');
    const negative = useNavigate();
    const logout = () => {
        negative("/")
        localStorage.removeItem("accessToken")
        alert("Logout Successful")
    }
    useEffect(()=>{
        (async ()=> {
            const respone = await axios.get('userinfo');
            //console.log(respone.data.username);
            setUsername(respone.data.username);
            
        })();

    },[]);

    return (
    <>
        <h1>Hello {username}</h1>  
        <button type="button" onClick={logout}>Logout</button>
    </>
  )
}
