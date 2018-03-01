import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ContractViewer.css';
import GameView from '../GameView';
import Abi from './contractAbi.json';


var Web3 = require('web3');

class ContractViewer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ContractInstance: {},
            gamecount: 0,
            ownerAccount: '',
            betValue: 0,
            maxPlayers: 3,
            players: [], // Remove
            open: true,
            index: 1,
        };
        this.getGameCount =  this.getGameCount.bind(this);
        this.intiateContract = this.intiateContract.bind(this);
        this.setBet = this.setBet.bind(this);
        this.getBets = this.getBets.bind(this);
        this.join = this.join.bind(this);
      }

    componentDidMount () {
        if(typeof Web3 != 'undefined'){
          console.log("Using web3 detected from external source like Metamask");
          web3 = new Web3(window.web3.currentProvider);
        }else{
          console.log('use metamask!');
          this.web3 = new Web3(new web3.providers.HttpProvider("http://localhost:8545"));
        }
        
        const MyContract = web3.eth.contract(Abi);
        var ContractInstance = MyContract.at('0x6391e1645a4e9444c4d8d3af1b8ae8eb0d292991');
        this.setState({
            ContractInstance: ContractInstance,
            ownerAccount: web3.eth.accounts[0]
          });
          console.log('account here: ', ContractInstance);
          this.setState({
              players: ['0x05384A688f405dB8b5b687FD3Abf1ED62dBa0327','0x32709E3B445e65FBac9671d9f5B6347010fFC71C']
          })
        }
        
       getGameCount() { //Returns total number (not -1)
        let answer;
        this.state.ContractInstance.totalGames({from: this.state.ownerAccount}, function(error, result) {
            if (error) {
            console.error(error);
            }
            else {
            return <div>result.c[0]</div>;
            }
        });
       }
    getBets() {
        //console.log(this.state.ContractInstance.bets(0));
            this.state.ContractInstance.getBet(0, {from: this.state.ownerAccount}, function(error, result) {
                if (error) {
                console.error(error);
                }
                else {
                console.log('result: ', result);
                return result;
                }
            });
            
        }
    intiateContract() {
        this.state.ContractInstance.deployGamble({from: this.state.ownerAccount}, function(error, result) {
                if (error) {
                console.error(error);
                }
                else {
                console.log('result: ', result);
                }
            });
    }
    setBet(event) {
        event.preventDefault();
        
        let betValue = this.bet.value;
        let max_players = this.maxPlayers.value;
        
        this.state.ContractInstance.setBet(betValue, max_players, {from: this.state.ownerAccount}, function(error, result) {
            if (error) {
            console.error(error);
            }
            else {
            console.log('result: ', result);
            }
        });
    }

    join(event) {
        event.preventDefault();
        this.state.ContractInstance.join(this.gameIndex.value, {from: this.state.ownerAccount}, function(error, result) {
            if (error) {
            console.error(error);
            }
            else {
            console.log('result: ', result);
            }
        });
    }

  render() {

    return (
      <div>
        <GameView index={this.state.index} players={this.state.players} open={this.state.open} cost={0.0031}/>
        <button onClick={this.getBets}>Show Bets</button>
        <button onClick={this.intiateContract}>deploy</button>
        <form onSubmit={this.setBet}>
            Bet Value:
            <input  ref={(input) => this.bet = input} type="text" name="bet_value"></input>
            Max Players:
            <input  ref={(input) => this.maxPlayers = input} id="max_players" type="text" name="max_players"></input>
            <input type="submit" value="Submit"></input>
        </form>
        <br></br>
        <form onSubmit={this.join}>
            Join Game:
            <input  ref={(input) => this.gameIndex = input} type="text" name="index"></input>          
            <input type="submit" value="Submit"></input>
        </form>
        <br></br>
        
      </div>
    );
  }
}

export default withStyles(s)(ContractViewer);