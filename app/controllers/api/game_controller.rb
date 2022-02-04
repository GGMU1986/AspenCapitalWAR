class Api::GameController < ApplicationController

  def new
 
    suits = [ 'hearts', 'diamonds', 'spades', 'clubs' ]
    ranks = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]
    @deck = []
    
    # cycling through suits and ranks to create a complete 52 card deck
    suits.each do |suit|
      ranks.each do |rank|
        @deck << [ rank, suit ]
      end
    end
   
    #shuffle the deck in place & render json to be sent to frontend
    @deck.shuffle!
    render :cards
  end

end