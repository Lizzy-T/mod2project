class AddLinkToReihikes < ActiveRecord::Migration[6.0]
  def change
    add_column :reihikes, :link, :string
  end
end
