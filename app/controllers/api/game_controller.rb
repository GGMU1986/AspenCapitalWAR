class Api::GameController < ApplicationController

  def new
    debugger
    suits = [ 'heart', 'diamond', 'spade', 'club' ]
    ranks = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]
    @deck = []
    
    # cycling through suits and ranks to create a complete 52 card deck
    suits.each do |suit|
      ranks.each do |rank|
        @deck << [ rank, suit ]
      end
    end
    debugger
    #shuffle the deck in place 
    @deck.shuffle!
    debugger
    render :cards
  end

end