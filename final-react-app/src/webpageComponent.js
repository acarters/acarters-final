import React, { Component } from 'react';
import './index.css';
import SnakeComponent from './snakeComponent';
import HomeComponent from './homeComponent';
import LostComponent from './lostComponent';
import NewUserComponent from './newUserComponent';
import LoggedInHomeComponent from './loggedInHomeComponent';
import LoggedInSnakeComponent from './loggedInSnakeComponent';
import LoggedInLostComponent from './loggedInLostComponent';
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import "snoowrap";
export default class WebpageComponent extends Component 
{
    constructor(props)
    {
        super(props);
        this.getArticles();
        const firebaseConfig = {
            apiKey: "AIzaSyBz9ujqj95W8jtcgKM6aZn9fumtZMAHMq8",
            authDomain: "super-ultra-snake.firebaseapp.com",
            databaseURL: "https://super-ultra-snake-default-rtdb.firebaseio.com",
            projectId: "super-ultra-snake",
            storageBucket: "super-ultra-snake.appspot.com",
            messagingSenderId: "616813655171",
            appId: "1:616813655171:web:9d508e978880a9ad1c17b6",
            measurementId: "G-J3KNZFJ878"
        };
        if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        }
        const snoowrap = require('snoowrap');
        const r = new snoowrap({
            userAgent: "Super Ultra Snake by Carter Scott",
            clientId: 'JD44-8fxhHXO9w',
            clientSecret: 'oMx2_8Ges3oFx3TfCQTNq-ERvXe3Pg',
            refreshToken: '937496761041-N4rn0TblCS0Mwv7xs14WpmDMwRJFIw'
          });
          this.state = {status: 'home', articles: [], error: "", newError: "", snoo: r, redditPosts: [], isLost: false, arr: [], gameRendered: false, score: 0, auth: firebase.auth(), database: firebase.database(), loggedIn: false, user: "no user set!", highScore: 0, color: ""};
        this.setLoss = this.setLoss.bind(this);
    }
    componentDidMount()
    {
        this.getNewPosts();
        this.state.auth.onAuthStateChanged(user => {
            if (user !== null)
            {
                this.setState({user: user, loggedIn: true, error: ""});
            }
            else
            {
                this.setState({user: "no user set!", loggedIn: false});
            }
            this.getHighScore();
            this.getColor();
          });
    }
    getArticles()
    {
        fetch("https://free-news.p.rapidapi.com/v1/search?q=snake&lang=en&page=1", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "29cddfc1f2mshb2c734f59601502p1596e8jsn19ab22709f1e",
            "x-rapidapi-host": 'free-news.p.rapidapi.com'
            }
        })
        .then((res)=> {
            return (res.json());
        })
        .then(response => {
            this.setState({articles: response.articles});
        });     
    }
    getNewPosts()
    {
        this.state.snoo.getSubreddit('superultrasnake').getNew().then(element => this.setState({redditPosts: element.slice(0,8)}));
    }
    setColor(color)
    {
        this.state.database.ref('users/colors/'+ this.state.user.uid).set({
        color: color
        });
    }
    getColor()
    {
        var colorRef = firebase.database().ref('users/colors/' + this.state.user.uid + '/color');
        colorRef.on('value', (snapshot) => {
        const color = snapshot.val();
        if(color === null)
        {
           this.setState({color: "green"});
        }
        else
        {
            this.setState({color: color});
        }
        });
    }
    setHighScore() 
    {
        this.state.database.ref('users/highscores/'+ this.state.user.uid).set({
        highScore: this.state.score
        });
    }
    getHighScore(){
    var highScoreRef = firebase.database().ref('users/highscores/' + this.state.user.uid + '/highScore');
    highScoreRef.on('value', (snapshot) => {
    const highScore = snapshot.val();
    if (highScore === null)
    {
        this.setState({highScore: 0});
    }
    else
    {
        this.setState({highScore: highScore});
    }
    });
    }
    handleCallback(childValue)
    {
        this.setState({status: childValue, error: "", newError: ""});
    }
    handleLoss(childValue)
    {
        this.setState({isLost: childValue});
    }
    signIn(email, password)
    {
       this.state.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({error: error.message});
      })
    }
    logOut()
    {
        this.state.auth.signOut()
    }
    createNewUser(email, password)
    { 
        this.state.auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({status: 'home'});
        })
        .catch(error => {
            this.setState({newError: error.message});
        });   
    }
    handleScore(childValue)
    {
        this.setState({score: childValue});
    }

    renderLoss()
    {
        if(this.state.isLost === true)
        {
            if(this.state.loggedIn)
            {
                return (<LoggedInLostComponent getNewPosts = {this.getNewPosts.bind(this)} postHighScoreToReddit = {this.postHighScoreToReddit.bind(this)} handleCallback = {this.handleCallback.bind(this)} handleLoss = {this.handleLoss.bind(this)} highScore = {this.state.highScore} user = {this.state.user} setHighScore = {this.setHighScore.bind(this)} score = {this.state.score}/>);    
            }
            return (<LostComponent getNewPosts = {this.getNewPosts.bind(this)} handleCallback = {this.handleCallback.bind(this)} handleLoss = {this.handleLoss.bind(this)} score = {this.state.score}/>);
        }
    }
    render()
    {
       return(<div>
        {this.renderLoss()}
        {this.pickPage()}
       </div>
       );
    }
    setLoss()
    {
        this.setState({isLost: true});
    }
    postHighScoreToReddit(highScore, prevHighScore, email)
    {
        let rand = Math.floor((Math.random() * 4));

        if(rand === 0)
        {
            this.state.snoo.getSubreddit('superultrasnake').submitSelfpost({title: `New high score from ${email}!`, text: `${email.replace(/^\w/, (c) => c.toUpperCase())} has crushed their previous record of ${prevHighScore}, replacing it with a score of ${highScore}!`});
        }
        else if(rand === 1)
        {
            this.state.snoo.getSubreddit('superultrasnake').submitSelfpost({title: `${email.replace(/^\w/, (c) => c.toUpperCase())} has set a personal best!`, text: `${email.replace(/^\w/, (c) => c.toUpperCase())}'s previous record of ${prevHighScore} is no more! They have reached a score of ${highScore}!`});
        }
        else if(rand === 2)
        {
            this.state.snoo.getSubreddit('superultrasnake').submitSelfpost({title: `${email.replace(/^\w/, (c) => c.toUpperCase())} gamed super hard!`, text: `It's official. ${email.replace(/^\w/, (c) => c.toUpperCase())} is a huge gamer. Their record was ${prevHighScore} points, but now they scored ${highScore}. Last time I checked, ${prevHighScore} is less than ${highScore}, so that's their new best!`});
        }
        else if(rand === 3)
        {
            this.state.snoo.getSubreddit('superultrasnake').submitSelfpost({title: `${email} crushed it!`, text: `I was worried I would have to send snakes to ${email}'s house, but they spared themself today. Their previous record of ${prevHighScore} points will go to the graveyard, and their new high score of ${highScore} will rise to fill its place.`});
        }
    }
    pickPage()
    {
        if (this.state.status === 'home')
        {
            if(this.state.loggedIn === true)
            {
                return (<LoggedInHomeComponent articles = {this.state.articles} redditPosts = {this.state.redditPosts} color = {this.state.color} setColor = {this.setColor.bind(this)} getColor = {this.getColor.bind(this)} handleCallback = {this.handleCallback.bind(this)} getHighScore = {this.getHighScore.bind(this)} setHighScore = {this.setHighScore.bind(this)} logOut = {this.logOut.bind(this)} user = {this.state.user} highScore = {this.state.highScore}/>);
            }
            return (<HomeComponent articles = {this.state.articles} redditPosts = {this.state.redditPosts} error = {this.state.error} handleCallback = {this.handleCallback.bind(this)} signIn = {this.signIn.bind(this)}/>);
        }
        else if (this.state.status === 'snake')
        {
            if(this.state.loggedIn === true)
            {
                return (<LoggedInSnakeComponent highScore = {this.state.highScore} color = {this.state.color} setLoss = {this.setLoss} handleScore = {this.handleScore.bind(this)} user = {this.state.user}/>);
            }
            return (<SnakeComponent setLoss = {this.setLoss} handleScore = {this.handleScore.bind(this)}/>);
        }
        else if (this.state.status === 'replay')
        {
            this.setState({status: 'snake'});
        }
        else if (this.state.status === 'newUser')
        {
            return (<NewUserComponent error = {this.state.newError} createNewUser = {this.createNewUser.bind(this)} handleCallback = {this.handleCallback.bind(this)}/>);
        }
    }
}