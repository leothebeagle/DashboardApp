Rails.application.routes.draw do
  
  resources :workspaces
  get 'quotes/random', to: 'quotes#random'
  resources :events, only: [:create, :destroy]
  resources :resources, only: [:create, :destroy]



  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
