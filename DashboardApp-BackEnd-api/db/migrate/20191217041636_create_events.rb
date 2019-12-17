class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :event_title
      t.string :suggested_time

      t.timestamps
    end
  end
end
