class EventsController < ApplicationController
    # def create 
    #     @event = Event.create(event_title:params["event-title"], suggested_time:params["suggested-time"])
    #     @event.resources.create(url:params["url"], resource_name:params["resource-name"], resource_description:params["resource-description"])
    #     render json: @event, :include => [:resources]
    # end 

    # def destroy 
    # end 
    def create
        workspace = Workspace.find(params[:workspace][:id])
        new_event = workspace.events.create(event_title: params[:event][:name], suggested_time: params[:event][:time])
        render json: new_event
        # params received look like:
        # "event"=>{"name"=>"Fry Onions", "time"=>"30"}, "workspace"=>{"id"=>"1"}
    end

    def destroy 
        # {"event"=>{"id"=>"22"}, "controller"=>"events", "action"=>"destroy", "id"=>"22"}
        event = Event.find(params[:event][:id])
        event.destroy!
        
        if event.destroyed?
            render json: event
        end
    end
end


# {"event-title"=>"code", "suggested-time"=>"60", "url"=>"leo.com", "resource-name"=>"leos diary", 
#     "resource-description"=>"a journal of beagleness", "controller"=>"events", 
#     "action"=>"create", "event"=>{}}

# render :json => @programs, :include => {:insurer => {:only => :name}}, :except => [:created_at, :updated_at]

# https://learn.co/tracks/full-stack-web-development-v8/module-14-front-end-web-programming-in-javascript/section-6-rails-as-an-api/rendering-related-object-data-in-json
