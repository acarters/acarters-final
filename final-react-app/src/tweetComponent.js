import React, { Component } from 'react';
import './index.css';

export default class TweetComponent extends Component 
{
    render()
    {
        return (<div className = "tweet">       
        <p></p>
        <p className = "redditAuthor">by {this.props.tweet.author}</p>
        <p className = "tweetBody">{this.props.tweet.body}</p>
            <p className = "stats"><strong>{this.props.tweet.likeCount}</strong> Likes <strong>{this.props.tweet.retweetCount}</strong> Retweets <strong>{this.props.tweet.replyCount}</strong> Replies</p>
        </div>);
    }
}