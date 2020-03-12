Rails.application.routes.draw do
  
  get 'quotes/random', to: 'quotes#random'

  resources :workspaces, only: [:create, :destroy, :update, :index] do
    resources :events, only: [:create]
    # you only need to nest when creating so you can establish the foreign key.
  end

  resources :events, only: [:destroy]
  # you actually don't need the workspace ID at all to delete an event.
  # It's got its own unique ID. 
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
