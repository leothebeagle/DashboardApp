class EventsController < ApplicationController
    def create 
        @event = Event.create(event_title:params["event-title"], suggested_time:params["suggested-time"])
        @event.resources.create(url:params["url"], resource_name:params["resource-name"], resource_description:params["resource-description"])
        render json: @event
    end 

    def destroy 
    end 
end


# {"event-title"=>"code", "suggested-time"=>"60", "url"=>"leo.com", "resource-name"=>"leos diary", 
#     "resource-description"=>"a journal of beagleness", "controller"=>"events", 
#     "action"=>"create", "event"=>{}}

# render :json => @programs, :include => {:insurer => {:only => :name}}, :except => [:created_at, :updated_at]

