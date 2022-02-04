class Api::PlayersController < ApplicationController
  
  # fetch both players with their name and lifetime wins
  def index
    @players = Player.all
    render :index
  end
  
  # update endpoint to increment lifetime wins for the winning player
  def update

    @player = Player.find_by(id: params[:id].to_i)
    @player.lifetime_wins += 1
    @player.save

    render :info
  end  

end