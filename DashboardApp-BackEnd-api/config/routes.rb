Rails.application.routes.draw do
  
  get 'quotes/random', to: 'quotes#random'

  resources :workspaces, only: [:create, :destroy, :update] do
    resources :events, only: [:create]
  end

  # resources :events, only: [:create, :destroy]
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
