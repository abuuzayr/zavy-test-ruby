class CustomerController < ApplicationController
  def all
    @customers = Customer.all

    render json: @customers
  end

  def upload
    uploaded_file = params[:file]
    file_path = Rails.root.join('public', 'uploads', uploaded_file.original_filename)
    File.open(file_path, 'wb') do |file|
      file.write(uploaded_file.read)
    end
    imported = Customer.import(file_path)
    render json: imported
  end
end
