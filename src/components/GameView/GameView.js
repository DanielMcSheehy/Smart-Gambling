import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GameView.css';

class GameView extends React.Component {
      constructor(prop) {
        super(prop);
        this.state = {
        };
      }
  render() {
    
    return (
      <div style={{ marginLeft: '25%', border: '3px solid green', borderRadius: '3px', padding: '10px', width: '45%' }}>
        <p style={{ marginLeft: '40%'}}>Game: {this.props.index}</p>
        <p>Buy-in: {this.props.cost} eth</p>
        {this.props.players.map(p => <p>Player:{p}</p>)}
        <p style={{ marginLeft: '40%', color: 'green'}}> {this.props.open ? 'Open': 'Closed'}</p>
      </div>
    );
  }
}

export default withStyles(s)(GameView);