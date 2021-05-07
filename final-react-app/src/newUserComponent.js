import React, { Component } from 'react';
import './index.css';

export default class newUserComponent extends Component 
{
    componentDidMount()
    {
        const createNewUserBtn = document.querySelector('.createNewUserBtn');
        createNewUserBtn.addEventListener('click', (event) =>
        {
            const email = document.querySelector('.newEmailText').value;
            const password = document.querySelector('.newPasswordText').value;
            this.props.createNewUser(email,password);
        });
        const homeBtn = document.querySelector('.homeBtn');
        homeBtn.addEventListener('click', (event) =>
        {
            this.props.handleCallback("home");
        });
    }
    
    render()
    {
        return (<div className = "newUser">
            <p className = "newUserLabel">Create New User</p>
            <p className = "newEmailLabel">Email: <input type="email" className = "newEmailText"></input></p>
            <p className = "newPasswordLabel">Password: <input type="password" className = "newPasswordText"></input></p>
            <p><button className = "createNewUserBtn">Create New User</button> <button className = "homeBtn">Back To Home</button></p>
            <p className = "error">{this.props.error}</p>
            </div>);
    }
}