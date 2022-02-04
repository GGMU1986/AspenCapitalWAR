import React from 'react';
import PlayerItem from './player_item';

class LifeTimeWins extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      players: {}
    }
  }

  componentDidMount(){
    fetch('/api/players')
      .then(res => res.json())
      .then(players => {
        this.setState({ 
          players 
        })
      })
  }

  componentDidUpdate(prevProps){
    debugger
    if(prevProps.currentGame !== this.props.currentGame){
      fetch('/api/players')
        .then(res => res.json())
        .then(players => {
          this.setState({ 
            players
          })
        })
    }
  }

  render(){
    debugger
    let players = Object.values(this.state.players)

    return (
      <div className="lifetime-wins-container">
        <div>
          LIFETIME WINS
        </div>
        <div>
          {/* {this.state.player1?.lifetime_wins}
          {this.state.player2?.lifetime_wins} */}
          {
            players.map(player => <PlayerItem 
                                    key={player.id}
                                    player={this.state.players[player.id]}
                                  />
              
                        )
          }
        </div>
      </div>
    )
  }
}

export default LifeTimeWins;