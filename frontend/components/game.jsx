import React from "react";

class Game extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      player1Hand: [],
      player2Hand: []
    }
  }

  componentDidMount(){
    fetch('api/game/new')
      .then(res => res.json())
      .then(deck => {
        this.setState({
          player1Hand: deck.slice(0,26),
          player2Hand: deck.slice(26)
        })
      })
  }

  render(){
    return (
      <div>
        GAME COMPONENT
      </div>
    )
  }
}

export default Game;