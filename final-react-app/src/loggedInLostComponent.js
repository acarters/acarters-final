import React, { Component } from 'react';
import './index.css';

export default class LoggedInLostComponent extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {prevHighScore: this.props.highScore};
    }
    componentDidMount()
    {
        if(this.props.highScore < this.props.score)
        {
            this.props.setHighScore();
        }
        const replayBtn = document.querySelector('.replayBtn');
        replayBtn.addEventListener('click', (event) =>
        {
            this.props.getNewPosts();
            this.props.getNewTweets();
            this.props.handleLoss(false);
            this.props.handleCallback("replay");
        });
        const homeBtn = document.querySelector('.homeBtn');
        homeBtn.addEventListener('click', (event) =>
        {
            this.props.getNewPosts();
            this.props.getNewTweets();
            this.props.handleLoss(false);
            this.props.handleCallback("home");
        });
    }  
    renderNewHighScore()
    {
        if(this.state.prevHighScore < this.props.highScore)  
        {
            this.props.postHighScoreToReddit(this.props.highScore, this.state.prevHighScore, this.props.user.email);
            return (<div>
            <p className = "newRecord">New Record!</p>
            <p className = "newRecordSubtitle">Previous High Score: {this.state.prevHighScore} </p></div>);
        }
    }
    render()
    { 

        return (<div className = "lost"> 
        <p className = "loginState">Logged in as: {this.props.user.email}</p>
        <p className = "headertitle"> You Lost! </p>
        <p className = "headersubtitle"> Score: <strong>{this.props.score}</strong> &nbsp;&nbsp;&nbsp;&nbsp; Your High Score: <strong>{this.props.highScore}</strong></p>
        {this.renderNewHighScore()}
        <p><button className = "replayBtn">Play Again!</button> <button className = "homeBtn">Back to Home</button></p>
        </div>);
    }
}