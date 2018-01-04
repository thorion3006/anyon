# GeoCache data model to store the secret message at a point in the map.
class GeoCache < ApplicationRecord
  include Localizable
  
  validates :message, length: { minimum: 5, maximum: 200 }, presence: true
  validates :lat, numericality: {
                                  greater_than_or_equal_to: -90,
                                  less_than_or_equal_to: 90,
                                }, presence: true
  validates :long, numericality: {
                                    greater_than_or_equal_to: -180,
                                    less_than_or_equal_to: 180,
                                  }, presence: true
end
