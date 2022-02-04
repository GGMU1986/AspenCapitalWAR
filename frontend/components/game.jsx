import React from "react";

class Game extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      winner: ''
    }
    
    this.gameOver = false;
    this.winnerId = null;
    this.player1Hand = [];
    this.player2Hand = [];

    this.playGame = this.playGame.bind(this);
    this.playWar = this.playWar.bind(this);
  }
   
  // fetch the shuffled deck from BE and split it btw two players
  componentDidMount(){
    fetch('api/game/new')
      .then(res => res.json())
      .then(deck => {
        this.player1Hand = deck.slice(0,26)
        this.player2Hand = deck.slice(26)
      }) 
  }

  playGame(){
    //debugger
    while(!this.gameOver){
      //debugger
      const card1 = this.player1Hand.shift();
      const card2 = this.player2Hand.shift();
      //debugger
      if (card1[0] < card2[0]){
        //debugger
        this.player2Hand.push(card1, card2)
        if (!this.player1Hand.length) {
          this.setState({ 
            winner: 'Player 2',
          })
          this.winnerId = 2
          this.gameOver = true
        }
      } else if (card2[0] < card1[0]){
        //debugger
        this.player1Hand.push(card1, card2)
        if (!this.player2Hand.length) {
          this.setState({ 
            winner: 'Player 1',
          })
          this.winnerId = 1
          this.gameOver = true
        }
      } else {
        //debugger
        this.playWar(card1, card2)
      }
    }

    // gameOver is true, now updating BE with new winner
    // debugger
    fetch(`/api/players/${this.winnerId}`, {
      method: 'PATCH'
    })
  }
    
  playWar(card1, card2){

    let tieCardValue = true
    let tieArray = [card1, card2];

    while(tieCardValue){
      tieCardValue = false
        //debugger
        if(this.player1Hand.length < 4){
          this.setState({ 
            winner: 'Player 2',
          })
          this.winnerId = 2 
          this.gameOver = true
          return
        } 
        if (this.player2Hand.length < 4){
          this.setState({ 
            winner: 'Player 1',
          })
          this.winnerId = 1 
          this.gameOver = true
          return
        }

        //debugger
        for(let i = 0; i < 3; i++){
          tieArray.push(
            this.player1Hand.shift(),
            this.player2Hand.shift()
          )
        }
        //debugger
        let newCard1 = this.player1Hand.shift();
        let newCard2 = this.player2Hand.shift();
        //debugger
        if (newCard1[0] < newCard2[0]){
          this.player2Hand = [...this.player2Hand, ...tieArray, newCard1, newCard2]
          //debugger
          if (!this.player1Hand.length) {
            this.setState({ 
              winner: 'Player 2'
            })
            this.winnerId = 2
            this.gameOver = true
          }
          return 
        } else if (newCard2[0] < newCard1[0]){
          this.player1Hand = [ ...this.player1Hand, ...tieArray, newCard1, newCard2]
          //debugger
          if (!this.player2Hand.length) {
            this.setState({ 
              winner: 'Player 1',
            })
            this.winnerId = 1
            this.gameOver = true
          }
          return
        } else {
          //debugger
          tieCardValue = true
          tieArray.push(newCard1, newCard2)
          console.log('another tie')
        }
      }
    }

  render(){

    return (
      <div>
        <button onClick={() => this.playGame()}>Play</button>
        <div>
          {
            this.gameOver ? (
              <div>
                GAMEOVER
                <br />
                WINNER: {this.state.winner}
              </div>
            ) : (
              <div>
                click play above to start game
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default Game;