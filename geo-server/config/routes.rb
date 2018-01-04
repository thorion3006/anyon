Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post 'geocaches' => 'geo_caches#add'
  
  get 'geocaches/around' => 'geo_caches#around'
  
  get 'geocaches/near' => 'geo_caches#near'
end