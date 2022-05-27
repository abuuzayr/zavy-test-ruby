class Customer < ApplicationRecord
    require 'csv'

    def self.import(path)
        csv_text = File.read(path)
        csv = CSV.parse(csv_text, :headers => true)
        csv.each do |row|
            Customer.create(row.to_hash)
        end
        return csv.length
    end
end
