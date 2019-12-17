Rails.application.routes.draw do
  resources :resources
  resources :events
  get 'quotes/random', to: 'quotes#random'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
