class WorkspacesController < ApplicationController
    
    # def show 
    #     workspace = Workspace.first

    #     render :json => workspace, :include => :events, :except => [:created_at, :updated_at]
    # end

    def create
        new_workspace = Workspace.create(name: params[:workspace][:name])
        render json: new_workspace
    end

    
    def destroy
        workspace = Workspace.find(params[:workspace][:id])
        workspace.destroy!
        
        if workspace.destroyed?
            render json: workspace
        end
    end

    def update
        # retrieve the record, update it, and then save the updated object to the database. 
        binding.pry
        workspace = Workspace.find(params[:workspace][:id])
        workspace.update!(params)

    end


    # def index 
    #     workspaces = Workspace.all 
    #     render :json => workspaces, :include => :events, :except => [:created_at, :updated_at]
        
    # end
end

