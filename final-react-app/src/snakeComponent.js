import React, { Component } from 'react';
import './index.css';

export default class SnakeComponent extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            board: new Array(256),
            randomInt: 0,
            heartBeating: false,
            snake: [136],
            pellet: this.spawnNewPellet(),
            snakeHead: 136,
            snakeLength: 3,
            dir: 'neutral',
            movesInDir: 0,
            isLost: false,
            score: 0,
            setLoss: this.props.setLoss
        }
        this.props.handleScore(this.state.score);
        if(this.state.heartBeating === false)
        {
            setInterval(this.interval.bind(this), 125);
        }
    }
    componentDidMount()
    {
        document.addEventListener('keydown', (event) => 
        {
            if((event.key === 'ArrowDown' || event.key === 's') && this.state.snake[this.state.snake.length - 2] !== this.state.snakeHead + 16 && this.state.dir !== 'lost')
            {
                this.setState({dir: 'down', movesInDir: 0});
            }
            else if((event.key === 'ArrowUp' || event.key === 'w') && this.state.snake[this.state.snake.length - 2] !== this.state.snakeHead - 16 && this.state.dir !== 'lost')
            {
                this.setState({dir: 'up', movesInDir: 0});
            }
            else if((event.key === 'ArrowRight' || event.key === 'd') && this.state.snake[this.state.snake.length - 2] !== this.state.snakeHead + 1 && this.state.dir !== 'lost')
            {
                this.setState({dir: 'right', movesInDir: 0});
            }
            else if((event.key === 'ArrowLeft' || event.key === 'a') && this.state.snake[this.state.snake.length - 2] !== this.state.snakeHead - 1 && this.state.dir !== 'lost')
            {
                this.setState({dir: 'left', movesInDir: 0});
            }
        });
        this.noSnakey();
    }
    componentWillUnmount()
    {
        clearInterval();
    }
    interval()
    {
        this.snakePelletInt();
        this.moveTheSnake();
        this.checkIfLost();
    }
    noSnakey()
    {
        if (this.state.snake.indexOf(this.state.pellet) !== -1)
        {
            while(this.state.snake.indexOf(this.state.pellet) !== -1)
            {
                this.setState({pellet: this.spawnNewPellet()});
            }
        }
    }
    snakePelletInt()
    {
        if(this.state.snakeHead === this.state.pellet)
        {
            this.spawnNewPellet();
            this.noSnakey();
            this.setState({score: this.state.score + 1, snakeLength: this.state.snakeLength + 1});
            this.props.handleScore(this.state.score);
        }
    }
    spawnNewPellet(snake)
    {
        let rand = Math.floor((Math.random() * 256));
        while(rand < 16 || rand % 16 === 0 || rand % 16 === 15 || rand > 239)
        {
            rand = Math.floor((Math.random() * 256));
        }
        return rand;
    }
    moveTheSnake()
    {
        if(this.state.dir === 'right')
        {
            this.state.snake.push(this.state.snakeHead + 1);
            if(this.state.snake.length > this.state.snakeLength)
            {
                this.state.snake.shift();
            }
            this.setState({snakeHead: this.state.snakeHead + 1, snake: this.state.snake, randomInt: Math.floor((Math.random() * 100) + 1), heartBeating: true, movesInDir: this.state.movesInDir + 1});
        }
        else if(this.state.dir === 'left')
        {
            this.state.snake.push(this.state.snakeHead - 1);
            if(this.state.snake.length > this.state.snakeLength)
            {
                this.state.snake.shift();
            }
            this.setState({snakeHead: this.state.snakeHead - 1, snake: this.state.snake, randomInt: Math.floor((Math.random() * 100) + 1), heartBeating: true, movesInDir: this.state.movesInDir + 1});
        }
        else if(this.state.dir === 'down')
        {
            this.state.snake.push(this.state.snakeHead + 16);
            if(this.state.snake.length > this.state.snakeLength)
            {
                this.state.snake.shift();
            }
            this.setState({snakeHead: this.state.snakeHead + 16, snake: this.state.snake, randomInt: Math.floor((Math.random() * 100) + 1), heartBeating: true, movesInDir: this.state.movesInDir + 1});
        }
        else if(this.state.dir === 'up')
        {
            this.state.snake.push(this.state.snakeHead - 16);
            if(this.state.snake.length > this.state.snakeLength)
            {
                this.state.snake.shift();
            }
            this.setState({snakeHead: this.state.snakeHead - 16, snake: this.state.snake, randomInt: Math.floor((Math.random() * 100) + 1), heartBeating: true, movesInDir: this.state.movesInDir + 1});
        }
        else
        {
            this.setState({randomInt: Math.floor((Math.random() * 100) + 1), heartBeating: true});
        }
    }
    checkIfLost()
    {
        if((this.state.snakeHead < 16 || this.state.snakeHead % 16 === 0 
            || this.state.snakeHead % 16 === 15 || this.state.snakeHead > 239) && this.state.isLost === false)
        {
            clearInterval();
            this.setState({dir: 'lost', isLost: 'true'});
            this.state.setLoss();
        }
        for(let i = 0; i < this.state.snake.length - 1; i++)
        {
           if (this.state.snake[i] === this.state.snakeHead && this.state.isLost === false)
           {
                clearInterval();
                this.setState({dir: 'lost', isLost: 'true'});
                this.state.setLoss();
           }
        }
    }
    determineClass(val)
    {
        if (val < 16 || val % 16 === 0 || val % 16 === 15 || val > 239)
        {
            if(this.state.snakeHead === val)
            {
                return "deadSnake";
            }
            else
            {
                return "wall";
            }
        }
        else if(this.state.snakeHead === val)
        {
            if(this.state.isLost === 'true')
            {
                return "deadSnake";
            }
            else
            {
                return "greenSnakeHead";
            }
        }
        else if(this.state.pellet === val)
        {
            return "pellet";
        }
        else
        {
            for (let i = 0; i < this.state.snake.length; i++)
            {
                if (this.state.snake[i] === val)
                {
                    return "greenSnake";
                }
            }
        }
        if((val%2) === 0)
        {
            if((val >= 32 && val <= 46) || (val >= 64 && val <= 79)
            || (val >= 96 && val <= 110) || (val >= 128 && val <= 142)
            || (val >= 160 && val <= 174) || (val >= 192 && val <= 206)
            || (val >= 224 && val <= 238))
            {
                return "empty2";
            }
            else
            {
                return "empty";
            }
        }
        else
        {
            if((val >= 32 && val <= 46) || (val >= 64 && val <= 79)
            || (val >= 96 && val <= 110) || (val >= 128 && val <= 142)
            || (val >= 160 && val <= 174) || (val >= 192 && val <= 206)
            || (val >= 224 && val <= 238))
            {
                return "empty";
            }
            else
            {
                return "empty2";
            }
        }
    }
    renderLostMsg()
    {
        if (this.state.isLost === 'true')
        {
            return (<p>You Lost!</p>);
        }
    }
    renderScore()
    {
        if(!this.state.isLost)
        {
            return (<p className = "scoreCounter"> Score: {this.state.score}</p>);
        }
    }
    render() 
    {
        let classes = [256];
        for (let i = 0; i < 256; i++)
        {
            classes[i] = this.determineClass(i);
        }
        return(
            <div>
            <table> 
            <tbody>
            <tr className = "row1">
            <td className = {classes[0]}></td>
            <td className = {classes[1]}></td>
            <td className = {classes[2]}></td>
            <td className = {classes[3]}></td>
            <td className = {classes[4]}></td>
            <td className = {classes[5]}></td>
            <td className = {classes[6]}></td>
            <td className = {classes[7]}></td>
            <td className = {classes[8]}></td>
            <td className = {classes[9]}></td>
            <td className = {classes[10]}></td>
            <td className = {classes[11]}></td>
            <td className = {classes[12]}></td>
            <td className = {classes[13]}></td>
            <td className = {classes[14]}></td>
            <td className = {classes[15]}></td>
            </tr>
            <tr className = "row2">
            <td className = {classes[16]}></td>
            <td className = {classes[17]}></td>
            <td className = {classes[18]}></td>
            <td className = {classes[19]}></td>
            <td className = {classes[20]}></td>
            <td className = {classes[21]}></td>
            <td className = {classes[22]}></td>
            <td className = {classes[23]}></td>
            <td className = {classes[24]}></td>
            <td className = {classes[25]}></td>
            <td className = {classes[26]}></td>
            <td className = {classes[27]}></td>
            <td className = {classes[28]}></td>
            <td className = {classes[29]}></td>
            <td className = {classes[30]}></td>
            <td className = {classes[31]}></td>
            </tr>
            <tr className = "row3">
            <td className = {classes[32]}></td>
            <td className = {classes[33]}></td>
            <td className = {classes[34]}></td>
            <td className = {classes[35]}></td>
            <td className = {classes[36]}></td>
            <td className = {classes[37]}></td>
            <td className = {classes[38]}></td>
            <td className = {classes[39]}></td>
            <td className = {classes[40]}></td>
            <td className = {classes[41]}></td>
            <td className = {classes[42]}></td>
            <td className = {classes[43]}></td>
            <td className = {classes[44]}></td>
            <td className = {classes[45]}></td>
            <td className = {classes[46]}></td>
            <td className = {classes[47]}></td>
            </tr>
            <tr className = "row4">
            <td className = {classes[48]}></td>
            <td className = {classes[49]}></td>
            <td className = {classes[50]}></td>
            <td className = {classes[51]}></td>
            <td className = {classes[52]}></td>
            <td className = {classes[53]}></td>
            <td className = {classes[54]}></td>
            <td className = {classes[55]}></td>
            <td className = {classes[56]}></td>
            <td className = {classes[57]}></td>
            <td className = {classes[58]}></td>
            <td className = {classes[59]}></td>
            <td className = {classes[60]}></td>
            <td className = {classes[61]}></td>
            <td className = {classes[62]}></td>
            <td className = {classes[63]}></td>
            </tr>
            <tr className = "row5">
            <td className = {classes[64]}></td>
            <td className = {classes[65]}></td>
            <td className = {classes[66]}></td>
            <td className = {classes[67]}></td>
            <td className = {classes[68]}></td>
            <td className = {classes[69]}></td>
            <td className = {classes[70]}></td>
            <td className = {classes[71]}></td>
            <td className = {classes[72]}></td>
            <td className = {classes[73]}></td>
            <td className = {classes[74]}></td>
            <td className = {classes[75]}></td>
            <td className = {classes[76]}></td>
            <td className = {classes[77]}></td>
            <td className = {classes[78]}></td>
            <td className = {classes[79]}></td>
            </tr>
            <tr className = "row6">
            <td className = {classes[80]}></td>
            <td className = {classes[81]}></td>
            <td className = {classes[82]}></td>
            <td className = {classes[83]}></td>
            <td className = {classes[84]}></td>
            <td className = {classes[85]}></td>
            <td className = {classes[86]}></td>
            <td className = {classes[87]}></td>
            <td className = {classes[88]}></td>
            <td className = {classes[89]}></td>
            <td className = {classes[90]}></td>
            <td className = {classes[91]}></td>
            <td className = {classes[92]}></td>
            <td className = {classes[93]}></td>
            <td className = {classes[94]}></td>
            <td className = {classes[95]}></td>
            </tr>
            <tr className = "row7">
            <td className = {classes[96]}></td>
            <td className = {classes[97]}></td>
            <td className = {classes[98]}></td>
            <td className = {classes[99]}></td>
            <td className = {classes[100]}></td>
            <td className = {classes[101]}></td>
            <td className = {classes[102]}></td>
            <td className = {classes[103]}></td>
            <td className = {classes[104]}></td>
            <td className = {classes[105]}></td>
            <td className = {classes[106]}></td>
            <td className = {classes[107]}></td>
            <td className = {classes[108]}></td>
            <td className = {classes[109]}></td>
            <td className = {classes[110]}></td>
            <td className = {classes[111]}></td>
            </tr>
            <tr className = "row8">
            <td className = {classes[112]}></td>
            <td className = {classes[113]}></td>
            <td className = {classes[114]}></td>
            <td className = {classes[115]}></td>
            <td className = {classes[116]}></td>
            <td className = {classes[117]}></td>
            <td className = {classes[118]}></td>
            <td className = {classes[119]}></td>
            <td className = {classes[120]}></td>
            <td className = {classes[121]}></td>
            <td className = {classes[122]}></td>
            <td className = {classes[123]}></td>
            <td className = {classes[124]}></td>
            <td className = {classes[125]}></td>
            <td className = {classes[126]}></td>
            <td className = {classes[127]}></td>
            </tr>
            <tr className = "row9">
            <td className = {classes[128]}></td>
            <td className = {classes[129]}></td>
            <td className = {classes[130]}></td>
            <td className = {classes[131]}></td>
            <td className = {classes[132]}></td>
            <td className = {classes[133]}></td>
            <td className = {classes[134]}></td>
            <td className = {classes[135]}></td>
            <td className = {classes[136]}></td>
            <td className = {classes[137]}></td>
            <td className = {classes[138]}></td>
            <td className = {classes[139]}></td>
            <td className = {classes[140]}></td>
            <td className = {classes[141]}></td>
            <td className = {classes[142]}></td>
            <td className = {classes[143]}></td>
            </tr>
            <tr className = "row10">
            <td className = {classes[144]}></td>
            <td className = {classes[145]}></td>
            <td className = {classes[146]}></td>
            <td className = {classes[147]}></td>
            <td className = {classes[148]}></td>
            <td className = {classes[149]}></td>
            <td className = {classes[150]}></td>
            <td className = {classes[151]}></td>
            <td className = {classes[152]}></td>
            <td className = {classes[153]}></td>
            <td className = {classes[154]}></td>
            <td className = {classes[155]}></td>
            <td className = {classes[156]}></td>
            <td className = {classes[157]}></td>
            <td className = {classes[158]}></td>
            <td className = {classes[159]}></td>
            </tr>
            <tr className = "row11">
            <td className = {classes[160]}></td>
            <td className = {classes[161]}></td>
            <td className = {classes[162]}></td>
            <td className = {classes[163]}></td>
            <td className = {classes[164]}></td>
            <td className = {classes[165]}></td>
            <td className = {classes[166]}></td>
            <td className = {classes[167]}></td>
            <td className = {classes[168]}></td>
            <td className = {classes[169]}></td>
            <td className = {classes[170]}></td>
            <td className = {classes[171]}></td>
            <td className = {classes[172]}></td>
            <td className = {classes[173]}></td>
            <td className = {classes[174]}></td>
            <td className = {classes[175]}></td>
            </tr>
            <tr className = "row12">
            <td className = {classes[176]}></td>
            <td className = {classes[177]}></td>
            <td className = {classes[178]}></td>
            <td className = {classes[179]}></td>
            <td className = {classes[180]}></td>
            <td className = {classes[181]}></td>
            <td className = {classes[182]}></td>
            <td className = {classes[183]}></td>
            <td className = {classes[184]}></td>
            <td className = {classes[185]}></td>
            <td className = {classes[186]}></td>
            <td className = {classes[187]}></td>
            <td className = {classes[188]}></td>
            <td className = {classes[189]}></td>
            <td className = {classes[190]}></td>
            <td className = {classes[191]}></td>
            </tr>
            <tr className = "row13">
            <td className = {classes[192]}></td>
            <td className = {classes[193]}></td>
            <td className = {classes[194]}></td>
            <td className = {classes[195]}></td>
            <td className = {classes[196]}></td>
            <td className = {classes[197]}></td>
            <td className = {classes[198]}></td>
            <td className = {classes[199]}></td>
            <td className = {classes[200]}></td>
            <td className = {classes[201]}></td>
            <td className = {classes[202]}></td>
            <td className = {classes[203]}></td>
            <td className = {classes[204]}></td>
            <td className = {classes[205]}></td>
            <td className = {classes[206]}></td>
            <td className = {classes[207]}></td>
            </tr>
            <tr className = "row14">
            <td className = {classes[208]}></td>
            <td className = {classes[209]}></td>
            <td className = {classes[210]}></td>
            <td className = {classes[211]}></td>
            <td className = {classes[212]}></td>
            <td className = {classes[213]}></td>
            <td className = {classes[214]}></td>
            <td className = {classes[215]}></td>
            <td className = {classes[216]}></td>
            <td className = {classes[217]}></td>
            <td className = {classes[218]}></td>
            <td className = {classes[219]}></td>
            <td className = {classes[220]}></td>
            <td className = {classes[221]}></td>
            <td className = {classes[222]}></td>
            <td className = {classes[223]}></td>
            </tr>
            <tr className = "row15">
            <td className = {classes[224]}></td>
            <td className = {classes[225]}></td>
            <td className = {classes[226]}></td>
            <td className = {classes[227]}></td>
            <td className = {classes[228]}></td>
            <td className = {classes[229]}></td>
            <td className = {classes[230]}></td>
            <td className = {classes[231]}></td>
            <td className = {classes[232]}></td>
            <td className = {classes[233]}></td>
            <td className = {classes[234]}></td>
            <td className = {classes[235]}></td>
            <td className = {classes[236]}></td>
            <td className = {classes[237]}></td>
            <td className = {classes[238]}></td>
            <td className = {classes[239]}></td>
            </tr>
            <tr className = "row16">
            <td className = {classes[240]}></td>
            <td className = {classes[241]}></td>
            <td className = {classes[242]}></td>
            <td className = {classes[243]}></td>
            <td className = {classes[244]}></td>
            <td className = {classes[245]}></td>
            <td className = {classes[246]}></td>
            <td className = {classes[247]}></td>
            <td className = {classes[248]}></td>
            <td className = {classes[249]}></td>
            <td className = {classes[250]}></td>
            <td className = {classes[251]}></td>
            <td className = {classes[252]}></td>
            <td className = {classes[253]}></td>
            <td className = {classes[254]}></td>
            <td className = {classes[255]}></td>
            </tr>
            </tbody>
            </table>
            {this.renderScore()}
            </div>
        );
    }  
}