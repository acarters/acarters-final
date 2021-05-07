import React, { Component } from 'react';
import './index.css';
import RedditComponent from './redditComponent';
import ArticleComponent from './articleComponent';

export default class HomeComponent extends Component 
{
    componentDidMount()
    {
        const guestBtn = document.querySelector('.guestBtn');
        guestBtn.addEventListener('click', (event) =>
        {
            this.props.handleCallback("snake");
        });
        const loginBtn = document.querySelector('.loginBtn');
        loginBtn.addEventListener('click', (event) =>
        {
            const email = document.querySelector('.emailText').value;
            const password = document.querySelector('.passwordText').value;
            this.props.signIn(email, password);
        });
        const createAccBtn = document.querySelector('.createAccBtn');
        createAccBtn.addEventListener('click', (event) =>
        {
            this.props.handleCallback("newUser");
        });
    }
    renderRedditPost(num)
    {
        if (!(this.props.redditPosts[num] === undefined))
        {
            return (<RedditComponent redditPost = {this.props.redditPosts[num]} postId = {this.props.redditPosts[num].id} position = {num}/>);
        }
    }
    renderArticle(num)
    {
        if (!(this.props.articles[num] === undefined))
        {
            return (<ArticleComponent article = {this.props.articles[num]} position = {num}/>);
        }
    }
    render()
    {
        return (<div> 
            <div className = "login">
            <p className = "loginLabel">Login</p>
            <p className = "emailLabel">Email:&nbsp; <input type="email" className = "emailText"></input></p>
            <p className = "passwordLabel">Password:&nbsp; <input type="password" className = "passwordText"></input></p>
            <p><button className = "loginBtn">Login</button> <button className = "createAccBtn">I need a New Account</button></p>
            <p className = "error">{this.props.error}</p>
            </div>
            <div className = "guestPosts">
            <p className = "redditLabel"><strong>Recent Reddit Posts</strong></p>
            {this.renderRedditPost(0)}
            {this.renderRedditPost(1)}
            {this.renderRedditPost(2)}
            {this.renderRedditPost(3)}
            {this.renderRedditPost(4)}
            {this.renderRedditPost(5)}
            {this.renderRedditPost(6)}
            {this.renderRedditPost(7)}
            </div>
            <div className = "playGuestDiv">
            <p className = "headertitle"> Snake! </p>
            <p><button className = "guestBtn">Play as Guest</button></p>
            <p className = "guestWarning">(High Scores cannot be saved when playing as a guest)</p>
            </div>
            <div className = "guestArticles">
            <p className = "articleLabel">Recent News Articles About Snakes</p>
            {this.renderArticle(0)}
            {this.renderArticle(1)}
            {this.renderArticle(2)}
            </div>
            <div className = "tutorialDiv">
            <p className = "tutorialLabel" >How To Play: </p>
            <p className = "tutorialText">Use the Arrow Keys or WASD to move the snake. The snake will then continue to move in that direction until the direction is changed. Collect the yellow pellets to increase your score. Each time a pellet is collected, the snake will get longer. Try to collect as many as you can without hitting the wall or your own tail!</p>
            <p className = "tutorialText"> Login or sign up to have your high scores tracked, recorded and posted to the r/superultrasnake subreddit.</p>
            </div>
        </div>);
    }
}