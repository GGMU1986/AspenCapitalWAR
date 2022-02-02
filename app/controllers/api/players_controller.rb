class Api::PlayersController < ApplicationController
  
  def index
    @players = Player.all
    render :index
  end
  
  # update endpoint to increment lifetime wins for the winning player
  def update
    @player = Player.find_by(id: params[:id])
    @player.lifetime_wins += 1
    @player.update
    render :info
  end

  # white listing the appropriate parameters to be send to backend as a precaution
  def player_params
    params.require(:player).permit(:name, :lifetime_wins)
  end

end