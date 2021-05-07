import React, { Component } from 'react';
import './index.css';
import RedditComponent from './redditComponent';
import ArticleComponent from './articleComponent';

export default class LoggedInHomeComponent extends Component 
{
    componentDidMount()
    {
        const guestBtn = document.querySelector('.guestBtn');
        guestBtn.addEventListener('click', (event) =>
        {
            this.props.handleCallback("snake");
        });
        const logOutBtn = document.querySelector('.logOutBtn');
        logOutBtn.addEventListener('click', (event) =>
        {
            this.props.logOut();
        });
        const greenBtn = document.querySelector('.greenBtn');
        greenBtn.addEventListener('click', (event) =>
        {
            this.props.setColor("green");
            this.props.getColor();
            this.setState({color: "Green"});
        });

        const orangeBtn = document.querySelector('.orangeBtn');
        orangeBtn.addEventListener('click', (event) =>
        {
            this.props.setColor("orange");
            this.props.getColor();
            this.setState({color: "Orange"});
        });

        const blueBtn = document.querySelector('.blueBtn');
        blueBtn.addEventListener('click', (event) =>
        {
            this.props.setColor("blue");
            this.props.getColor();
            this.setState({color: "Blue"});
        });
        const pinkBtn = document.querySelector('.pinkBtn');
        pinkBtn.addEventListener('click', (event) =>
        {
            this.props.setColor("pink");
            this.props.getColor();
            this.setState({color: "Pink"});
        });
        const canesBtn = document.querySelector('.canesBtn');
        canesBtn.addEventListener('click', (event) =>
        {
            this.props.setColor("canes");
            this.props.getColor();
            this.setState({color: "Canes"});
        });
        const heelsBtn = document.querySelector('.heelsBtn');
        heelsBtn.addEventListener('click', (event) =>
        {
            this.props.setColor("heels");
            this.props.getColor();
            this.setState({color: "Heels"});
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
        return (<div className = "loggedInHome">
            <div className = "loggedInMsg"> 
            <p className = "loginState"> Logged in as: {this.props.user.email}</p>
            <p> <button className = "logOutBtn">Log Out</button> </p>
            </div>
            <div className = "posts">
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
            <div className = "colorMsg"> 
            <p className = "colorGen">Select Snake Color</p>
            <p><button className = "greenBtn"></button> <button className = "orangeBtn"></button> <button className = "blueBtn"></button> <button className = "pinkBtn"></button> <button className = "canesBtn"></button> <button className = "heelsBtn"></button></p>
            <p className = "currentColor"> Current Color: <i className = {this.props.color.replace(/^\w/, (c) => c.toUpperCase())}>{this.props.color.replace(/^\w/, (c) => c.toUpperCase())}</i></p>
            </div>
            <div className = "articles">
            <p className = "articleLabel">Recent News Articles About Snakes</p>
            {this.renderArticle(0)}
            {this.renderArticle(1)}
            {this.renderArticle(2)}
            </div>
            <div className = "playDiv">
            <p className = "headertitle"> Snake! </p>
            <p><button className = "guestBtn">Play Snake</button></p>
            <p className = "highScoreLabel" >Your High Score: {this.props.highScore}</p>
            </div>
            <div className = "tutorialDiv">
            <p className = "tutorialLabel" >How To Play: </p>
            <p className = "tutorialText">Use the Arrow Keys or WASD to move the snake. The snake will then continue to move in that direction until the direction is changed. Collect the yellow pellets to increase your score. Each time a pellet is collected, the snake will get longer. Try to collect as many as you can without hitting the wall or your own tail!</p>
            <p className = "tutorialText"> New high scores will be automatically posted to the r/superultrasnake subreddit. So try your best, and show off your skills for everyone to see!</p>
            </div>
        </div>);
    }
}