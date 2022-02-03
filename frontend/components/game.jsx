import React from "react";

class Game extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      player1Hand: [],
      player2Hand: [],
      gameOver: true
    }
    // this.playWar = this.playWar.bind(this);
    this.handleGame = this.handleGame.bind(this);
  }

  // fetch the shuffled deck from BE and split it btw two players
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

  handleGame(e){
    this.setState({ gameOver: false })
  }

  // playWar(){
  //   let card1;
  //   let card2;
  //   while (this.state.player1Hand.length && 
  //     this.state.player2Hand.length){
  //     card1 = this.state.player1Hand.shift()[0]
  //     card2 = this.state.player2Hand.shift()[0]

  //     if (card1 < card2){
  //       const stateCopy = this.state.player2Hand
  //       stateCopy.push(card1, card2)
  //       this.setState({
  //         player2Hand: stateCopy
  //       })
  //     } else if (card2 < card1){
  //       const stateCopy = this.state.player1Hand
  //       stateCopy.push(card1, card2)
  //       this.setState({
  //         player1Hand: stateCopy
  //       })
  //     } else {
  //       // this.tieCardValue()
  //     }
  //   }
  //   if (card1 && card2){
  //     return (
  //       <div>
  //         <div>
  //           {card1}
  //         </div>
  //         <div>
  //           {card2}
  //         </div>
  //       </div>
  //     )
  //   } else {
  //     return null
  //   }
  // }

  render(){
    // console.log(this.state.gameOver)
    return (
      <div>
        <button onClick={this.handleGame}>Play</button>
        <div>
          gameOver: {`${this.state.gameOver}`}
        </div>
      </div>
    )
  }
}

export default Game;