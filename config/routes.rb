Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do 
    resources :players, only: [:index, :update]
    resources :game, only: [:new]
  end

  root 'static_pages#root'
end
