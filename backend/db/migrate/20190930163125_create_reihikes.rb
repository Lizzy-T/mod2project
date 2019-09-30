class CreateReihikes < ActiveRecord::Migration[6.0]
  def change
    create_table :reihikes do |t|
      t.string :name
      t.integer :length
      t.string :location

      t.timestamps
    end
  end
end
