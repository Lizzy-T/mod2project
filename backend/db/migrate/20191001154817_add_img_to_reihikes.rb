class AddImgToReihikes < ActiveRecord::Migration[6.0]
  def change
    add_column :reihikes, :image, :string
  end
end
