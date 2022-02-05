import React from "react";

class PlayerItem extends React.Component{
  constructor(props){
    super(props)

  }

  render(){ 
    const { player } = this.props

    return (
      <div className="player-item-conatiner">
        <div className="player-item">
          {`${player.name}: ${player.lifetime_wins}`}
        </div>
      </div>
    )
  }

}


export default PlayerItem;