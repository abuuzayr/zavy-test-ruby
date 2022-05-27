Rails.application.routes.draw do
  get 'api/customers', to: 'customer#all'
  post 'api/customer/upload', to: 'customer#upload'
  root 'components#index'
end
