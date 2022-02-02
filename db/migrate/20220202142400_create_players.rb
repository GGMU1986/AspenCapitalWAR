class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :players do |t|
      t.string :name, null:false
      t.integer :lifetime_wins, default: 0
    end
  end
end
