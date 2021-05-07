import React, { Component } from 'react';
import './index.css';

export default class LostComponent extends Component 
{
    componentDidMount()
    {
        const replayBtn = document.querySelector('.replayBtn');
        replayBtn.addEventListener('click', (event) =>
        {
            this.props.handleLoss(false);
            this.props.getNewPosts();
            this.props.handleCallback("replay");
        });
        const homeBtn = document.querySelector('.homeBtn');
        homeBtn.addEventListener('click', (event) =>
        {
            this.props.handleLoss(false);
            this.props.getNewPosts();
            this.props.handleCallback("home");
        });
    }  
    render()
    {       
        return (<div className = "lost"> 
        <p className = "headertitle"> You Lost! </p>
        <p className = "headersubtitle"> Score: {this.props.score}</p>
        <p><button className = "replayBtn">Play Again!</button> <button className = "homeBtn">Back to Home</button></p>
        </div>);
    }
}