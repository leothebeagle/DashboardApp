class WorkspacesController < ApplicationController
    
    # def show 
    #     workspace = Workspace.first

    #     render :json => workspace, :include => :events, :except => [:created_at, :updated_at]
    # end

    def create
        new_workspace = Workspace.create(name: params[:workspace][:name])
        render json: new_workspace
    end

    # def index 
    #     workspaces = Workspace.all 
    #     render :json => workspaces, :include => :events, :except => [:created_at, :updated_at]
        
    # end
end

