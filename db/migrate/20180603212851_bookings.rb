class Bookings < ActiveRecord::Migration[5.1]
  def change
    create_table :bookings do |t|
      t.integer :home_id, null: false
      t.integer :user_id, null: false
      t.datetime :start_date, null: false
      t.datetime :end_date, null: false

      t.timestamps
    end
    
    add_index :bookings, :home_id
    add_index :bookings, :user_id
  end

end
