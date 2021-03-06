import React from "react";

class Game extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      winner: '',
      lifeTimeWins1: null,
      lifeTimeWins2: null,
    }
    
    this.gameOver = false;
    this.winnerId = null;
    this.player1Hand = [];
    this.player2Hand = [];
    this.players = {};


    this.playGame = this.playGame.bind(this);
    this.playWar = this.playWar.bind(this);
    this.updateLifeTimeWins = this.updateLifeTimeWins.bind(this);
  }
   
  componentDidMount(){

    // fetch the shuffled deck from BE and split it btw two players
    fetch('api/game/new')
      .then(res => res.json())
      .then(deck => {
        this.player1Hand = deck.slice(0,26)
        this.player2Hand = deck.slice(26)
      }) 

    // fetch player info from BE
    fetch('/api/players')
      .then(res => res.json())
      .then(players => {
        this.setState({ 
          lifeTimeWins1: players['1'].lifetime_wins, 
          lifeTimeWins2: players['2'].lifetime_wins 
        })
        this.players = players 
      })
  }

  updateLifeTimeWins(){
    if (this.winnerId === 1){
      this.setState({ lifeTimeWins1: this.state.lifeTimeWins1 + 1 })
    } else if (this.winnerId === 2){
      this.setState({ lifeTimeWins2: this.state.lifeTimeWins2 + 1 })
    }
  }


  playGame(){

    // main game loop
    while(!this.gameOver){

      const card1 = this.player1Hand.shift();
      const card2 = this.player2Hand.shift();
      
      if (card1[0] < card2[0]){
        this.player2Hand.push(card1, card2)
        if (!this.player1Hand.length) {
          this.setState({ 
            winner: 'Player 2',
          })
          this.winnerId = 2
          this.gameOver = true
        }
      } else if (card2[0] < card1[0]){
        this.player1Hand.push(card1, card2)
        if (!this.player2Hand.length) {
          this.setState({ 
            winner: 'Player 1',
          })
          this.winnerId = 1
          this.gameOver = true
        }
      } else {

        // function to deal with War scenario
        this.playWar(card1, card2)
      }
    }

    // gameOver is true, now updating BE with new winner
    fetch(`/api/players/${this.winnerId}`, {
      method: 'PATCH'
    })
    this.updateLifeTimeWins();
  }
    
  playWar(card1, card2){

    let tieCardValue = true
    let tieArray = [card1, card2];

    while(tieCardValue){
      tieCardValue = false
        
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

        for(let i = 0; i < 3; i++){
          tieArray.push(
            this.player1Hand.shift(),
            this.player2Hand.shift()
          )
        }
        
        let newCard1 = this.player1Hand.shift();
        let newCard2 = this.player2Hand.shift();
        
        if (newCard1[0] < newCard2[0]){
          this.player2Hand = [...this.player2Hand, ...tieArray, newCard1, newCard2]
          
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
          
          if (!this.player2Hand.length) {
            this.setState({ 
              winner: 'Player 1',
            })
            this.winnerId = 1
            this.gameOver = true

          }
          return
        } else {
          tieCardValue = true
          tieArray.push(newCard1, newCard2)
        }
      }
    }

  render(){

    return (
      <div className="game-container">
        <div className="welcome">
          Welcome to the War Card Game!
        </div>
        <button onClick={() => this.playGame()}>Play</button>
        <div className="game-over-container">
          {
            this.gameOver ? (
              <div>
                <div className="game-over">
                  GAMEOVER
                </div>
                <div className="winner">
                  WINNER: {this.state.winner}
                </div>
              </div>
            ) : (
              <div className="click">
                click play above to start game
              </div>
            )
          }
        </div>
          <div>
            {
              <div className="lifetime-wins-container">
                <div className="lifetime-title">
                  LIFETIME WINS
                </div>
                <div className="player-item-container">
                  <div className="player-item">
                    Player 1: <span className="LTW">{this.state.lifeTimeWins1}</span>
                  </div>
                  <div className="player-item">
                    Player 2: <span className="LTW">{this.state.lifeTimeWins2}</span>
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="created">
            Created by George Tsimis with Ruby on Rails, PostgreSQL, React, and CSS
          </div>
      </div>
    )
  }
}

export default Game;