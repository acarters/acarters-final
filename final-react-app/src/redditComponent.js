import React, { Component } from 'react';
import './index.css';

export default class RedditComponent extends Component 
{
    componentDidMount()
    {
        const redditBtn = document.querySelector(`#${this.props.postId}`);
        redditBtn.addEventListener('click', (event) =>
        {
            window.open("https://www.reddit.com" + this.props.redditPost.permalink);
        });
    }
    renderMedia()
    {
        if(this.props.redditPost.selftext !== "")
        {
            return (<p className = "redditSelftext">{this.props.redditPost.selftext}</p>);
        }
        else if(this.props.redditPost.url !== "")
        {
            return (<img src = {this.props.redditPost.url} alt = 'reddit post' className = "redditImg"></img>);
        }
    }
    render()
    {
        return (<div className = "redditPost">
            <p className = "redditBtn"><button className = "redditBtn" id = {this.props.postId}></button> </p>
            <p className = "redditAuthor">by {this.props.redditPost.author.name}</p>
            <p className = "redditTitle">{this.props.redditPost.title}</p>
            {this.renderMedia()}
            </div>);
    }
}