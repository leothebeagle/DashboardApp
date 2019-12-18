class AddWorkspaceIdToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :workspace_id, :integer 
  end
end
