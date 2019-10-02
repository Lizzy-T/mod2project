class AddInfoToReihikes < ActiveRecord::Migration[6.0]
  def change
    add_column :reihikes, :summary, :string
    add_column :reihikes, :rating, :float
    add_column :reihikes, :difficulty, :string
    add_column :reihikes, :highest_point, :integer
    add_column :reihikes, :lowest_point, :integer
  end
end
