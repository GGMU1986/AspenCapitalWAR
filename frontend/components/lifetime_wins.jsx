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
        this.setState({ players })
      })
  }

  render(){

    let players = Object.values(this.state.players)

    return (
      <div className="lifetime-wins-container">
        {
          players.map(player => <PlayerItem 
                                  key={player.id}
                                  player={player}
                                />
            
                      )
        }
      </div>
    )
  }
}

export default LifeTimeWins;