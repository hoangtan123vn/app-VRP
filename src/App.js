import logo from './icon-xe.jpg';
import './App.css';
import { useState,useEffect} from 'react'
import { Routes, Route, Link, BrowserRouter,Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import Map from './Map'
import axios from 'axios'
import './interceptors/axios'


 
function App() {
  const negative = useNavigate();
  //const negative = useNavigate();
  const [show,setShow] = useState(false)
  const [ username,setEmail] = useState ('')
  const [ password, setPassword] = useState('')
  const [ success, setSuccess] = useState(false);
  const [ message,setMessage] = useState();
  const changeHandler = (event) =>{
    setEmail(event.target.value)
  }
  const changePasswordHandler = (event)=>{
    setPassword(event.target.value)
  }
  const loginHandler = async(event) =>{
   try{
    event.preventDefault();
    const article = {"username" : username,"password": password };
    const response = await axios.post('login', article);
     
    if(response) 
      setSuccess(true)
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      localStorage.setItem("accessToken",response.data.token);
      negative("/map")
      alert('Đăng nhập thành công')  
  } 
    catch(error){
      setMessage('Đăng nhập thất bại')
       alert('Đăng nhập thất bại')
    }
  }
  return (
      <div className="container">
          <form id='form-login' onSubmit={loginHandler} >
          <h1>Transport</h1>
              
              <input className ='form-username'
                type='text' 
                placeholder='Tên đăng nhập' 
                value={username}
                onChange ={changeHandler}
              >   
              </input>
              
              <input className ='form-password'
              placeholder='Mật khẩu'
              type= 'password'
              value= {password}
              onChange = {changePasswordHandler}
              >
              
              </input>
              <button className ='form-button'
                type='submit'
                onClick={()=>{setShow(!show)}}
              >
                Đăng nhập
              </button>
              {/* Token id: {articleId} */}
              <div className="card-body"> 
              {message}
              <img id="icon-xe" src={logo} alt=""/> 
                  
          </div>
          {success && <Map/>}
          </form>    
         
          </div>    
  );
}

export default App;
