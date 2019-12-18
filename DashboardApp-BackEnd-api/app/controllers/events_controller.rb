class EventsController < ApplicationController
    def create 
        @event = Event.create(event_title:params["event-title"], suggested_time:params["suggested-time"])
        @event.resources.create(url:params["url"], resource_name:params["resource-name"], resource_description:params["resource-description"])
        render json: @event, :include => [:resources]
    end 

    def destroy 
    end 
end


# {"event-title"=>"code", "suggested-time"=>"60", "url"=>"leo.com", "resource-name"=>"leos diary", 
#     "resource-description"=>"a journal of beagleness", "controller"=>"events", 
#     "action"=>"create", "event"=>{}}

# render :json => @programs, :include => {:insurer => {:only => :name}}, :except => [:created_at, :updated_at]

# https://learn.co/tracks/full-stack-web-development-v8/module-14-front-end-web-programming-in-javascript/section-6-rails-as-an-api/rendering-related-object-data-in-json
