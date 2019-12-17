class CreateResources < ActiveRecord::Migration[5.2]
  def change
    create_table :resources do |t|
      t.string :url 
      t.string :resource_name
      t.string :resource_description
      t.timestamps
    end
  end
end
