class Api::PlayersController < ApplicationController
  
  def update
    @player = Player.find_by(id: params[:id])
    @player.lifetime_wins += 1
    @player.update
    render :info
  end

  def player_params
    params.require(:player).permit(:name, :lifetime_wins)
  end

end