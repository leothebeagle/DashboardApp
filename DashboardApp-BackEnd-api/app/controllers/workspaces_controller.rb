class WorkspacesController < ApplicationController
    def create 
        # what data do we need from params? 
        # you can access the name in two ways:  params["name"]
        # or params["workspace"]["name"]
        # ill go for the second option. more descriptive and it promises to be more organized. 
        new_workspace = Workspace.create(name: params["workspace"]["name"])
        render json: new_workspace 
        # maybe you havent made this connection yet, but the response is also sent back 
        # through the same route that the post request arrived through. so yes the url is serving back a response. 
    end

    def index 
        raise params.inspect
    end
end
