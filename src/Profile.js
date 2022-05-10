import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
export default class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            "user" :{}
        }
    }

    logout = () =>{
        localStorage.removeItem("accessToken")
        alert("Logout Successful")
    }

    render(){
        return <div> <h1>Hello</h1>  
        <button type="button" onClick={this.logout}>Logout</button>
        </div>
    }
}