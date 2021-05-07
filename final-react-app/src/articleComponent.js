import React, { Component } from 'react';
import './index.css';

export default class ArticleComponent extends Component 
{
    componentDidMount()
    {
        const newsSiteBtn = document.querySelector(`#${"btn" + this.props.position}`);
        newsSiteBtn.addEventListener('click', (event) =>
        {
            window.open(this.props.article.link);
        });
    }
    renderMedia()
    {

    }
    render()
    {
        return (<div className = "newsArticle">
            <p className = "articleBtn"><button className = "articleBtn" id = {"btn" + this.props.position}></button> </p>
            <p className = "articleAuthor">by {this.props.article.author}</p>
            <p className = "articleTitle">{this.props.article.title}</p>
            <img src = {this.props.article.media} alt = 'previewArticle' className = "articleImg"></img>
            <p className = "publication">{this.props.article.clean_url}</p>
            </div>);
    }
}